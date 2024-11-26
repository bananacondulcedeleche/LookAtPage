const navbarUser = `
        <style>
            .texto-menu{
            color: #03DAC6;
            }
        </style>
    <nav class="navbar navbar-expand-lg bg-black">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">LookAt</a>
                    </li>
                    <li class="nav-item">
                        <a class="texto-menu nav-link" href="./index.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="texto-menu nav-link" href="./productos.html">Productos</a>
                    </li>
                    <li class="nav-item">
                        <a class="texto-menu nav-link" href="./contacto.html">Contacto</a>
                    </li>
                </ul>

                <button id="ingresarBtn" class="btn btn-outline-success" type="button" onclick="window.location.href='login.html'">Ingresar</button>
                <div id="userDisplay" style="color: #03DAC6; display: none; margin-left: 10px;"></div>  

                <!-- Contenedor para los nuevos botones -->

                <div id="newButtonsContainer" class="ms-2" style="display: none;">
                    <!--                    
                    <button id="usuarioBtn" class="btn btn-outline-primary"><i class="bi bi-person-circle"></i> Usuario</button> -->

                    <div class="btn-group">
                        <button type="button" class="btn btn-primary">
                            Usuario</button>
                        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Cuenta</a></li>
                            <li><hr class="dropdown-divider"></li>

                            <li>
                                <a class="dropdown-item" href="#">Ver pedidos</a>
                            </li>

                            <li><hr class="dropdown-divider"></li>

                            <li><a class="dropdown-item" href="#" id="eliminarCuenta">Eliminar Cuenta</a></li>

                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="modificarContraseña.html">Modificar <br>Contraseña</a></li>
                        </ul>
                    </div>

                    <button id="salirBtn" class="btn btn-outline-danger">
                        Salir</button>
                </div>
            </div>
        </div>
    </nav>
    <!-- <i class="bi bi-person-circle"></i> -->
    <!-- <i class="bi bi-person-dash-fill"></i> -->







`
const navbarAdmin = `
        <style>
            .texto-menu{
            color: #03DAC6;
            }
        </style>
    <nav class="navbar navbar-expand-lg bg-black">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">LookAt</a>
                    </li>
                    <li class="nav-item">
                        <a class="texto-menu nav-link" href="./index.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="texto-menu nav-link" href="./productos.html">Productos</a>
                    </li>
                    <li class="nav-item">
                        <a class="texto-menu nav-link" href="./contacto.html">Contacto</a>
                    </li>
                </ul>

                <button id="ingresarBtn" class="btn btn-outline-success" type="button" onclick="window.location.href='login.html'">Ingresar</button>
                <div id="userDisplay" style="color: #03DAC6; display: none; margin-left: 10px;"></div>  

                <!-- Contenedor para los nuevos botones -->

                <div id="newButtonsContainer" class="ms-2" style="display: none;">
                    <!--                    
                    <button id="usuarioBtn" class="btn btn-outline-primary"><i class="bi bi-person-circle"></i> Usuario</button> -->

                    <div class="btn-group">
                        <button type="button" class="btn btn-primary">
                            Usuario</button>
                        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Cuenta</a></li>
                            <li><hr class="dropdown-divider"></li>

                            <li>
                                <a class="dropdown-item" href="administracion.html">Administracion</a>
                            </li>

                            <li><hr class="dropdown-divider"></li>

                            <li><a class="dropdown-item" href="#" id="eliminarCuenta">Eliminar Cuenta</a></li>

                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="modificarContraseña.html">Modificar <br>Contraseña</a></li>
                        </ul>
                    </div>

                    <button id="salirBtn" class="btn btn-outline-danger">
                        Salir</button>
                </div>
            </div>
        </div>
    </nav>
    <!-- <i class="bi bi-person-circle"></i> -->
    <!-- <i class="bi bi-person-dash-fill"></i> -->


`

export { navbarUser, navbarAdmin }






















                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
              


