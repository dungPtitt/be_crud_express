import bookService from "../service/BookService";
//---------------api--------------------------------------------------------------------------------------------------
let createBookApi = async(req, res)=>{
  try{
    let data = req.body;
    if(!data.isSold){
      data.isSold=0;
    }
    let response = await bookService.handleCreateBook(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let getBookApi = async(req, res)=>{
  try{
    let idBook = req.query.id;
    let response = await bookService.handleGetBook(idBook);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let updateBookApi = async(req, res)=>{
  try{
    let data = req.body;
    if(!data.isSold){
      data.isSold = 0;
    }
    let response = await bookService.handleUpdateBook(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
let deleteBookApi = async(req, res)=>{
  try{
    let idBook = req.query.id;
    let response = await bookService.handleDeleteBook(idBook);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let findBookByNameApi = async(req, res)=>{
  try{
    let nameBook = req.query.name;
    let response = await bookService.handleFindBookByName(nameBook);
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
  createBookApi,
  getBookApi,
  updateBookApi,
  deleteBookApi,
  findBookByNameApi,
}