import { Router } from "express";
//Controller:
import genderController from "../controller/gender.ctrl";
const controller = new genderController();
//Middlewares:
import { validateBodyFeature } from "../../../middlewares/BodyValidator";
import corsCheckMiddleware from "../../../middlewares/corsCheck";

//Router:
const router = Router();
router.post(
  "/create",
  corsCheckMiddleware,
  validateBodyFeature,
  controller.createGender
);
router.get("/list", controller.listGenders);
router.put(
  "/edit/:id",
  corsCheckMiddleware,
  validateBodyFeature,
  controller.editGender
);
router.delete("/delete/:id", corsCheckMiddleware, controller.deleteGender);

export { router };
