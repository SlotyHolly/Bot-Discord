const fs = require('fs');
const path = require('path');

function newQueue(cancion) {
    const DATA_FILE = path.join(__dirname, '../../queue.json');
    let data;

    // Leer el archivo JSON existente si existe, o inicializarlo como un array vacío
    try {
        data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (error) {
        data = [];
    }

    // Agregar la canción al array
    data.push(cancion);

    // Guardar el array actualizado en el archivo JSON
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}


module.exports = newQueue;