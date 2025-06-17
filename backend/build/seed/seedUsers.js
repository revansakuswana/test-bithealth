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
exports.seedUsers = seedUsers;
const userModel_1 = __importDefault(require("../models/userModel"));
const hash_1 = require("../utils/hash");
function seedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [
            {
                email: "admin@admin.com",
                password: yield (0, hash_1.hashPassword)("admin123"),
                role: "admin",
            },
            {
                email: "staff@example.com",
                password: yield (0, hash_1.hashPassword)("staff123"),
                role: "staff",
            },
        ];
        yield userModel_1.default.insertMany(users);
    });
}
