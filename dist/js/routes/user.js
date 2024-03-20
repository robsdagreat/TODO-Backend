"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/todo/user");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get("/user", user_1.getUsers);
router.get("/user/:id", user_1.getUserById);
router.post("/create", user_1.createUser);
router.put("/edit/:id", user_1.updateUser);
router.delete("/delete/:id", user_1.deleteUser);
exports.default = router;
