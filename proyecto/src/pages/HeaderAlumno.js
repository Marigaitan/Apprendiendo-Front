//import useState hook to create menu collapse state
import axios from "axios";
import React, { useState } from "react";
import { BiCog, BiUser } from "react-icons/bi";
//import icons from react-icons
import {
  FiArrowLeftCircle,
  FiArrowRightCircle, FiHome,
  FiLogOut
} from "react-icons/fi";
import { GiRaceCar } from "react-icons/gi";
//import react-pro-sidebar components
import {
  Menu,
  MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader
} from "react-pro-sidebar";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import {
  Button,
  Modal, ModalBody,
  ModalFooter, ModalHeader
} from "reactstrap";
import { useIntervalWhen } from "rooks";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/Header.css";
import cerrarSesion from "./logout";


const cookies = new Cookies();
const HeaderStudent = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [rewards, setRewards] = useState([]);
  const [newRewards, setNewRewards] = useState([]);
  const [openNewRewardsModal, setOpenNewRewardsModal] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  useIntervalWhen(
    () => {
      getRecentAchievements();
    },
    5000,
    true,
    true
  );

  const getRecentAchievements = async () => {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;

    if (firstRender) {
      let currentRewards = (
        await axios.get("user/" + cookies.get("id") + "/rewards")
      ).data;
      setRewards((rewards) => (rewards = currentRewards));
      setFirstRender((firstRender) => (firstRender = false));
    } else {
      let currentRewards = (
        await axios.get("user/" + cookies.get("id") + "/rewards")
      ).data;
      let diff = currentRewards.filter(
        (x) => !rewards.some((y) => y.id == x.id)
      );

      if (diff.length > 0) {
        setRewards((rewards) => (rewards = currentRewards));
        setNewRewards((newRewards) => (newRewards = diff));
        setOpenNewRewardsModal((open) => (open = true));
      }
    }
  };

  const imageSource = (reward) => {
    if (reward == null || reward == undefined) return "";

    if (reward.rewardType == "AVATAR") {
      if (reward.data.startsWith("b")) return `./avatars/${reward.data}.png`;
      if (reward.data.startsWith("o")) return `./accesorios/${reward.data}.png`;
      if (reward.data.startsWith("l")) return `./accesorios/${reward.data}.png`;
      if (reward.data.startsWith("r")) return `./accesorios/${reward.data}.png`;
    }

    if (reward.imageData == null) return "";
    if (reward.imageData.startsWith("mc"))
      return `./medallas_cursos/${reward.imageData}.png`;
    else return `./medallas/${reward.imageData}.png`;
  };

  const newRewardsModal = () => {
    return (
      <Modal isOpen={openNewRewardsModal} className="modalStyle">
        <ModalHeader size="lg">{"Felicitaciones!"}</ModalHeader>
        <ModalBody>
          {newRewards.map((reward) => {
            return (
              <div className="card ms-3 mt-2" style={{ maxWidth: 120 }}>
                <div className="row no-gutters">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={imageSource(reward)}
                      alt={reward.id}
                      width="100"
                    />
                  </div>
                  <div>
                    <div>
                      <p style={{ color: "red", fontWeight: "bold" }}>
                        {reward.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter className="modalFooter">
          <Button
            color="primary"
            onClick={() =>
              setOpenNewRewardsModal((firstRender) => (firstRender = false))
            }
          >
            {" "}
            Ok{" "}
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  return (
    <div id="header">
      {newRewardsModal()}
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
                <p id="userName">{cookies.get("username")}</p>
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
              <Link to="/menualumno" />
            </MenuItem>

            <MenuItem active={true} icon={<BiCog />}>
              Mi Perfil
              <Link to="/AlumnoPerfil" />
            </MenuItem>
            <MenuItem active={true} icon={<GiRaceCar />}>
              Mi Progreso
              <Link to="/AlumnoProgreso" />
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />} onClick={() => cerrarSesion()}>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default HeaderStudent;
