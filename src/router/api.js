import express from "express";
import laptopController from "../controller/laptopController";
let router = express.Router()

const initApiRoute = (app)=> {
  router.post("/create-laptop", laptopController.createLaptopApi);
  router.get("/get-laptop", laptopController.getLaptopApi);
  router.put("/update-laptop", laptopController.updateLaptopApi);
  router.delete("/delete-laptop", laptopController.deleteLaptopApi);
  router.get("/find-laptop", laptopController.findLaptopByNameApi);
  return app.use("/api/v1/", router);
}

export default initApiRoute;