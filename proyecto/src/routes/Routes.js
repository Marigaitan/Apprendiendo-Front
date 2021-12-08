import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"; //En browserRouter y en Switch

//encerramos todas las rutas que vayamos a declarar, y en Route declararemos cada una de las paginas
import Login from "../pages/Login";
import MenuAdmin from "../pages/MenuAdmin";
import MenuAlumno from "../pages/MenuAlumno";
import MenuDocente from "../pages/MenuDocente";
import Repositorio from "../pages/Repositorio";
import AlumnoClassroom from "../pages/AlumnoClassroom";
import LessonAlumno from "../pages/LessonAlumno";
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
import DocenteClassroomLogros from "../pages/DocenteClassroomLogros";
import DocenteProjectLogros from "../pages/DocenteProjectLogros";
import DocenteLessonLogros from "../pages/DocenteLessonLogros";

import { SeleccionarAccesorios } from "../pages/SeleccionarAccesorios";

import NewClase from "../pages/NewClase";
import DocenteEditLesson from "../pages/DocenteEditLesson";
import AulaInvertida from "../pages/AulaInvertida";
import Pbl from "../pages/Pbl";
import { AlumnoProgreso } from "../pages/AlumnoProgreso";
import { ProgresoMateria } from "../pages/ProgresoMateria";
import { ListarLogros } from "../pages/ListarLogros";
import { ListarLogrosDelCurso } from "../pages/ListarLogrosDelCurso";
import MenuLogrosDocenteClassroom from "../pages/MenuLogrosDocenteClassroom";
import MenuLogrosDocenteProyecto from "../pages/MenuLogrosDocenteProyecto";
import MenuLogrosDocenteClase from "../pages/MenuLogrosDocenteClase";
import DocenteLesson from "../pages/DocenteLesson";
import CorregirActividades from "../pages/CorregirActividades";
import { DocenteMetricas } from "../pages/docenteMetricas";
import DocenteEditGroups from "../pages/DocenteEditGroups";
import { DocenteAlumnosMetricas } from "../pages/docenteAlumnosMetricas";
import { DocenteProyectosMetricas } from "../pages/docenteProyectosMetricas";
import { DocenteLessonsMetricas } from "../pages/docenteLessonsMetricas";
import { DocenteActividadesMetricas } from "../pages/docenteActividadesMetricas";
import Tbl from "../pages/Tbl";

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
          path="/menudocente_metodologias"
          component={Metodologias}
        />
        <Route exact path="/menudocente_repositorio" component={Repositorio} />
        <Route exact path="/menualumno_classroom" component={AlumnoClassroom} />
        <Route
          exact
          path="/menudocente_classroom"
          component={DocenteClassroom}
        />
        <Route
          exact
          path="/menudocente_classroom_alumnos"
          component={ListaAlumnos}
        />
        <Route
          exact
          path="/menudocente_classroom_nuevoproyecto"
          component={DocenteNuevoProyecto}
        />
        <Route
          exact
          path="/menudocente_classroom_nuevoproyecto_estandar"
          component={NewStandarProject}
        />
        <Route
          exact
          path="/menualumno_classroom_proyecto"
          component={AlumnoProyecto}
        />
        <Route
          exact
          path="/menualumno_classroom_proyecto_clase"
          component={LessonAlumno}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto"
          component={DocenteProyecto}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto_nuevaclase"
          component={NewClase}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto_clase_edit"
          component={DocenteEditLesson}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto_clase"
          component={DocenteLesson}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto_clase_corregir"
          component={CorregirActividades}
        />
        <Route exact path="/menuAdmin_docente_abm" component={DocenteAbm} />
        <Route exact path="/menuAdmin_alumno_abm" component={AlumnoAbm} />
        <Route exact path="/AlumnoPerfil" component={AlumnoPerfil} />
        <Route exact path="/ListarAvatars" component={ListarAvatars} />
        <Route exact path="/SeleccionarAvatar" component={SeleccionarAvatar} />
        <Route exact path="/ListarAccesorios" component={ListarAccesorios} />
        <Route exact path="/docenteMetricas" component={DocenteMetricas} />
        <Route
          exact
          path="/docenteActividadesMetricas"
          component={DocenteActividadesMetricas}
        />
        <Route
          exact
          path="/docenteLessonsMetricas"
          component={DocenteLessonsMetricas}
        />
        <Route
          exact
          path="/docenteProyectosMetricas"
          component={DocenteProyectosMetricas}
        />
        <Route
          exact
          path="/docenteAlumnosMetricas"
          component={DocenteAlumnosMetricas}
        />
        <Route exact path="/AlumnoProgreso" component={AlumnoProgreso} />
        <Route exact path="/ProgresoMateria" component={ProgresoMateria} />
        <Route exact path="/ListarLogros" component={ListarLogros} />
        <Route
          exact
          path="/menudocente_classroom_logros"
          component={MenuLogrosDocenteClassroom}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto_logros"
          component={MenuLogrosDocenteProyecto}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto_actividad_logros"
          component={MenuLogrosDocenteClase}
        />
        <Route
          exact
          path="/menudocente_classroom_logros_new"
          component={DocenteClassroomLogros}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto_logros_new"
          component={DocenteProjectLogros}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto_actividad_logros_new"
          component={DocenteLessonLogros}
        />
        <Route
          exact
          path="/ListarLogrosDelCurso"
          component={ListarLogrosDelCurso}
        />
        <Route
          exact
          path="/SeleccionarAccesorios"
          component={SeleccionarAccesorios}
        />
        <Route
          exact
          path="/menudocente_classroom_nuevoproyecto_aulainvertida"
          component={AulaInvertida}
        />
        <Route
          exact
          path="/menudocente_classroom_nuevoproyecto_pbl"
          component={Pbl}
        />
        <Route
          exact
          path="/menudocente_classroom_proyecto_edit_groups"
          component={DocenteEditGroups}
        />
        <Route
          exact
          path="/menudocente_classroom_nuevoproyecto_tbl"
          component={Tbl}
        />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
