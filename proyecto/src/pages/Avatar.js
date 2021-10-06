import React from "react";
import Cookies from 'universal-cookie/es6';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Avatar.css";


const cookies = new Cookies();
const Avatar = (props) => {

const styleGlasses = {
    top: props.size * 22,
    width: props.size * 50
}

const styleHat = {
    top: props.size * 0,
    width: props.size * 60
}

const styleClothes = {
    top: props.size * 52,
    width: props.size * 61
}

const stylePerson = {
    top: props.size * 80,
    width: props.size * 75
}

    return (
        <div>
            <div className="d-flex flex-column align-items-center text-center animate__animated animate__fadeInUp">
                <img
                    src={`./avatars/${cookies.get("body")}.png`}
                    alt="Avatar"
                    style={stylePerson}
                    width={80 * props.size}
                />
            </div>
            <div className="d-flex flex-column align-items-center">
                {cookies.get("glasses") !== "" && (
                    <img
                        src={`./accesorios/${cookies.get("glasses")}.png`}
                        alt="Avatar"
                        className="avatar-lente"
                        style={styleGlasses}
                    />
                )}
            </div>
            <div className="d-flex flex-column align-items-center">
                {cookies.get("hat") !== "" && (
                    <img
                        src={`./accesorios/${cookies.get("hat")}.png`}
                        alt="accesorioTop"
                        className="avatar-gorra"
                        style={styleHat}
                    />
                )}
            </div>
            <div className="d-flex flex-column align-items-center">
                {cookies.get("clothes") !== "" && (
                    <img
                        src={`./accesorios/${cookies.get("clothes")}.png`}
                        alt="accesorioTop"
                        className="avatar-torso"
                        style={styleClothes}
                    />
                )}
            </div>

        </div>
    )
}

export default Avatar;