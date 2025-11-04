import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function TrailNavbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Hiking Stories</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Edit</Nav.Link>
            <Nav.Link href="/view">Present</Nav.Link>
            {/* Change this formatting later */}
            <Nav.Link href="/login">Login</Nav.Link>
            {/* Remove this but just for ease of access rn*/}
            <Nav.Link href="/new">Post View</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TrailNavbar;
