import React, { useState } from 'react';
import {CustomInput} from 'reactstrap';

export default function Switch() {
    const [statusSwitch, setStatusSwitch] = useState(false);
    console.log("estatusProyecto:");
    console.log(statusSwitch);

    const changeStatusSwitch = () =>{
        
        setStatusSwitch(!statusSwitch);
        console.log(statusSwitch)
    }
    return (
        <div className="toggle-switch">
          <CustomInput 
            type="switch" 
            id="exampleCustomSwitch" 
            name="customSwitch" 
            label="Activar/Desactivar Proyecto"
            onChange={()=>changeStatusSwitch()} />
      </div>
    );
}