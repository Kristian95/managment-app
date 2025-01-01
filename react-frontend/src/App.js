// src/App.js
import React, {useState} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router components
import Tasks from './components/task/task';  // Import the Tasks component
import Dashboard from './components/home/dashboard';
import Login from './components/auth/loginForm'; // Import Login component
import Logout from './components/auth/loginForm'; // Import Logout component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const handleLogin = () => setIsAuthenticated(true);  // Set logged-in state
  const handleLogout = () => setIsAuthenticated(false);

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
              {!isAuthenticated ? (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>

        {/* Main content */}
        <div style={{ padding: '20px' }}>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element= {<Dashboard /> } />  {/* Home page */}
            <Route path="/tasks" element={<Tasks />} />  {/* Render Tasks component when clicked */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Login page */}
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} /> {/* Logout page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
