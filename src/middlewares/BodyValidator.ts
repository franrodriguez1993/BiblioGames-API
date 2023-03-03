import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validatorManager = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 400, msg: "INVALID_BODY_REQUEST", data: errors.array() });
  }
  next();
};

/** ------------- Body Create GAME ------------- **/

export const validateBodyGameCreate = [
  body("name").trim().isLength({ min: 2, max: 40 }).escape(),
  body("company").trim().notEmpty().escape(),
  body("release").notEmpty().isLength({ min: 5, max: 10 }),
  body("platform").isArray(),
  body("gender").isArray(),
  body("trailer").trim().isLength({ min: 10, max: 40 }),
  validatorManager,
];

/** ------------- Body edit GAME ------------- **/
export const validateBodyGameEdit = [
  body("name").optional().trim().isLength({ min: 2, max: 40 }).escape(),
  body("company").optional().trim().notEmpty().escape(),
  body("release").optional().notEmpty().isLength({ min: 5, max: 10 }),
  body("platform").optional().isArray(),
  body("gender").optional().isArray(),
  body("trailer").optional().trim().isLength({ min: 10, max: 40 }),
  validatorManager,
];

/** ------------- Body create GENDER - PLATFORM - COMPANY ------------- **/

export const validateBodyFeature = [
  body("name").trim().isLength({ min: 2, max: 40 }).escape(),
  validatorManager,
];
