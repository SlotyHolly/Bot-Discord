const fs = require('fs');
const path = require('path');

// Define la ruta al archivo JSON
const DATA_FILE = path.join(__dirname, '../../queue.json');

function firstJSON() {
    try {
        // Leer el archivo JSON
        const jsonData = fs.readFileSync(DATA_FILE, 'utf8');

        // Convertir los datos a un array de JavaScript
        let data = JSON.parse(jsonData);

        // Verificar si hay elementos en el array
        if (data.length === 0) {
            return null;
        }

        // Obtener el primer elemento
        const firstElement = data[0];

        // Eliminar el primer elemento del array
        data.shift();

        // Guardar el array actualizado en el archivo JSON
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

        // Devolver el primer elemento
        return firstElement;
    } catch (error) {
        console.error('Error al leer o actualizar el archivo JSON:', error);
        return null;
    }
}

module.exports = firstJSON;
