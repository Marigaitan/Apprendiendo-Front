import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();

const HeaderDocente = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand className="mr-auto">{cookies.get('username')}</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={() => this.irPerfil()}>Ver Perfil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => this.cerrarSesion()}>Cerrar sesión</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default HeaderDocente;
