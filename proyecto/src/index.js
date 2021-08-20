import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';//Llamamos a Routes para que al momento de que se ejecute el
//metodo render sea de acuerdo al enrutamiento que creamos


ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

