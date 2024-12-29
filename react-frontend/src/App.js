// src/App.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router components
import Tasks from './components/task/task';  // Import the Tasks component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar/Menu */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Managment System</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link> {/* Link to Home */}
              <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link> {/* Link to Tasks */}
            </Nav>
          </Container>
        </Navbar>

        {/* Main content */}
        <div style={{ padding: '20px' }}>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element= {<TaskStatsChart /> } />  {/* Home page */}
            <Route path="/tasks" element={<Tasks />} />  {/* Render Tasks component when clicked */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
