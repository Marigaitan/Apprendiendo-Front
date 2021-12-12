import React, { Component } from 'react';
import '../css/Global.css';
import '../css/Metodologias.css'
import CarouselMet from "./CarouselMet.js";
import HeaderTeacher from "./Header";

export default class Metodologias extends Component {
    render() {

        const BackgroundStyle = { //esto se puede hacer en caso que se quiera un color/fondo distinto al heredado de la clase
            background: ' rgb(190, 190, 190)',
            webkitBackgroundSize: 'cover',
            mozBackgroundSize: 'cover',
            oBackgroundSize: 'cover',
            backgroundSize: 'cover',
        }
        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className="containerMetodologias">
                    <div className="metodologiasApprendiendo">
                        <h1><b>¿Qué Metodologías encontrarás en Apprendiendo?</b></h1>
                        <CarouselMet />
                    </div>
                </div>
            </div>
        )
    }
}
