import { Router } from "express";
import { upload } from "../../middleware/index.js";
const router = Router();
router.post("/", upload.array("images"), async (req, res, next) => {
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
export default router;
