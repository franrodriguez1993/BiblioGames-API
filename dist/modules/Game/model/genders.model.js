"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const genderSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
});
const Genders = (0, mongoose_1.model)("genders", genderSchema);
exports.default = Genders;
