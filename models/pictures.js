import { getDB } from "../db/connection.js";

export const addPicture = async (pictureData) => {
  try {
    console.log("ADD PICTURE - Saving:", pictureData);

    const db = await getDB();

    // Add timestamp
    const dataWithTimestamp = {
      ...pictureData,
      uploadedAt: new Date(),
      filename: pictureData.url?.split("/").pop() || `photo_${Date.now()}.jpg`,
    };

    const result = await db
      .collection("user-pictures")
      .insertOne(dataWithTimestamp);

    console.log("ADD PICTURE - Saved with ID:", result.insertedId);
    return result.insertedId;
  } catch (err) {
    console.error("Error adding picture:", err);
    throw err;
  }
};

export const getPicturesForPosts = async (userID, percent1, percent2) => {
  try {
    percent2 = parseFloat(percent2);
    percent1 = parseFloat(percent1);

    if (percent1 >= percent2) {
      (percent1++, percent2--);
    } else {
      (percent2++, percent1--);
    }

    const query =
      percent1 <= percent2
        ? {
            $and: [
              { percent: { $gte: parseInt(percent1) } },
              { percent: { $lte: parseInt(percent2) } },
              { user: userID },
            ],
          }
        : {
            $and: [
              { percent: { $gte: parseInt(percent2) } },
              { percent: { $lte: parseInt(percent1) } },
              { user: userID },
            ],
          };

    const db = await getDB();
    const data = await db.collection("user-pictures").find(query).toArray();
    return data;
  } catch (err) {
    console.error("Error fetching pictures:", err);
    throw err;
  }
};

export const getUserPhotos = async (username) => {
  try {
    console.log("Get photos for user:", username);

    const db = await getDB();
    const photos = await db
      .collection("user-pictures")
      .find({ user: username })
      .sort({ uploadedAt: -1 }) // newest first
      .toArray();

    console.log("User photos found:", photos.length, "photos");
    return photos;
  } catch (err) {
    console.error("Error fetching user photos:", err);
    throw err;
  }
};
