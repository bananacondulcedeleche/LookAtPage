// Modulos
const express = require('express');
const fs = require('fs'); // Permite trabajar con archivos (file system) incluida con node, no se instala
const cors = require('cors');
require('dotenv/config');
const path = require('path');
const baseDatos = require('./baseDatos/conexion');
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');

// Middleware
app.use(express.json());
// app.use(express.static('./public')); // Ejecuta directamente el front al correr el servidor
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
    const sql = "SELECT * FROM productos";
    baseDatos.query(sql, (err, result) => {
        if (err) {
            console.error('ERROR DE LECTURA:', err.message);
            return res.status(500).json({ mensaje: 'Error al obtener productos' });
        }
        res.json(result);
    });
});

// Endpoint para obtener un producto por ID
app.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM productos WHERE id = ?";
    baseDatos.query(sql, [id], (err, result) => {
        if (err) {
            console.error('ERROR DE LECTURA:', err.message);
            return res.status(500).json({ mensaje: 'Error al buscar el producto' });
        }
        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({
            mensaje: "Producto encontrado",
            producto: result[0]
        });
    });
});

// Endpoint para crear un nuevo producto
app.post('/productos', (req, res) => {
    const { imagen, titulo, descripcion, precio } = req.body;
    const sql = "INSERT INTO productos (imagen, titulo, descripcion, precio) VALUES (?, ?, ?, ?)";
    baseDatos.query(sql, [imagen, titulo, descripcion, precio], (err, result) => {
        if (err) {
            console.error('ERROR AL GUARDAR:', err.message);
            return res.status(500).json({ mensaje: 'Error al guardar el producto' });
        }
        res.json({ mensaje: "Nuevo producto agregado" });
    });
});

// Endpoint para actualizar un producto por ID
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, descripcion, precio } = req.body;
    const sql = "UPDATE productos SET titulo = ?, descripcion = ?, precio = ? WHERE id = ?";
    baseDatos.query(sql, [titulo, descripcion, precio, id], (err, result) => {
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

// Endpoint para eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM productos WHERE id = ?";
    baseDatos.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al borrar el producto:', err.message);
            return res.status(500).json({ mensaje: 'Error al eliminar el producto' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto eliminado exitosamente' });
    });
});

// Ruta para manejar el inicio de sesión
app.post('/login', async (req, res) => {
    const { nombre, contrasenia } = req.body;

    if (!nombre || !contrasenia) {
        return res.status(400).json({ success: false, message: 'Nombre y contraseña son requeridos' });
    }

    try {
        const sql = "SELECT * FROM usuario WHERE nombre = ?";
        baseDatos.query(sql, [nombre], async (err, result) => {
            if (err) {
                console.error('Error al verificar las credenciales:', err.message);
                return res.status(500).json({ success: false, message: 'Error del servidor' });
            }

            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            const usuarioEncontrado = result[0];
            const contraseniaCoincide = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);

            if (contraseniaCoincide) {
                res.json({ success: true, usuario: usuarioEncontrado.nombre, id: usuarioEncontrado.id });
            } else {
                res.status(401).json({ success: false, message: 'Nombre o contraseña incorrectos' });
            }
        });
    } catch (error) {
        console.error('ERROR AL VERIFICAR LAS CREDENCIALES:', error.message);
        return res.status(500).json({ mensaje: 'Error al verificar las credenciales' });
    }
});

// Obtener todos los usuarios
app.get('/usuario', (req, res) => {
    const sql = "SELECT * FROM usuario";
    baseDatos.query(sql, (err, result) => {
        if (err) {
            console.error('ERROR DE LECTURA:', err.message);
            return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
        }
        res.json(result);
    });
});

// Obtener un usuario por ID
app.get('/usuario/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM usuario WHERE id = ?";
    baseDatos.query(sql, [id], (err, result) => {
        if (err) {
            console.error('ERROR DE LECTURA:', err.message);
            return res.status(500).json({ mensaje: 'Error al buscar el usuario' });
        }
        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(result[0]);
    });
});

// Endpoint para crear un nuevo usuario
app.post('/usuario', async (req, res) => {
    const { nombre, contrasenia } = req.body;

    // Validación de campos
    if (!nombre || !contrasenia) {
        return res.status(400).json({ mensaje: 'Nombre y contraseña son requeridos' });
    }

    try {
        // Cifrar la contraseña
        const saltRounds = 10;
        const contraseniaCifrada = await bcrypt.hash(contrasenia, saltRounds);

        const sql = "INSERT INTO usuario (nombre, contrasenia) VALUES (?, ?)";
        baseDatos.query(sql, [nombre, contraseniaCifrada], (err, result) => {
            if (err) {
                console.error('ERROR AL GUARDAR:', err.message);
                return res.status(500).json({ mensaje: 'Error al guardar el usuario' });
            }
            res.json({ success: true, mensaje: "Nuevo usuario agregado", id: result.insertId, nombre: nombre });
        });
    } catch (error) {
        console.error('ERROR AL CIFRAR LA CONTRASEÑA:', error.message);
        return res.status(500).json({ mensaje: 'Error al cifrar la contraseña' });
    }
});

// Actualizar un usuario por ID
app.put('/usuario/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, contrasenia } = req.body;

     // Cifrar la contraseña
     const saltRounds = 10;
     const contraseniaCifrada = await bcrypt.hash(contrasenia, saltRounds);
     
    const sql = "UPDATE usuario SET nombre = ?, contrasenia = ? WHERE id = ?";
    baseDatos.query(sql, [nombre, contraseniaCifrada, id], (err, result) => {
        if (err) {
            console.error('ERROR AL ACTUALIZAR:', err.message);
            return res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario actualizado exitosamente',success: true });
    });
});

// Eliminar un usuario por ID
app.delete('/usuario/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM usuario WHERE id = ?";
    baseDatos.query(sql, [id], (err, result) => {
        if (err) {
            console.error('ERROR AL ELIMINAR:', err.message);
            return res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario eliminado exitosamente' });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});