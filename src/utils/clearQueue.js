const fs = require('fs');
const path = require('path');

function clearQueue() {
    const filePath = path.join(__dirname, '../../queue.json');
    try {
        // Escribe un objeto vacío en el archivo JSON
        fs.writeFileSync(filePath, JSON.stringify({}, null, 2), 'utf8');
        console.log(`El archivo JSON (${filePath}) ha sido limpiado.`);
    } catch (error) {
        console.error(`Error al limpiar el archivo JSON (${filePath}):`, error);
    }
}

module.exports = clearQueue;