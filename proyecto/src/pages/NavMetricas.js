import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const NavMetricas = (props) => {
  return (
    <Nav tabs className>
      <NavItem>
        <NavLink
          href="/docenteMetricas"
          active={props.activeBar === "Materias"}
        >
          Materias
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/docenteAlumnosMetricas"
          active={props.activeBar === "Alumnos"}
        >
          Alumnos
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/docenteProyectosMetricas"
          active={props.activeBar === "Proyectos"}
        >
          Proyectos
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/docenteLessonsMetricas"
          active={props.activeBar === "Lessons"}
        >
          Lessons
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/docenteActividadesMetricas"
          active={props.activeBar === "Actividades"}
        >
          Actividades
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default NavMetricas;
