import ErrorHandler from "./errorHandling.js";

export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return next(new ErrorHandler(errors.join(", "), 400));
        }
        next();
    };
};