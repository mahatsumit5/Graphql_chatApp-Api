import Joi from "joi";
const email = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required();
const password = Joi.string()
    .pattern(new RegExp(`^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>?])(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>?]{0,30}$`))
    .min(8)
    .max(30);
export const validateUserSignUp = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: email,
            password: password,
            fName: Joi.string().required().min(2).max(15),
            lName: Joi.string().required().min(2).max(15),
        });
        await schema.validateAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
export const validateUserLogin = async (req, res, next) => {
    try {
        const schema = Joi.object({
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
