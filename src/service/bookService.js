import db from "../models/index";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let handleGetBook = (idBook)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idBook){
        let books = await db.Book.findAll();
        resolve({
          errCode: 0,
          message: "Get all Book successfully!",
          data: books
        })
      }
      let book = await db.Book.findOne({
        where: {id: idBook},
        raw: true
      });
      if(!book){
        resolve({
          errCode: 2,
          message: "Book not exist",
        })
      }
      resolve({
        errCode: 0,
        message: "Get Book successfully!",
        data: book
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleCreateBook= async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.Book.findOne({
        where: {title: data.title, author: data.author},
        raw: true
      })
      if(book){
        return resolve({
          errCode: 2, 
          errMessage: "Book co the bi trung do Tên và ngày sinh của sinh vien đã có trong database.Vui lòng thư lại!"
        })
      }
      await db.Book.create({
        title: data.title,
        author: data.author,
        category: data.category,
        isSold: data.isSold?data.isSold:0
      })
      resolve({
        errCode: 0,
        message: "Create Book successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdateBook = (data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let book = await db.Book.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!book) {
        resolve({
          errCode: 2,
          errMessage: "Book not found!"
        })
      }
      // ten va cac thuoc tinh kiem tra co su thay doi thi moi can kiem tra them
      if(!(book.title==data.title && book.author==data.author)){
        let checkBook = await db.Book.findOne({
          where: {title: data.title, author: data.author},
          raw: true
        })
        if(checkBook){
          return resolve({
            errCode: 5,
            errMessage: "Tên và ngày sinh của book đã có trong database.Vui lòng thư lại!"
          })
        }
      }
      book.title = data.title;
      book.author = data.author;
      book.category = data.category;
      book.isSold = data.isSold?data.isSold:0;
      await book.save();
      resolve({
        errCode: 0,
        message: "Update Book Successfully!",
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteBook = (idBook)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idBook){
        return resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let book = await db.Book.findOne({
        where: {id: idBook},
        raw: false
      })
      if(!book){
        return resolve({
          errCode: 2,
          errMessage: "book not found!"
        })
      }
      await book.destroy();
      return resolve({
        errCode:0,
        message: "Delete book successfully!",
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleFindBookByName = (titleBook)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!titleBook){
        let books = await db.Book.findAll();
        resolve({
          errCode: 0,
          message: "Get all Book successfully!",
          data: books
        })
      }
      let book = await db.Book.findAll({
        where:{
          title: { [Op.like]: `%${titleBook}%`}
        },
        raw: true
      });
      if(!book){
        book = [];
      }
      resolve({
        errCode: 0,
        message: "Get Book successfully!",
        data: book
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetBook,
  handleCreateBook,
  handleUpdateBook,
  handleDeleteBook,
  handleFindBookByName
}