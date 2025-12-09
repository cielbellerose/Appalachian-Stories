import { useState, useEffect } from "react";
import TrailNavbar from "../components/Navbar.jsx";
import UploadPhotosModal from "../components/UploadPhotosModal.jsx";
import Server from "../modules/ServerConnector.js";

export default function TrailEditPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // for getting photos from local storage
  useEffect(() => {
    async function loadPhotos() {
      try {
        setLoading(true);
        const currentUser = await Server.getCurrentUser();
        setCurrentUser(currentUser);

        if (currentUser) {
          const userId = currentUser.id || currentUser._id || currentUser.username;
          const photosData = await Server.getUserPhotos(userId);
          setPhotos(photosData);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPhotos();
  }, []);

  const handlePhotoUploaded = (filename) => {
    try {
      setPhotos([...photos, filename]);
    } catch (error) {
      console.error("Failed to update photos after upload:", error);
    }
  };

  return (
    <>
      <TrailNavbar />
      <div className="container mt-4">
        <h1>Appalachian Stories</h1>

        <div className="contentContainer">
          {/* Show upload button only if user is logged in */}
          {currentUser ? (
            <>
              <UploadPhotosModal onPhotoUploaded={handlePhotoUploaded} />

              {loading ? (
                <p>Loading photos...</p>
              ) : photos.length === 0 ? (
                <div className="alert alert-info mt-3">
                  No photos uploaded yet.
                </div>
              ) : (
                <div className="mt-4">
                  <h3>Your Photos ({photos.length})</h3>
                  <div className="row">
                    {photos.map((photo, index) => (
                      <div key={index} className="col-md-4 col-lg-3 mb-3">
                        <div className="card">
                          <img
                            src={`/user_data/${photo}`}
                            alt={`Trail photo ${index + 1}`}
                            className="card-img-top"
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <p className="card-text small">{photo}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="alert alert-warning">
              Please log in to upload and manage photos.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
