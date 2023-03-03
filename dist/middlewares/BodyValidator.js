"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBodyFeature = exports.validateBodyGameEdit = exports.validateBodyGameCreate = void 0;
const express_validator_1 = require("express-validator");
const validatorManager = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ status: 400, msg: "INVALID_BODY_REQUEST", data: errors.array() });
    }
    next();
};
/** ------------- Body Create GAME ------------- **/
exports.validateBodyGameCreate = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 2, max: 40 }).escape(),
    (0, express_validator_1.body)("company").trim().notEmpty().escape(),
    (0, express_validator_1.body)("release").notEmpty().isLength({ min: 5, max: 10 }),
    (0, express_validator_1.body)("platform").isArray(),
    (0, express_validator_1.body)("gender").isArray(),
    (0, express_validator_1.body)("trailer").trim().isLength({ min: 10, max: 40 }),
    validatorManager,
];
/** ------------- Body edit GAME ------------- **/
exports.validateBodyGameEdit = [
    (0, express_validator_1.body)("name").optional().trim().isLength({ min: 2, max: 40 }).escape(),
    (0, express_validator_1.body)("company").optional().trim().notEmpty().escape(),
    (0, express_validator_1.body)("release").optional().notEmpty().isLength({ min: 5, max: 10 }),
    (0, express_validator_1.body)("platform").optional().isArray(),
    (0, express_validator_1.body)("gender").optional().isArray(),
    (0, express_validator_1.body)("trailer").optional().trim().isLength({ min: 10, max: 40 }),
    validatorManager,
];
/** ------------- Body create GENDER - PLATFORM - COMPANY ------------- **/
exports.validateBodyFeature = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 2, max: 40 }).escape(),
    validatorManager,
];
