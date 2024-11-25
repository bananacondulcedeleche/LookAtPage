//modulos
const express = require('express');
const fs = require('fs') //Permite trabajar con archivos (file system) incluida con node, no se instala
const cors = require('cors')
require ('dotenv/config')
const baseDatos = require('./baseDatos/conexion')
const app = express();
// const port = 3000;
const port = process.env.port||3000;


//Middleware
app.use(express.json())
app.use(express.static('./public')) //Ejecuta directamente el front al correr el servidor
app.use(cors())




app.get('/productos', (req, res) => {
    // res.send('Listado de productos')
    // const datos= leerDatos();
    const sql = "SELECT * FROM productos";
    baseDatos.query(sql, (err, result) => {
        if (err) {
            console.error('ERROR DE LECTURA')
            return;
        }
        console.log(result)
        res.json(result)
    })
    //res.json(datos.productos);

})

app.get('/productos/:id', (req, res) => {
    //res.send('Buscar producto por ID')
    const datos = leerDatos();
    const prodEncontrado = datos.productos.find((p) => p.id == req.params.id)
    if (!prodEncontrado) { // ! (no) o diferente
        return res.status(404).json(`No se encuentra el producto`)
    }
    res.json({
        mensaje: "producto encontrado",
        producto: prodEncontrado
    })
})

app.post('/productos', (req, res) => {
    //res.send('Guardando nuevo producto')
    console.log(req.body)
    console.log(Object.values(req.body))
    const values = Object.values(req.body)
    const sql = "INSERT INTO productos (imagen, titulo, descripcion, precio) VALUES (?,?,?,?)"

    baseDatos.query(sql, values, (err, result) => {
        if (err) {
            console.error('ERROR AL GUARDAR')
            return;
        }
        console.log(result)
        res.json({ mensaje: "nuevo producto agregado" })
    })

})

// const datos= leerDatos();
// nuevoProducto = { id: datos.productos.length + 1, ...req.body }     //Genera un ID y agrega una copia de req.body
//  datos.productos.push(nuevoProducto)
//  escribirDatos(datos);
//  res.json({"mensaje":'Nuevo producto agregado'});



app.put('/productos/:id', (req, res) => {
    // // res.send('Actualizar producto por id')
    // const id = req.params.id;
    // const nuevosDatos = req.body;
    // const datos = leerDatos()
    // const prodEncontrado = datos.productos.find((p) => p.id == req.params.id)
    // console.log(prodEncontrado)
    // if (!prodEncontrado) {
    //     return res.status(404).json({ "Mensaje": "No se encontró el producto" })
    // }
    // datos.productos = datos.productos.map(p => p.id == req.params.id ? { ...p, ...nuevosDatos } : p)
    // escribirDatos(datos)
    // res.json({ "Mensaje": "Producto Actualizado" })


    //console.log(valores)
    const id = req.params.id; // Extraer el id de los parámetros de la URL
    const valores = [req.body.titulo, req.body.descripcion, req.body.precio, id]; 
    const sql = "UPDATE productos SET titulo = ?, descripcion = ?, precio = ? WHERE id = ?";

    baseDatos.query(sql, valores, (err, result) => {
        if (err) {
            console.error('ERROR AL MODIFICAR REGISTRO:', err.message);
            return res.status(500).json({ mensaje: 'Error al modificar el producto' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({
            mensaje: 'Producto actualizado exitosamente',
            data: result,
        });
    });
});


    


app.delete('/productos/:id', (req, res) => {
    const id = req.params.id; // Extraer el id desde los parámetros de la URL
    const sql = "DELETE FROM productos WHERE id = ?";

    baseDatos.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al borrar el producto:', err.message);
            return res.status(500).json({ mensaje: 'Error al eliminar el producto' });
        }

        if (result.affectedRows === 0) {
            // No se encontró un producto con el id proporcionado
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto eliminado exitosamente' });
    });
});
    // res.send('Eliminando Producto')
   // const id = req.params.id;
   // const datos = leerDatos()
   // const prodEncontrado = datos.productos.find((p) => p.id == req.params.id)
  //  if (!prodEncontrado) {
  //      return res.status(404).json(`No se encuentra el producto`)
  //  }
  //  datos.productos = datos.productos.filter((p) => p.id != req.params.id)
  //  let indice = 1
  //  datos.productos.map((p) => {
  //      p.id = indice
  //      indice++
  //  })
  //  escribirDatos(datos)



  
// Ruta para manejar el inicio de sesión
// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { usuario, contrasenia } = req.body;

    // Validar que se envíen ambos campos
    if (!usuario || !contrasenia) {
        return res.status(400).json({ success: false, message: 'Usuario y contraseña son requeridos' });
    }

    // Consulta a la base de datos
    const sql = "SELECT * FROM usuario WHERE usuario = ? AND contrasenia = ?";
    baseDatos.query(sql, [usuario, contrasenia], (err, result) => {
        if (err) {
            console.error('Error al verificar las credenciales:', err.message);
            return res.status(500).json({ success: false, message: 'Error del servidor' });
        }

        if (result.length > 0) {
            // Usuario encontrado y credenciales correctas
            res.json({ success: true, usuario: result[0].usuario });
        } else {
            // Credenciales incorrectas
            res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    });
});



// Obtener todos los usuarios
// app.get('/usuario', (req, res) => {
//     const sql = "SELECT * FROM usuario";
//     baseDatos.query(sql, (err, result) => {
//         if (err) {
//             console.error('ERROR DE LECTURA:', err.message);
//             return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
//         }
//         res.json(result);
//     });
// });

// // Obtener un usuario por ID
// app.get('/usuario/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM usuario WHERE id = ?";
//     baseDatos.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error('ERROR DE LECTURA:', err.message);
//             return res.status(500).json({ mensaje: 'Error al buscar el usuario' });
//         }
//         if (result.length === 0) {
//             return res.status(404).json({ mensaje: 'Usuario no encontrado' });
//         }
//         res.json(result[0]);
//     });
// });

// app.post('/login', (req, res) => {
//     const { usuario, contrasenia } = req.body;

//     const sql = "SELECT * FROM usuario WHERE usuario = ? AND contrasenia = ?";
//     baseDatos.query(sql, [usuario, contrasenia], (err, result) => {
//         if (err) {
//             console.error('Error al verificar las credenciales:', err.message);
//             return res.status(500).json({ success: false, message: 'Error del servidor' });
//         }

//         if (result.length > 0) {
//             // Usuario encontrado
//             res.json({ success: true, usuario: result[0].usuario });
//         } else {
//             // Credenciales incorrectas
//             res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
//         }
//     });
// });

// // Actualizar un usuario por ID
// app.put('/usuario/:id', (req, res) => {
//     const id = req.params.id;
//     const { usuario, contrasenia } = req.body;
//     const sql = "UPDATE usuario SET usuario = ?, contrasenia = ? WHERE id = ?";
//     baseDatos.query(sql, [usuario, contrasenia, id], (err, result) => {
//         if (err) {
//             console.error('ERROR AL ACTUALIZAR:', err.message);
//             return res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ mensaje: 'Usuario no encontrado' });
//         }
//         res.json({ mensaje: 'Usuario actualizado exitosamente' });
//     });
// });

// // Eliminar un usuario por ID
// app.delete('/usuario/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "DELETE FROM usuario WHERE id = ?";
//     baseDatos.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error('ERROR AL ELIMINAR:', err.message);
//             return res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ mensaje: 'Usuario no encontrado' });
//         }
//         res.json({ mensaje: 'Usuario eliminado exitosamente' });
//     });
// });



app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});