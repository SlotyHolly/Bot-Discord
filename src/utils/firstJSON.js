const fs = require('fs');
const path = require('path');

// Define la ruta al archivo JSON
const DATA_FILE = path.join(__dirname, '../../queue.json');

function firstJSON() {
    try {
        const jsonData = fs.readFileSync(DATA_FILE, 'utf8');
        let data = JSON.parse(jsonData);

        // Verificar si data es un array
        if (!Array.isArray(data)) {
            console.error('El contenido del archivo JSON no es un array');
            return null;
        }

        if (data.length === 0) {
            return null;
        }

        const firstElement = data.shift();
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return firstElement;
    } catch (error) {
        console.error('Error al leer o actualizar el archivo JSON:', error);
        return null;
    }
}

module.exports = firstJSON;
