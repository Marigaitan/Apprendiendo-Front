import axios from "axios";
import React, { useEffect, useState } from "react";
import { CustomInput } from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";

const cookies = new Cookies();
axios.defaults.headers.common["Authorization"] = cookies.get("token");
axios.defaults.baseURL = API_HOST;

const Switch = ({ id, type }) => {
  console.log("ID", id);
  //console.log("status", status);
  console.log("type", type);
  const [statusSwitch, setStatusSwitch] = useState();

  useEffect(() => {
    setInitialStatus();
    console.log("AAAA");
  }, []);

  const setInitialStatus = async () => {
    const estado = (await axios.get( type +"/" + id)).data
      .active;
    setStatusSwitch(estado);
  };

  const changeStatusSwitch = () => {
    setStatusSwitch(!statusSwitch);
    setActive(id, statusSwitch);
  };

  const setActive = async (id, statusSwitch) => {
    let proyecto = (await axios.get(type +"/" + id)).data;

    proyecto.active = !statusSwitch;

    await axios.put(type +"/", proyecto);
  };

  console.log("estatusProyectoooooooo:", statusSwitch);

  return (
    <div className="toggle-switch">
      <CustomInput
        type="switch"
        id="exampleCustomSwitch"
        name="customSwitch"
        label="Activar/Desactivar"
        checked={statusSwitch}
        onChange={() => changeStatusSwitch()}
      />
    </div>
  );
};

export default Switch;
