import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { Request } from "express";

const region = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY as string;
const secretKey = process.env.AWS_SECRET_KEY as string;

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

    bucket: process.env.AWS_BUCKET_NAME as string,
    metadata: (req: Request, file: Express.MulterS3.File, cb: Function) => {
      cb(null, { fieldName: file.filename });
    },
    key: (req: Request, file: Express.MulterS3.File, cb: Function) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});
export default upload;
