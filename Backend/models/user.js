const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

// Buscar usuario por ID
User.finById = (id, result) => {
    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        password
    FROM
        users
    WHERE
        id = ?
    `;

    db.query(sql, [id], (err, user) => {
        if (err) {
            console.log('Error al obtener el usuario:', err.sqlMessage || err);
            result(err, null);
        } else {
            console.log('Usuario obtenido:', user);
            result(null, user);
        }
    });
};

// Buscar usuario por email
User.finByEmail = (email, result) => {
    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        password
    FROM
        users
    WHERE
        email = ?
    `;

    db.query(sql, [email], (err, user) => {
        if (err) {
            console.log('Error al obtener el usuario:', err.sqlMessage || err);
            result(err, null);
        } else {
            console.log('Usuario obtenido:', user[0]);
            result(null, user[0]);
        }
    });
};

// Crear nuevo usuario
User.create = async (user, result) => {
    try {
        // Encriptar la contraseña
        const hash = await bcrypt.hash(user.password, 10);

        const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                user.email,
                user.name,
                user.lastname,
                user.phone,
                user.image || '', // Asegurarse de que el campo imagen no esté vacío
                hash,
                new Date(),
                new Date()
            ],
            (err, res) => {
                if (err) {
                    console.log('Error en la inserción:', err.sqlMessage || err);
                    result(err, null);
                    return;
                }
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        );
    } catch (error) {
        console.log('Error al crear usuario:', error.message || error);
        result(error, null);
    }
};

module.exports = User;
