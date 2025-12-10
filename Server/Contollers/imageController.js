import * as config from "../Config/AWS.js";
import { nanoid } from "nanoid";
import Image from "../Models/imageSchema.js";

const uploadImage = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedImages = [];

    for (const file of files) {
      const params = {
        Bucket: "shopbin-bucket",
        Key: `${nanoid()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      // Upload to S3
      
      const data = await config.AWSS3.upload(params).promise();

      // Save URL & key to DB
      const newImage = await Image.create({
        url: data.Location,
        key: data.Key,
      });

      uploadedImages.push(newImage);
    }

    // Return all uploaded images
    res.json(uploadedImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if image exists in DB
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete from S3
    const params = {
      Bucket: "shopbin-bucket",
      Key: image.key,
    };

    await config.AWSS3.deleteObject(params).promise();

    // Delete from DB
    await image.deleteOne();

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


const fetchAllImages = async  (req,res) => {
    try {

      // sort... sorting the images in descending order.. newest to oldest
           const images = await Image.find().sort({ createdAt: -1 })
           if(images.length > 0){
            res.status(200).json({
                ok: true,
                images,
                total : `there are ${images.length} products. `
            })
           }
           else {
            res.status(404).json({
                ok:false,
                error: 'No products found!'
            })
           }
    } catch (error) {
       console.log(error)
    }


}

export { uploadImage, deleteImage,fetchAllImages };
