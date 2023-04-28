import db from "../models/index";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let handleGetLaptop = (idLaptop)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idLaptop){
        let laptops = await db.Laptop.findAll();
        resolve({
          errCode: 0,
          message: "Get all Laptop successfully!",
          data: laptops
        })
      }
      let laptop = await db.Laptop.findOne({
        where: {id: idLaptop},
        raw: true
      });
      if(!laptop){
        resolve({
          errCode: 2,
          message: "Laptop not exist",
        })
      }
      resolve({
        errCode: 0,
        message: "Get Laptop successfully!",
        data: laptop
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleCreateLaptop= async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let laptop = await db.Laptop.findOne({
        where: {name: data.name, brand: data.brand},
        raw: true
      })
      if(laptop){
        return resolve({
          errCode: 2, 
          errMessage: `Laptop co the bi trung do name va brand đã có trong database.Vui lòng thư lại!`
        })
      }
      await db.Laptop.create({
        name: data.name,
        price: data.price,
        brand: data.brand,
        sold: data.sold,
        manufacturedate: data.manufacturedate
      })
      resolve({
        errCode: 0,
        message: "Create Laptop successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdateLaptop = (data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let laptop = await db.Laptop.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!laptop) {
        resolve({
          errCode: 2,
          errMessage: "Laptop not found!"
        })
      }
      // ten va cac thuoc tinh kiem tra co su thay doi thi moi can kiem tra them
      if(!(laptop.name==data.name && laptop.brand==data.brand)){
        let checkLaptop = await db.Laptop.findOne({
          where: {name: data.name, brand: data.brand},
          raw: true
        })
        if(checkLaptop){
          return resolve({
            errCode: 5,
            errMessage: "Tên và ngày sinh của laptop đã có trong database.Vui lòng thư lại!"
          })
        }
      }
      laptop.name = data.name;
      laptop.price = data.price;
      laptop.brand = data.brand;
      laptop.sold = data.sold;
      laptop.manufacturedate = data.manufacturedate;
      await laptop.save();
      resolve({
        errCode: 0,
        message: "Update Laptop Successfully!",
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteLaptop = (idLaptop)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idLaptop){
        return resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let laptop = await db.Laptop.findOne({
        where: {id: idLaptop},
        raw: false
      })
      if(!laptop){
        return resolve({
          errCode: 2,
          errMessage: "laptop not found!"
        })
      }
      await laptop.destroy();
      return resolve({
        errCode:0,
        message: "Delete laptop successfully!",
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleFindLaptopByName = (nameLaptop)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!nameLaptop){
        let laptops = await db.Laptop.findAll();
        resolve({
          errCode: 0,
          message: "Get all Laptop successfully!",
          data: laptops
        })
      }
      let laptop = await db.Laptop.findAll({
        where:{
          // name: { [Op.like]: `%${nameLaptop}%`}
          [Op.or]: [
            {name: { [Op.like]: `%${nameLaptop}%`} },
            {brand: { [Op.like]: `%${nameLaptop}%`} }
          ]
        },
        raw: true
      });
      if(!laptop){
        laptop = [];
      }
      resolve({
        errCode: 0,
        message: "Get Laptop successfully!",
        data: laptop
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetLaptop,
  handleCreateLaptop,
  handleUpdateLaptop,
  handleDeleteLaptop,
  handleFindLaptopByName
}