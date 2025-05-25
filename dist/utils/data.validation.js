"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.validateUserSignUp = void 0;
const joi_1 = __importDefault(require("joi"));
const email = joi_1.default.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required();
const password = joi_1.default.string()
    .pattern(new RegExp(`^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>?])(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>?]{0,30}$`))
    .min(8)
    .max(30);
const validateUserSignUp = async (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            email: email,
            password: password,
            fName: joi_1.default.string().required().min(2).max(15),
            lName: joi_1.default.string().required().min(2).max(15),
        });
        await schema.validateAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateUserSignUp = validateUserSignUp;
const validateUserLogin = async (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            email: email,
            password: password,
        });
        await schema.validateAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateUserLogin = validateUserLogin;
