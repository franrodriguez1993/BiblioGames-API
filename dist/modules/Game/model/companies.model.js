"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const companySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
}, { versionKey: false });
const Companies = (0, mongoose_1.model)("companies", companySchema);
exports.default = Companies;
