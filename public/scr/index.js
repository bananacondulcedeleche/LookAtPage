import { navbarUser, navbarAdmin } from './navbar.js';
import { footer } from './footer.js';


// Agregar el navbar
const usuario = localStorage.getItem('usuario');
const contenedorNav = document.querySelector('#contenedorNav');

if (!usuario) {
    contenedorNav.innerHTML = navbarUser;
} else {
    const usuarioLower = usuario.toLowerCase();
    if (usuarioLower === 'admin') {
        contenedorNav.innerHTML = navbarAdmin;
    } else {
        contenedorNav.innerHTML = navbarUser;
    }
}

// Agregar el footer
document.querySelector(`#contenedorFooter`).innerHTML = footer;

// Manejo de eventos para botones
const ingresarBtn = document.getElementById('ingresarBtn');
const salirBtn = document.getElementById('salirBtn');
const newButtonsContainer = document.getElementById('newButtonsContainer');
const userDisplay = document.getElementById('userDisplay');

// Verifica si hay un usuario almacenado en localStorage
document.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
        mostrarUsuarioEnNavbar(usuario);
    }
});

// Función para mostrar el nombre del usuario en el navbar
function mostrarUsuarioEnNavbar(usuario) {
    ingresarBtn.style.display = 'none'; // Oculta el botón de "Ingresar"
    newButtonsContainer.style.display = 'block'; // Muestra los botones de usuario
    userDisplay.style.display = 'block'; // Muestra el contenedor del usuario
    userDisplay.textContent = `Hola, ${usuario}`; // Muestra el nombre del usuario
}

// Lógica para el botón "Salir"
salirBtn.addEventListener('click', function () {
    localStorage.removeItem('usuario'); // Elimina el usuario del localStorage
    newButtonsContainer.style.display = 'none'; // Oculta los botones de usuario
    userDisplay.style.display = 'none'; // Oculta el nombre del usuario
    ingresarBtn.style.display = 'block'; // Muestra el botón "Ingresar"
});

document.getElementById('eliminarCuenta').addEventListener('click', function () {

    // Mostrar un cuadro de diálogo de confirmación
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar tu cuenta?");

    if (confirmacion) {
        const id = localStorage.getItem('id');
        if (!id) {
            alert("No se encontro un id a eliminar");
            return;
        }
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        const protocolo = window.location.protocol;
        const host = window.location.host;
        const url = protocolo + '//' + host + '/usuario/' + id;

        fetch(url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // Eliminar el id y el usuario del localStorage
                localStorage.removeItem('id');
                localStorage.removeItem('usuario');
                // Recargar la página
                window.location.reload();
            })
            .catch((error) => console.error(error));
    } else {
        // Si el usuario cancela, no se hace nada
        console.log("Eliminación de cuenta cancelada");
    }
});