import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import EditProfileForm from "./EditProfileForm.jsx";

function TrailNavbar() {
  const [username, setUsername] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();

  // check if a user is currently logged in
  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await fetch("/api/current_user", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        }
      } catch (error) {
        console.error("Error checking login info:", error);
      }
    }
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUsername(null);
        navigate("/login"); // switch to login page
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleProfileUpdate = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/view">Hiking Stories</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Edit</Nav.Link>
            <Nav.Link href="/view">Present</Nav.Link>
            <Nav.Link href="/new">Post View</Nav.Link>
          </Nav>
          <Nav>
            {username ? (
              <>
                <Navbar.Text
                  className="user"
                  style={{
                    color: "#03b50fff",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  {username}
                </Navbar.Text>
                <Nav.Link onClick={() => setShowEditModal(true)}>
                  Edit Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Body>
          <EditProfileForm
            currentUsername={username}
            onClose={() => setShowEditModal(false)}
            onUpdate={handleProfileUpdate}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TrailNavbar;
