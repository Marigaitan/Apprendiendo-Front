
import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();

const cerrarSesion = () => {
    cookies.remove('token', { path: "/" });
    cookies.remove('username', { path: "/" });
    cookies.remove('role', { path: "/" });
    cookies.remove('id', { path: "/" });
    window.location.href = '/'; //lo redirijo al login

}

export default cerrarSesion;