import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; //En browserRouter y en Switch 

//encerramos todas las rutas que vayamos a declarar, y en Route declararemos cada una de las paginas
import Login from '../pages/Login';
import MenuAdmin from '../pages/MenuAdmin';
import MenuAlumno from '../pages/MenuAlumno';
import MenuDocente from '../pages/MenuDocente';
import AlumnoClassroom from '../pages/AlumnoClassroom';
import DocenteClassroom from '../pages/DocenteClassroom';
import AlumnoProyecto from '../pages/AlumnoProyecto';
import DocenteProyecto from '../pages/DocenteProyecto';
import DocenteAbm from '../pages/DocenteAbm';
import Metodologias from '../pages/Metodologias';
import AlumnoAbm from '../pages/AlumnoAbm';
import ListaAlumnos from '../pages/ListaAlumnos'
import DocenteNuevoProyecto from '../pages/DocenteNuevoProyecto'

function Routes() {
  return (
   <BrowserRouter>
    <Switch>
      <Route exact path = "/" component={Login}/> { /* "/"es el raiz donde esta alojado el componente */}
      <Route exact path = "/menuadmin" component={MenuAdmin}/>
      <Route exact path = "/menualumno" component={MenuAlumno}/>
      <Route exact path = "/menudocente" component={MenuDocente}/>
      <Route exact path = "/menudocente/metodologias" component={Metodologias}/>
      <Route exact path = "/menualumno/classroom" component={AlumnoClassroom}/>
      <Route exact path = "/menudocente/classroom" component={DocenteClassroom}/>
      <Route exact path = "/menudocente/classroom/alumnos" component={ListaAlumnos}/>
      <Route exact path = "/menudocente/classroom/nuevoproyecto" component={DocenteNuevoProyecto}/>
      <Route exact path = "/menualumno/classroom/proyecto" component={AlumnoProyecto}/>
      <Route exact path = "/menudocente/classroom/proyecto" component={DocenteProyecto}/>
      <Route exact path = "/menuAdmin/docente/abm" component = {DocenteAbm}/>
      <Route exact path = "/menuAdmin/alumno/abm" component = {AlumnoAbm}/>
    
    
    
    </Switch>
   </BrowserRouter>
  );
}


export default Routes;
