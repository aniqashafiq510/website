import multer from "multer";
// Multer ek middleware hai jo Node.js/Express apps mein file uploads handle karta hai
const storage = multer.memoryStorage(); // required for S3
// memoryStorage() ka matlab hai uploaded file ko server ki memory (RAM) mein store karna, disk par nahi.
// to ye data aws s3 bucket me save ho jaye ga
const uploading = multer({ storage });


export default uploading;
