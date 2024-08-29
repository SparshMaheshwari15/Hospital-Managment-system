import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            dbName: "Hospital_Managment_System",
        })
        .then(() => {
            console.log("Connected to Database");
        })
        .catch((e) => {
            console.log("Some error occured while connecting to Database");
            console.log(e);
        });
};
