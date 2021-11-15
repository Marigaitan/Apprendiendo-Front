import React, { useState } from "react";
import { CustomInput } from "reactstrap";
import { API_HOST } from "../constants";
import axios from "axios";
import Cookies from "universal-cookie/es6";

const cookies = new Cookies();
axios.defaults.headers.common["Authorization"] = cookies.get("token");
axios.defaults.baseURL = API_HOST;

const Switch = ({ id, status, type }) => {
  console.log("ID", id);
  console.log("status", status);
  console.log("type", type);

  const [statusSwitch, setStatusSwitch] = useState(status);

  // const changeStatusSwitch = () => {
  //   setStatusSwitch(!statusSwitch);
  //   setActive(id, statusSwitch);
  // };

  // const setActive = async (id, estaActivo) => {
  //   let proyecto = (await axios.get("project/" + id)).data;
  //   proyecto.active = estaActivo;
  //   const url = API_HOST + type + "/";
  //   console.log("ESTA ES LA URL", url);
  //   await axios.put(url, proyecto);
  // };

  console.log("estatusProyecto:");
  console.log(statusSwitch);

  return (
    <div className="toggle-switch">
      <CustomInput
        type="switch"
        id="exampleCustomSwitch"
        name="customSwitch"
        label="Activar/Desactivar"
        checked={status}
        //onChange={() => changeStatusSwitch()}
      />
    </div>
  );
};

export default Switch;
