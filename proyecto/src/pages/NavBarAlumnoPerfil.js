import React, { useState } from "react";

import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";

const NavBarAlumnoPerfil = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Nav pills>
        <NavItem>
          <NavLink href="/menualumno" exact to="/menualumno">
            Volver
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret>
            Editar
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Cambiar datos</DropdownItem>
            <DropdownItem disabled>Cambiar foto</DropdownItem>
            <DropdownItem>Cambiar avatar</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default NavBarAlumnoPerfil;
