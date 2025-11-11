import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();

function mongoPostConnector({
  dbName = "hiking-stories",
  collection_name = "user-posts",
  defaultUri = "mongodb://localhost:27017",
} = {}) {
  const me = {};
  me.debug = false;
  const URI = process.env.MONGODB_URI || defaultUri;
  console.log(URI);

  const connectToPosts = () => {
    const client = new MongoClient(URI);
    const posts = client.db(dbName).collection(collection_name);

    return { client, posts };
  };


  me.addPost = async (postData) => {
    const { client, posts } = connectToPosts();
    try {
      console.log(postData);
      await posts.insertOne(postData);
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
    const { client, posts } = connectToPosts();
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
  };



    me.deletePost = async (postId) => {
    const { client, posts } = connectToPosts();
    try {
      console.log("deleting",postId);
      
      await posts.deleteOne({_id: new ObjectId(postId)});
      return;
    } catch (err){
      console.error("Error fetching posts from MongoDB", err);
      throw err;
    } finally {
      await client.close();
    }
  };

    me.updatePost = async (postId,replacement) => {
    const { client, posts } = connectToPosts();
    try { 
      await posts.findOneAndReplace({_id: new ObjectId(postId)},replacement);
      return;
    } catch (err){
      console.error("Error fetching posts from MongoDB", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  return me; 
}

export default mongoPostConnector();