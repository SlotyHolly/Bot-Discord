const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = require('../../config.json');
const mysql = require('mysql2/promise');

// Crear una conexión a la base de datos
const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

// Función para insertar una canción en la base de datos
async function addSongToDatabase(song) {
    try {
        await db.query(
            'INSERT INTO playlist (song_name, artist_name, song_url, cover_url, duration) VALUES (?, ?, ?, ?, ?)',
            [song.name, song.artist, song.url, song.cover, song.duration]
        );
    } catch (error) {
        console.error('Error al insertar la canción en la base de datos:', error);
    }
}

// Funcion para borrar todas las canciones de la base de datos
async function clearQueue() {
    try {
        await db.query('DELETE FROM playlist');
    } catch (error) {
        console.error('Error al borrar las canciones de la base de datos:', error);
    }
}

// Función para obtener y eliminar la primera canción de la base de datos
async function getAndDeleteFirstSong() {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Obtener la primera canción
        const [rows] = await connection.query('SELECT * FROM playlist LIMIT 1');
        if (rows.length === 0) {
            return false; // Devolver false si no hay canciones en la base de datos
        }
        const firstSong = rows[0];

        // Eliminar la primera canción
        await connection.query('DELETE FROM playlist ORDER BY id LIMIT 1'); // Asegúrate de tener una columna 'id' o algún criterio para identificar la primera fila

        await connection.commit();
        return firstSong;

    } catch (error) {
        await connection.rollback();
        console.error('Error en la transacción de getAndDeleteFirstSong:', error);
        throw error; // Es importante propagar el error para manejarlo en el llamador
    } finally {
        connection.release(); // No olvides liberar la conexión
    }
}

module.exports = {
    addSongToDatabase,
    clearQueue,
    getAndDeleteFirstSong 
};