// src/App.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Tasks from './components/Task';  // Import the Tasks component

function App() {
  return (
    <div className="App">
      {/* Navbar/Menu */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">Managment</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">Tasks</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main content */}
      <div style={{ padding: '20px' }}>
        <h1>Tasks</h1>
        <Tasks />  {/* Render the Tasks component */}
      </div>
    </div>
  );
}

export default App;
