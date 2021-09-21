//import useState hook to create menu collapse state
import React, { useState } from "react";
import cerrarSesion from "./logout";
import Cookies from 'universal-cookie/es6';

//import react-pro-sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react-icons
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { BiCog, BiUser, BiBarChartAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "../css/Header.css";

const cookies = new Cookies();
const HeaderStudent = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader >
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <h3>{menuCollapse ? < BiUser /> : <p id="userName">{cookies.get('username')}</p>}</h3>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                Inicio
                <Link to="/menualumno" />
              </MenuItem>
              
              <MenuItem icon={<BiCog /> } >Mi Perfil</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={() => cerrarSesion()}>Cerrar Sesión</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default HeaderStudent;
