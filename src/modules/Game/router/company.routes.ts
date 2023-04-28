import { Router } from "express";
//Controller:
import companyController from "../controller/company.ctrl";
const controller = new companyController();

//Middlewares:
import { validateBodyFeature } from "../../../middlewares/BodyValidator";
import corsCheckMiddleware from "../../../middlewares/corsCheck";

const router = Router();
router.post(
  "/create",
  corsCheckMiddleware,
  validateBodyFeature,
  controller.createCompany
);
router.get("/list", controller.listCompanies);
router.put(
  "/edit/:id",
  corsCheckMiddleware,
  validateBodyFeature,
  controller.editCompany
);
router.delete("/delete/:id", corsCheckMiddleware, controller.deleteCompany);

export { router };
