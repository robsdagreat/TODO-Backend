"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const todo_1 = __importDefault(require("./routes/todo"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const PORT = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.PORT;
app.use((0, cors_1.default)());
app.use("/api/v1/todo", todo_1.default);
app.use("/api/v1/user", user_1.default);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster10.v4ojilb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster10`;
mongoose_1.default.connect(uri).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}, connected to MongoDB`);
    });
}).catch(error => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});
