import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; //En browserRouter y en Switch 
import AlumnoClassroom from '../pages/AlumnoClassroom';
import AClassroom from '../pages/AlumnoClassroom';
//encerramos todas las rutas que vayamos a declarar, y en Route declararemos cada una de las paginas
import Login from '../pages/Login';
import MenuAdmin from '../pages/MenuAdmin';
import MenuAlumno from '../pages/MenuAlumno';
import MenuDocente from '../pages/MenuDocente';

function Routes() {
  return (
   <BrowserRouter>
    <Switch>
      <Route exact path = "/" component={Login}/> { /* "/"es el raiz donde esta alojado el componente */}
      <Route exact path = "/menuadmin" component={MenuAdmin}/>
      <Route exact path = "/menualumno" component={MenuAlumno}/>
      <Route exact path = "/menudocente" component={MenuDocente}/>
      <Route exact path = "/menualumno/classroom" component={AlumnoClassroom}/>
    </Switch>
   </BrowserRouter>
  );
}


export default Routes;
