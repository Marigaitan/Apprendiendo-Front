import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"; //En browserRouter y en Switch

//encerramos todas las rutas que vayamos a declarar, y en Route declararemos cada una de las paginas
import Login from "../pages/Login";
import MenuAdmin from "../pages/MenuAdmin";
import MenuAlumno from "../pages/MenuAlumno";
import MenuDocente from "../pages/MenuDocente";
import AlumnoClassroom from "../pages/AlumnoClassroom";
import DocenteClassroom from "../pages/DocenteClassroom";
import AlumnoProyecto from "../pages/AlumnoProyecto";
import DocenteProyecto from "../pages/DocenteProyecto";
import DocenteAbm from "../pages/DocenteAbm";
import Metodologias from "../pages/Metodologias";
import AlumnoAbm from "../pages/AlumnoAbm";
import ListaAlumnos from "../pages/ListaAlumnos";
import DocenteNuevoProyecto from "../pages/DocenteNuevoProyecto";
import AlumnoPerfil from "../pages/AlumnoPerfil";
import NewStandarProject from "../pages/NewStandarProject";
import { ListarAvatars } from "../pages/ListarAvatars";
import { SeleccionarAvatar } from "../pages/SeleccionarAvatar";
import { ListarAccesorios } from "../pages/ListarAccesorios";
import { ListarAccesoriosOrejas } from "../pages/ListarAccesoriosOrejas";
import { ListarAccesoriosLentes } from "../pages/ListarAccesoriosLentes";
import { ListarAccesoriosRopa } from "../pages/ListarAccesoriosRopa";

import { SeleccionarAccesorios } from "../pages/SeleccionarAccesorios";
import { SeleccionarAccesoriosOrejas } from "../pages/SeleccionarAccesoriosOrejas";
import { SeleccionarAccesoriosLentes } from "../pages/SeleccionarAccesoriosLentes";
import { SeleccionarAccesoriosRopa } from "../pages/SeleccionarAccesoriosRopa";
import NuevaClase from "../pages/NuevaClase";
import AulaInvertida from "../pages/AulaInvertida";
import Pbl from "../pages/Pbl";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />{" "}
        {/* "/"es el raiz donde esta alojado el componente */}
        <Route exact path="/menuadmin" component={MenuAdmin} />
        <Route exact path="/menualumno" component={MenuAlumno} />
        <Route exact path="/menudocente" component={MenuDocente} />
        <Route
          exact
          path="/menudocente/metodologias"
          component={Metodologias}
        />
        <Route exact path="/menualumno/classroom" component={AlumnoClassroom} />
        <Route
          exact
          path="/menudocente/classroom"
          component={DocenteClassroom}
        />
        <Route
          exact
          path="/menudocente/classroom/alumnos"
          component={ListaAlumnos}
        />
        <Route
          exact
          path="/menudocente/classroom/nuevoproyecto"
          component={DocenteNuevoProyecto}
        />
        <Route
          exact
          path="/menudocente/classroom/nuevoproyecto/estandar"
          component={NewStandarProject}
        />
        <Route
          exact
          path="/menualumno/classroom/proyecto"
          component={AlumnoProyecto}
        />
        <Route
          exact
          path="/menudocente/classroom/proyecto"
          component={DocenteProyecto}
        />
        <Route
          exact
          path="/menudocente/classroom/proyecto/nuevaclase"
          component={NuevaClase}
        />
        <Route exact path="/menuAdmin/docente/abm" component={DocenteAbm} />
        <Route exact path="/menuAdmin/alumno/abm" component={AlumnoAbm} />
        <Route exact path="/AlumnoPerfil" component={AlumnoPerfil} />
        <Route exact path="/ListarAvatars" component={ListarAvatars} />
        <Route exact path="/SeleccionarAvatar" component={SeleccionarAvatar} />
        <Route exact path="/ListarAccesorios" component={ListarAccesorios} />
        <Route
          exact
          path="/ListarAccesoriosOrejas"
          component={ListarAccesoriosOrejas}
        />
        <Route
          exact
          path="/ListarAccesoriosLentes"
          component={ListarAccesoriosLentes}
        />
        <Route
          exact
          path="/ListarAccesoriosRopa"
          component={ListarAccesoriosRopa}
        />
        <Route
          exact
          path="/SeleccionarAccesorios"
          component={SeleccionarAccesorios}
        />
        <Route
          exact
          path="/SeleccionarAccesoriosOrejas"
          component={SeleccionarAccesoriosOrejas}
        />
        <Route
          exact
          path="/SeleccionarAccesoriosLentes"
          component={SeleccionarAccesoriosLentes}
        />
        <Route
          exact
          path="/SeleccionarAccesoriosRopa"
          component={SeleccionarAccesoriosRopa}
        />
        <Route
          exact
          path="/menudocente/classroom/nuevoproyecto/aulainvertida"
          component={AulaInvertida}
        />
        <Route
          exact
          path="/menudocente/classroom/nuevoproyecto/pbl"
          component={Pbl}
        />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
