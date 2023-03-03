import { Router } from "express";
import multer from "multer";
//Controller:
import gameController from "../controller/game.ctrl";

//Middlewares:
const uploaderImg = multer({ storage: multer.memoryStorage() });
import {
  validateBodyGameCreate,
  validateBodyGameEdit,
} from "../../../middlewares/BodyValidator";
import corsCheckMiddleware from "../../../middlewares/corsCheck";

const controller = new gameController();

//Router:
const router = Router();
router.post(
  "/create",
  corsCheckMiddleware,
  validateBodyGameCreate,
  controller.createGame
);
router.post(
  "/img/:id",
  corsCheckMiddleware,
  uploaderImg.single("image"),
  controller.uploadGameImg
);
router.put(
  "/edit/:id",
  corsCheckMiddleware,
  validateBodyGameEdit,
  controller.editGame
);
router.get("/list", controller.listGames);
router.get("/list/id/:id", controller.listByID);
router.get("/list/name/:name", controller.listByName);
router.get("/list/company/:name", controller.listByCompany);
router.get("/list/platform/:name", controller.listByPlatform);
router.get("/list/gender/:name", controller.listByGender);

router.delete("/delete/:id", corsCheckMiddleware, controller.deleteGame);

export { router };
