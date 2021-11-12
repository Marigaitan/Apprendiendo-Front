import React, { useState } from 'react';
import {CustomInput} from 'reactstrap';
import { API_HOST } from "../constants";
import axios from 'axios';

axios.defaults.headers.common["Authorization"] = cookies.get("token");
axios.defaults.baseURL = API_HOST;

export default function Switch() {
    const [statusSwitch, setStatusSwitch] = useState(false);

    const changeStatusSwitch = () =>{       
        setStatusSwitch(!statusSwitch);
        setActive(projectid , statusSwitch);   
    }

    
    const setActive = (projectid , estaActivo) =>{
        let proyecto = (await axios.get("project/" + projectid)).data;
        proyecto.active=estaActivo;
        await axios.put("project",proyecto);
    } 

    console.log("estatusProyecto:");
    console.log(statusSwitch)

    return (
        <div className="toggle-switch">
          <CustomInput 
            type="switch" 
            id="exampleCustomSwitch" 
            name="customSwitch" 
            label="Activar/Desactivar"
            onChange={()=>changeStatusSwitch()} />
      </div>
    );
}