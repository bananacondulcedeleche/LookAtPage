import { navbar } from './navbar.js';
import { footer } from './footer.js';


// Agregar el navbar
document.querySelector(`#contenedorNav`).innerHTML = navbar;

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
salirBtn.addEventListener('click', function() {
    localStorage.removeItem('usuario'); // Elimina el usuario del localStorage
    newButtonsContainer.style.display = 'none'; // Oculta los botones de usuario
    userDisplay.style.display = 'none'; // Oculta el nombre del usuario
    ingresarBtn.style.display = 'block'; // Muestra el botón "Ingresar"
});