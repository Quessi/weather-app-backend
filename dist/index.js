"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./Routes"));
const redisClient_1 = __importDefault(require("./utils/redisClient"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient_1.default.connect();
        console.log("Redis connected successfully");
    }
    catch (error) {
        console.log("Redis connection failed");
    }
}))();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(Routes_1.default);
app.listen(PORT, () => {
    console.log("server is running", PORT);
});
