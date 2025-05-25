"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../../middleware/index");
const router = (0, express_1.Router)();
router.post("/", index_1.upload.array("images"), async (req, res, next) => {
    try {
        const file = req.files;
        file.length
            ? res.status(200).json({
                status: true,
                message: "File uploaded successfully",
                data: file,
            })
            : res.status(400).json({
                status: false,
                message: "error occured",
            });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
