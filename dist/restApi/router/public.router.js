"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = require("../../utils/bcrypt");
const auth0_1 = require("../../utils/auth0");
const user_query_1 = require("../../database/user.query");
const data_validation_1 = require("../../utils/data.validation");
const session_query_1 = require("../../database/session.query");
const router = (0, express_1.Router)();
router.post("/sign-up", data_validation_1.validateUserSignUp, async (req, res, next) => {
    try {
        const userAlreadyExist = await (0, user_query_1.getUserByEmail)(req.body.email);
        if (userAlreadyExist)
            throw new Error("An account already exist with this email.");
        req.body.password = (0, bcrypt_1.hashPass)(req.body.password);
        const { data: user } = await (0, user_query_1.createUser)(req.body);
        user?.id
            ? res.json({ status: true, message: "User Created" })
            : res.status(400).json({
                status: false,
                message: "Unable to create new account.Please try again.",
            });
    }
    catch (error) {
        next(error);
    }
});
router.post("/sign-in", data_validation_1.validateUserLogin, async (req, res, next) => {
    try {
        const { data, error } = await (0, user_query_1.getUserByEmail)(req.body.email);
        if (error) {
            throw new Error("User does not exist with that email");
        }
        const isPasswordCorrect = (0, bcrypt_1.comparePassword)(req.body.password, data.password);
        if (!isPasswordCorrect) {
            next(new Error("Incorrect Password"));
        }
        const token = await (0, auth0_1.createAuth0Token)();
        if (!token?.access_token)
            throw new Error("Unable to create token");
        const session = await (0, session_query_1.createSession)({
            email: data.email,
            token: `Bearer ${token.access_token}`,
        });
        res.json({
            status: true,
            message: "Logged In Successfully!",
            token: {
                accessJWT: token.access_token,
            },
        });
    }
    catch (error) {
        error.statusCode = 400;
        next(error);
    }
});
router.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Server is up and asdfrunning",
    });
});
exports.default = router;
