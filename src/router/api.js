import express from "express";
import bookController from "../controller/bookController";
let router = express.Router()

const initApiRoute = (app)=> {
  router.post("/create-book", bookController.createBookApi);
  router.get("/get-book", bookController.getBookApi);
  router.put("/update-book", bookController.updateBookApi);
  router.delete("/delete-book", bookController.deleteBookApi);
  router.get("/find-book", bookController.findBookByNameApi);
  return app.use("/api/v1/", router);
}

export default initApiRoute;