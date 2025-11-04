import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Map from "../components/Map.jsx";

export default function NewPostsPage(){
  return (
     <>
      <h1>Map!</h1>
      <Map url="http://localhost:3000/api/test" />
    </>
  );  
}



