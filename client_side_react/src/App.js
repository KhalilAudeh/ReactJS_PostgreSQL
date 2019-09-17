import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import OppsList from './OppsList';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Container fluid={true}>
            <Navbar className="border-bottom bg-light">
              <Navbar.Brand className="font-weight-bold" style={{fontFamily:"cursive"}}>Scholarship and Career Opportunities for Students and Graduates</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Link className="nav-link" to="/">More...</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </Router>
        <br></br>
        <OppsList></OppsList>
      </div>
    )
  }
}

export default App