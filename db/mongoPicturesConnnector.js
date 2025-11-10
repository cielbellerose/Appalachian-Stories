import { MongoClient, ObjectId } from "mongodb";

function mongoPictureConnector({
  dbName = "Social-hiking",
  collection_name = "user-pictures",
  defaultUri = "mongodb://localhost:27017",
} = {}) {
  const me = {};
  me.debug = false;
  const URI = process.env.MONGODB_URI || defaultUri;

  const connect = () => {
    const client = new MongoClient(URI);
    const posts = client.db(dbName).collection(collection_name);
    return { client, posts };
  };


  me.addPicture = async (pictureData) => {
    const { client, posts } = connect();
    try {
      console.log(pictureData);
      await posts.insertOne(pictureData);
      return;
    } catch (err){
      console.error("Error fetching posts from MongoDB", err);
      throw err;
    } finally {
      await client.close();
    }
  }


  me.getPosts = async (userID) => {
    console.log(userID)
    const { client, posts } = connect();
    try {
      const data = await posts
        .find({"user" : userID})
        .limit(50)
        .toArray();
      return data;
    } catch (err) {
      console.error("Error fetching posts from MongoDB", err);
      throw err;
    } finally {
      await client.close();
    }
  }

  return me; 
}

export default mongoPictureConnector();