import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";
import AddPostModal from "./pages/AddPostModal.jsx";
import NewPostsPage from "./pages/NewPostsPage.jsx";
const root = document.getElementById("root");


//Adding a react DOM to handle routing


ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element = {<AddPostModal />}/>
        <Route path="/new" element = {<NewPostsPage/>}/>
      </Routes>
    </StrictMode>
   </BrowserRouter>
);
