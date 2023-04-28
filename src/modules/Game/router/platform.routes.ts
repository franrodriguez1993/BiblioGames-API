import { Router } from "express";
//Controller:
import platformController from "../controller/platform.ctrl";
const controller = new platformController();
//Middlewares:
import { validateBodyFeature } from "../../../middlewares/BodyValidator";
import corsCheckMiddleware from "../../../middlewares/corsCheck";

//Router:
const router = Router();
router.post(
  "/create",
  corsCheckMiddleware,
  validateBodyFeature,
  controller.createPlatform
);
router.get("/list", controller.listPlatforms);
router.put(
  "/edit/:id",
  corsCheckMiddleware,
  validateBodyFeature,
  controller.editPlatform
);
router.delete("/delete/:id", corsCheckMiddleware, controller.deletePlatform);

export { router };
