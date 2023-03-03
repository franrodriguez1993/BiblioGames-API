"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverConfiguration = {
    server: {
        port: process.env.PORT,
        mode: process.env.MODE || "devolopment",
        urlApi: process.env.URL_API || "http://localhost:",
    },
    mongodb: {
        host: process.env.MONGO_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        },
    },
    imageKit: {
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
        urlEndPoing: process.env.IK_URL_ENDPOINT,
    },
};
exports.default = serverConfiguration;
