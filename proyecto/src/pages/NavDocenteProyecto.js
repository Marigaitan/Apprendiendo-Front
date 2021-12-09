import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const NavDocenteProyecto = (props) => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          href="/menudocente_classroom"
          active={props.activeBar === "classroom"}
        >
          Classroom
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/menudocente_classroom_proyecto"
          active={props.activeBar === "proyecto"}
        >
          Proyecto
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/menudocente_classroom_proyecto_logros"
          active={props.activeBar === "logrosProyecto"}
        >
          Logros del proyecto
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default NavDocenteProyecto;
