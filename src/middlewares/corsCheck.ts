import { NextFunction, Request, Response } from "express";
import serverConfiguration from "../config/configServer";
const modeServer = serverConfiguration.server.mode;

const corsCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (modeServer === "production") {
    return res.status(403).json({
      status: 403,
      msg: "Block by CORS - You don't have access to this request.",
    });
  } else {
    next();
  }
};

export default corsCheckMiddleware;
