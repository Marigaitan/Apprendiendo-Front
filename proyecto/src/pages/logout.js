
import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();

const cerrarSesion = () => {
    cookies.remove('token', { path: "/" });
    cookies.remove('username', { path: "/" });
    cookies.remove('role', { path: "/" });
    cookies.remove('id', { path: "/" });
    cookies.remove('firstName', { path: "/" });
    cookies.remove('lastName', { path: "/" });
    cookies.remove('address', { path: "/" });
    cookies.remove('homePhone', { path: "/" });
    cookies.remove('mobilePhone', { path: "/" });
    window.location.href = '/'; //lo redirijo al login

}

export default cerrarSesion;