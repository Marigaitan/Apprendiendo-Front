import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; //En browserRouter y en Switch 

//encerramos todas las rutas que vayamos a declarar, y en Route declararemos cada una de las paginas
import Login from '../pages/Login';
import MenuAdmin from '../pages/MenuAdmin';
import MenuAlumno from '../pages/MenuAlumno';
import MenuDocente from '../pages/MenuDocente';
import AlumnoClassroom from '../pages/AlumnoClassroom';
import DocenteClassroom from '../pages/DocenteClassroom';
import DocenteNuevoProyecto from '../pages/DocenteNuevoProyecto';
import AlumnoProyecto from '../pages/AlumnoProyecto';
import DocenteProyecto from '../pages/DocenteProyecto';

function Routes() {
  return (
   <BrowserRouter>
    <Switch>
      <Route exact path = "/" component={Login}/> { /* "/"es el raiz donde esta alojado el componente */}
      <Route exact path = "/menuadmin" component={MenuAdmin}/>
      <Route exact path = "/menualumno" component={MenuAlumno}/>
      <Route exact path = "/menudocente" component={MenuDocente}/>
      <Route exact path = "/menualumno_classroom" component={AlumnoClassroom}/>
      <Route exact path = "/menudocente_classroom" component={DocenteClassroom}/>
      <Route exact path = "/menudocente_classroom_nuevo_proyecto" component={DocenteNuevoProyecto}/>
      <Route exact path = "/menualumno_classroom_proyecto" component={AlumnoProyecto}/>
      <Route exact path = "/menudocente_classroom_proyecto" component={DocenteProyecto}/>
    </Switch>
   </BrowserRouter>
  );
}


export default Routes;
