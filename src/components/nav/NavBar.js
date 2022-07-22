import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export const NavBar = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">You do.</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link className="navbar__link" to="/tasklist">Task List</Link>
            </NavItem>
            <NavItem>
            {
                localStorage.getItem("youdo_user")
                    ? <NavLink className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("youdo_user")
                            navigate("/", {replace: true})
                        }}>Logout</NavLink>
                    : ""
            }
            </NavItem>
            <NavItem>
                <Link className="navbar__link" to="/planningHub"> Planning Hub</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

