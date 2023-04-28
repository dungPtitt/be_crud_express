import laptopService from "../service/LaptopService";
//---------------api--------------------------------------------------------------------------------------------------
let createLaptopApi = async(req, res)=>{
  try{
    let data = req.body;
    let response = await laptopService.handleCreateLaptop(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let getLaptopApi = async(req, res)=>{
  try{
    let idLaptop = req.query.id;
    let response = await laptopService.handleGetLaptop(idLaptop);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let updateLaptopApi = async(req, res)=>{
  try{
    let data = req.body;
    let response = await laptopService.handleUpdateLaptop(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
let deleteLaptopApi = async(req, res)=>{
  try{
    let idLaptop = req.query.id;
    let response = await laptopService.handleDeleteLaptop(idLaptop);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let findLaptopByNameApi = async(req, res)=>{
  try{
    let nameLaptop = req.query.name;
    let response = await laptopService.handleFindLaptopByName(nameLaptop);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

module.exports = {
  createLaptopApi,
  getLaptopApi,
  updateLaptopApi,
  deleteLaptopApi,
  findLaptopByNameApi,
}