import express from "express";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import exifr from "exifr";
import mappify from "../../frontend/src/modules/mappify.js";
import { addPicture } from "../../models/pictures.js";

import { getPicturesForPosts } from "../../models/pictures.js";

const PicturesRouter = express.Router();

PicturesRouter.get("/", async (req, res) => {
  const { user, p1, p2 } = req.query;
  try {
    const data = await getPicturesForPosts(user, p1, p2);
    res.json(data);
  } catch (error) {
    console.error("Error getting pictures:", error);
    res.status(500).json({ error: "Error getting pictures" });
  }
});

PicturesRouter.post("/upload", async (req, res) => {
  console.log("UPLOAD ROUTE HIT!");

  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const username = req.user.username;
  const baseURL =
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

  try {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
      uploadDir: path.join(process.cwd(), "user_data"),
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Upload failed" });
      }

      const file = files.photo?.[0];
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const cleanFilename = file.originalFilename.replace(
        /[^a-zA-Z0-9.-]/g,
        "_"
      );
      const newPath = path.join(process.cwd(), "user_data", cleanFilename);

      try {
        await fs.promises.rename(file.filepath, newPath);
        console.log("File saved successfully:", cleanFilename);

        await getEXIFdata(newPath, cleanFilename, username, baseURL);

        return res.json({
          success: true,
          message: "Successfully uploaded",
          filename: cleanFilename,
          url: `${baseURL}/user_data/${cleanFilename}`,
        });
      } catch (moveError) {
        console.error("File save failed:", moveError);
        return res.status(500).json({ error: "File save failed" });
      }
    });
  } catch (error) {
    console.error("Upload route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function getEXIFdata(filePath, filename, username, baseURL) {
  try {
    const { latitude, longitude } = await exifr.gps(filePath);
    const percentage = mappify.calculatePercentage(latitude, longitude);
    const data = {
      lat: latitude,
      lon: longitude,
      percent: percentage * 100,
      url: `${baseURL}/user_data/${filename}`,
      user: username,
    };
    console.log("storing photo", data);
    await addPicture(data);
  } catch (error) {
    console.error("Error processing EXIF data:", error);
    throw error;
  }
}

export default PicturesRouter;
