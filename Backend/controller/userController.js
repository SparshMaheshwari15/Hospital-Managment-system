import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncError(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        aadhar,
        role,
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !aadhar ||
        !role
    ) {
        return next(new ErrorHandler("Please fill full Form!", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User Already registered!", 400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        aadhar,
        role,
    });
    generateToken(user, "User Registered!", 200, res);
    // res.status(200).json({
    //     success: true,
    //     message: "user registered",
    // });
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please enter all details", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Confirm password is different", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid password or email", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid password or email", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not found", 400));
    }
    generateToken(user, "User logged in successfully", 200, res);
    // res.status(200).json({
    //     success: true,
    //     message: "User logged in successfully",
    // });
});

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, aadhar } =
        req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !aadhar
    ) {
        return next(new ErrorHandler("Please fill full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(
            new ErrorHandler(
                `${isRegistered.role} with this email already exists`,
                400
            )
        );
    }

    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        aadhar,
        role: "Admin",
    });

    res.status(200).json({
        success: true,
        message: "New admin registered",
    });
});

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
    // See middlewares->auth.js
    // There we have set the req.user
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
    res.status(200)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Admin Logged out",
        });
});

export const logoutPatient = catchAsyncError(async (req, res, next) => {
    res.status(200)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Patient Logged out",
        });
});

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor avatar required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormat = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormat.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported", 400));
    }
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        aadhar,
        doctorDepartment,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !aadhar ||
        !doctorDepartment
    ) {
        return next(new ErrorHandler("Please provide full details", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(
            new ErrorHandler(
                `${isRegistered.role} already registered with this email!`,
                400
            )
        );
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath,
        {
            folder: "Hospital_Managment_System",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
    }
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        aadhar,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered!",
        doctor,
    });
});
