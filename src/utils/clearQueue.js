const fs = require('fs');
const path = require('path');

function clearQueue(filePath) {
    try {
        // Escribe un objeto vacío o la estructura inicial deseada
        fs.writeFileSync(filePath, JSON.stringify({}, null, 2), 'utf8');
        console.log(`El archivo JSON (${filePath}) ha sido limpiado.`);
    } catch (error) {
        console.error(`Error al limpiar el archivo JSON (${filePath}):`, error);
    }
}

// Ruta del archivo JSON (ajusta esto a tu archivo específico)
const pathJSON = path.join(__dirname, '../../queue.json');

// Llamar a la función para limpiar el archivo JSON
clearQueue(pathJSON);
