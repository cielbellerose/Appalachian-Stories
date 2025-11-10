import { useState } from "react";
import Map from "../components/Map.jsx";
import { useLocation } from "react-router-dom";


export default function PostListPage() {
  const [openPic, setOpenPic] = useState(() => -1);
  const location = useLocation();
  console.log(location.state)
  //TODO handle logic to get posts

  return (
    <>
      <Map openPic={openPic} setOpenPic={setOpenPic} />
    </>
  );
}
