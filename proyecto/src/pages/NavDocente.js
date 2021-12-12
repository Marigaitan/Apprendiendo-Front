import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const NavDocente = (props) => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          href="/menudocente_classroom"
          active={props.activeBar === "classroom"}
        >
          Proyectos
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/menudocente_classroom_alumnos"
          active={props.activeBar === "alumnos"}
        >
          Alumnos
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/menudocente_classroom_nuevoproyecto"
          active={props.activeBar === "nuevoProyecto"}
        >
          Nuevo Proyecto
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/menudocente_classroom_logros"
          active={props.activeBar === "logros"}
        >
          Logros del curso
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default NavDocente;
