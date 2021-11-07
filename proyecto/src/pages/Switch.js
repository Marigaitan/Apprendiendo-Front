import React, { useState } from 'react';
import {CustomInput} from 'reactstrap';

export default function Switch() {
    const [statusSwitch, setStatusSwitch] = useState(false);

    const changeStatusSwitch = () =>{       
        setStatusSwitch(!statusSwitch);   
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