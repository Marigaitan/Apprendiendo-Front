import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const NavDocenteClase = (props) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink href="/menudocente/classroom/proyecto" active={props.activeBar === 'classroom'}>Proyecto</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/menudocente/classroom/proyecto/clase/logros/new" active={props.activeBar === 'logrosClase'}>Logros de las actividades</NavLink>
            </NavItem>
        </Nav>
    )
}

export default NavDocenteClase;