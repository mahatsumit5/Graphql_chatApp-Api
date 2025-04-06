import { NextFunction, Request, Response } from "express";
import { getSession } from "../database/session.query";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
export const loggedInUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(500).json({
        status: false,
        code: 401,
        message: "Please login and provide a token to continue",
      });
    }
    const user = await getSession(token);
    if (!user?.associate) {
      return res.status(401).json({ message: "You are not logged in" });
    }
    user.associate.password = undefined;
    user.associate.refreshJWT = undefined;
    req.userInfo = user.associate;

    return next();
  } catch (error: Error | any) {
    next(error);
  }
};

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
export const upload = multer({
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
