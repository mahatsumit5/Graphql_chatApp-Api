import { Response, Request, Router } from "express";
import { comparePassword, hashPass } from "../../utils/bcrypt";
import { createAuth0Token } from "../../utils/auth0";
import { createUser, getUserByEmail } from "../../database/user.query";
import {
  validateUserLogin,
  validateUserSignUp,
} from "../../utils/data.validation";
import { createSession } from "../../database/session.query";

const router = Router();

router.post("/sign-up", validateUserSignUp, async (req, res, next) => {
  try {
    const userAlreadyExist = await getUserByEmail(req.body.email);
    if (userAlreadyExist)
      throw new Error("An account already exist with this email.");
    req.body.password = hashPass(req.body.password);
    const user = await createUser(req.body);

    user?.id
      ? res.json({ status: true, message: "User Created" })
      : res.status(400).json({
          status: false,
          message: "Unable to create new account.Please try again.",
        });
  } catch (error) {
    next(error);
  }
});
router.post(
  "/sign-in",
  validateUserLogin,
  async (req: Request, res: Response, next) => {
    try {
      const { data, error } = await getUserByEmail(req.body.email);
      if (error) {
        throw new Error("User does not exist with that email");
      }
      const isPasswordCorrect = comparePassword(
        req.body.password,
        data.password
      );
      if (!isPasswordCorrect) {
        next(new Error("Incorrect Password"));
      }
      const token = await createAuth0Token();
      if (!token?.access_token) throw new Error("Unable to create token");
      const session = await createSession({
        email: user.email,
        token: `Bearer ${token.access_token}`,
      });

      res.json({
        status: true,
        message: "Logged In Successfully!",
        token: {
          accessJWT: token.access_token,
        },
      });
    } catch (error: any) {
      error.statusCode = 400;
      next(error);
    }
  }
);
router.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Server is up and asdfrunning",
  });
});
export default router;
