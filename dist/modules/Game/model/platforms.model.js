"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const platformSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
});
const Platforms = (0, mongoose_1.model)("platforms", platformSchema);
exports.default = Platforms;
