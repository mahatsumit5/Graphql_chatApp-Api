import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
const region = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    },
});
const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.filename });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});
export default upload;
