import express from "express";
import staticTestCoodinates from "./db/testData.json" with {type:"json"}; //this should be removed after db migration


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("./frontend/dist"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//this route just returns static files test JSON data to not have to deal with
//seting up data flows quite yet
app.use("/api/test",(req,res) => {
  console.log("Sending JSON test data",staticTestCoodinates);
  res.json(staticTestCoodinates);
});

