import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin not authenticated!", 400));
    }
    // In user schema we have created a function named generateJsonWebToken in which we have provided the id
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
        return next(
            new ErrorHandler(
                `${req.user.role} not authorize for this resources`,
                403
            )
        );
    }
    next();
});

export const isPatientAuthenticated = catchAsyncError(
    async (req, res, next) => {
        const token = req.cookies.patientToken;
        if (!token) {
            return next(new ErrorHandler("Patient not authenticated!", 400));
        }
        // In user schema we have created a function named generateJsonWebToken in which we have provided the id
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "Patient") {
            return next(
                new ErrorHandler(
                    `${req.user.role} not authorize for this resources`,
                    403
                )
            );
        }
        next();
    }
);
