fetch('/productos')
.then (respuesta => respuesta.json())
// .then (datos => console.log (datos))
.then (datos => mostrarProductos(datos))

let productos = ''
const mostrarProductos = (datos) => {
    
     const contenedor = document.querySelector('#contenedor')
     
     datos.forEach(dato => {
        productos +=`
        <div class="card d-flex flex-column align-items-center"
        style="width: 100%; max-width: 300px; margin:30px; border: none;">
            <img src="${dato.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4>${dato.titulo}</h4>
                <p class="card-text">${dato.descripcion}</p>
            </div>
            
            <div class="card-precio-comprar d-flex justify-content-between align-items-center w-100 px-3">
                <p class="card-text mb-0">$${dato.precio}</p>    
                <button class="btn btn-outline-success mt-3 mb-3" type="button">Comprar</button>
            </div>
        </div>
        `;
     });

     contenedor.innerHTML = productos 

}
