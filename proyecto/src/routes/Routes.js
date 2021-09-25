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
import AlumnoPerfil from '../pages/AlumnoPerfil';

function Routes() {
  return (
   <BrowserRouter>
    <Switch>
      <Route exact path = "/" component={Login}/> { /* "/"es el raiz donde esta alojado el componente */}
      <Route path = "/menuadmin" component={MenuAdmin}/>
      <Route path = "/menualumno" component={MenuAlumno}/>
      <Route path = "/menudocente" component={MenuDocente}/>
      <Route path = "/menudocente/metodologias" component={Metodologias}/>
      <Route path = "/menualumno/classroom" component={AlumnoClassroom}/>
      <Route path = "/menudocente/classroom" component={DocenteClassroom}/>
      <Route path = "/menualumno/classroom/proyecto" component={AlumnoProyecto}/>
      <Route path = "/menudocente/classroom/proyecto" component={DocenteProyecto}/>
      <Route path = "/menuAdmin/docente/abm" component = {DocenteAbm}/>
      <Route path = "/menuAdmin/alumno/abm" component = {AlumnoAbm}/>
      <Route path = "/AlumnoPerfil" component = {AlumnoPerfil}/>  
    
    </Switch>
   </BrowserRouter>
  );
}
export default Routes;
