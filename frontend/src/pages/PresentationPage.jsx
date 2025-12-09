import TrailNavbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Map from "../components/Map.jsx";
import PostText from "../components/PostText.jsx";
import Server from "../modules/ServerConnector.js";

export default function PresentationPage() {
  const [openPic, setOpenPic] = useState(() => -1);
  const [percent, setCurrentPercent] = useState(() => -1);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function fetchMapUrl() {
      try {
        setLoading(true);
        const programUser = await Server.getCurrentUser();

        // Check if location.state exists and has required properties
        if (
          !location.state ||
          !location.state.Percent1 ||
          !location.state.Percent2
        ) {
          console.error("Missing location state data:", location.state);
          return;
        }

        const urlgot = await Server.getURLforMap(
          programUser,
          location.state.Percent1,
          location.state.Percent2
        );

        console.log("Generated URL:", urlgot);
        setUrl(urlgot);
      } catch (error) {
        console.error("Error fetching map URL:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMapUrl();
  }, [location.state]);

  // if (!location.state) {
  //   return (
  //     <>
  //       <TrailNavbar />
  //       <div className="container mt-4">
  //         <div className="alert alert-danger">
  //           <h2>Error: Missing Presentation Data</h2>
  //           <p>
  //             No presentation data was provided. Please go back and select a
  //             post to view.
  //           </p>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  const post = {
    text: location.state.text || "",
    title: location.state.title || "Untitled Post",
  };

  return (
    <>
      <TrailNavbar />
      <h1>Trail Presentation</h1>
      <PostText post={post}></PostText>
      <Map
        url={url}
        percent={percent}
        setCurrentPercent={setCurrentPercent}
        openPic={openPic}
        setOpenPic={setOpenPic}
      />
      <div className="contentContainer"></div>
    </>
  );
}
