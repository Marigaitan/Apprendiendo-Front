import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';//Llamamos a Routes para que al momento de que se ejecute el
//metodo render sea de acuerdo al enrutamiento que creamos


ReactDOM.render(
  /* El React.StrictMode traer problemas como Warning: Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: Transition. Todavia no parece haber solucion. Lo cambie por React.Fragment  hay que revisar si no trae problemas a futuro */
  <React.Fragment>
    <Routes />
  </React.Fragment>,
  document.getElementById('root')
);

