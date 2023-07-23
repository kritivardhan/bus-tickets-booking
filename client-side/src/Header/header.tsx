import React, {Component} from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(): React.ReactNode {
        return(
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="dashboard">Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="reservation">Reservation</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        )
    }
}
export default Header;