// This is a test file for the below issue
// While uploading the doctor avatar the file is saved in the root folder instead of the Hospital_Management_System folder
// Issue unresolved
// 03/08/2024
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: "dqlugm6vk",
    api_key: 391453362574396,
    api_secret: "Rp94RMV6XqKXw6oz0zC0OC9Pi3M",
});
// Test Upload
async function uploadTest() {
    try {
        const response = await cloudinary.uploader.upload(
            "S:/Coding 2/MERN Stack Project/Hospital Managment system/Doctor avatar/1.jpeg",
            {
                folder: "Hospital_Management_System",
            }
        );
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

uploadTest();
