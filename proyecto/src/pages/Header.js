//import useState hook to create menu collapse state
import React, { useState } from "react";
import {
  BiBarChartAlt, BiBook, BiBookBookmark, BiUser
} from "react-icons/bi";
//import icons from react-icons
import {
  FiArrowLeftCircle,
  FiArrowRightCircle, FiHome,
  FiLogOut
} from "react-icons/fi";
//import react-pro-sidebar components
import {
  Menu,
  MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader
} from "react-pro-sidebar";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import "../css/Header.css";
import cerrarSesion from "./logout";




const cookies = new Cookies();
const HeaderTeacher = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <div id="header">
      {/* collapsed props to change menu size using menucollapse state */}
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <div className="logotext">
            {/* small and big change using menucollapse state */}
            {menuCollapse ? (
              <div style={{ backgroundColor: "#fece00" }}>
                <BiUser size="3em" color="#fbf4cd" />
              </div>
            ) : (
              <h3>
                <p id="userName">{cookies.get("firstName") + " " + cookies.get("lastName")}</p>
              </h3>
            )}
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem active={true} icon={<FiHome />}>
              Mis Cursos
              <Link to="/menudocente" />
            </MenuItem>

            {/* <MenuItem icon={<BiCog />}>Mi Perfil</MenuItem> */}

            <MenuItem icon={<BiBook />}>
              Repositorio
              <Link to="/menudocente_repositorio" />
            </MenuItem>

            <MenuItem icon={<BiBookBookmark />}>
              Metodolog??as
              <Link to="/menudocente_metodologias" />
            </MenuItem>

            <MenuItem icon={<BiBarChartAlt />}>
              M??tricas <Link to="/docenteMetricas" />
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />} onClick={() => cerrarSesion()}>
              Cerrar Sesi??n
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default HeaderTeacher;
