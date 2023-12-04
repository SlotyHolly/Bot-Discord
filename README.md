# Bot Musica Discord

Es un bot interactivo de Discord con habilidades como reproducir música directamente desde listas de reproducción de Spotify, buscar y reproducir canciones específicas de YouTube, y emitir saludos personalizados.
.

## Características

- Enviar mensajes de saludo, junto con el ping del bot.
- Agregar canciones desde Spotify a la cola de reproducción.
- Pasar a la siguiente canción de la cola de reproducción.
- Buscar y reproducir canciones de YouTube por su nombre.
- Reproducir canciones de YouTube en el canal de voz.
- Pausar la canción actual.
- Reanudar la canción actual.
- Activar el modo aleatorio.
- Desconectar el bot del canal de voz.

## Comandos

Aquí tienes una lista de los comandos disponibles y qué hace cada uno:

- `/hola`: Enviar un mensaje de saludo en el chat.
- `/spotify <url>`: Agregar todas las canciones de una lista de reproducción de Spotify a la cola de reproducción.
- `/youtube <url>`: Reproducir un video de YouTube en el canal de voz.
- `/buscar <nombre>`: Buscar una canción en YouTube por su nombre y reproducirla en el canal de voz.
- `/next`: Reproducir la siguiente canción de la cola de reproducción.
- `/pause`: Pausar la canción actual.
- `/play`: Reanudar la canción actual.
- `/shuffle`: Activar el modo aleatorio.
- `/help`: Mostrar la lista de comandos.
- `/salir`: Desconectar el bot del canal de voz.

## Instalación

Instrucciones paso a paso sobre cómo instalar y configurar el bot en un servidor de Discord.

### Requisitos Previos

- Node.js versión 21.2.0 o superior.
- Una cuenta de Discord y acceso al [Portal de Desarrolladores de Discord](https://discord.com/developers/applications).
- Una cuenta de Google y acceso al [Portal de Desarrolladores de Google](https://console.developers.google.com/?hl=es-419).
- Una cuenta de Spotify y acceso al [Portal de Desarrolladores de Spotify](https://developer.spotify.com/).

### Pasos de Instalación

##### Clonar el repositorio:
```git
git clone https://github.com/SlotyHolly/Bot-Discord.git
```
##### Iniciar setup.sh para instalar las dependencias: 
```git
sudo chmod +x setup.sh
sudo ./setup
```

##### Configuración Inicial de MySQL:
Aca se te pedirá que ingreses un usuario y contraseña para el usuario root de MySQL. Recuerda esta contraseña, ya que la necesitarás más adelante.
```git
sudo mysql_secure_installation
```

##### Crear Base de Datos y Tablas:
```git
sudo mysql -u root -p
CREATE DATABASE bot_discord;
USE bot_discord;
CREATE TABLE playlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    song_name VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255),
    song_url VARCHAR(255),
    cover_url VARCHAR(255),
    duration INT
);
```
##### Configurar config.json con sus claves de API:
```json
{
  "DISCORD_TOKEN": "TU_CLAVE_API",
  "DISCORD_CLIENT_ID": "TU_CLAVE_API",
  "ID_SERVER": "TU_CLAVE_API",
  "CHANNEL_ID": "TU_CLAVE_API",
  "SPOTIFY_TOKEN": "TU_CLAVE_API",
  "YOUTUBE_API_KEY": "TU_CLAVE_API",
  "DB_HOST": "localhost",
  "DB_USER": "EL_USUARIO_DE_TU_BASE_DE_DATOS",
  "DB_PASSWORD": "LA_CONTRASEÑA_DE_TU_BASE_DE_DATOS",
  "DB_DATABASE": "bot_discord"
}
```

##### Instalar las dependencias: 
```git
npm install
```

##### Cargar comandos en tu servidor:
```terminal
npm run updatecommands
```

##### Iniciar el Bot con PM2:
```terminal
pm2 start bot.js --name "mi-bot-discord"
```
Reemplaza "mi-bot-discord" con el nombre que quieras darle a este proceso en PM2.

#####  Configuración Automática de Reinicio:
```terminal
pm2 startup
```
Después de ejecutar este comando, PM2 te proporcionará un comando que necesitas copiar y ejecutar para completar la configuración.

#####  Guardar la Lista de Procesos:
```terminal
pm2 save
```

## Cómo Usarlo

Una vez que **Bot** esté activo en tu servidor de Discord, usarlo es muy sencillo. Aquí te explicamos cómo interactuar con el bot y aprovechar todas sus funciones:

1. **Enviar un Saludo**: Escribe `/hola` en el chat para recibir un mensaje de saludo amistoso del bot.

2. **Reproducir Música de Spotify**: 
   - Encuentra la URL de la lista de reproducción de Spotify que deseas reproducir.
   - Usa el comando `/spotify <url>` en el chat, reemplazando `<url>` con la URL de tu lista de reproducción.
   - El bot agregará las canciones de la lista de reproducción a la cola.

3. **Reproducir Videos de YouTube en el Canal de Voz**: 
   - Encuentra la URL del video de YouTube que quieres reproducir.
   - Utiliza el comando `/youtube <url>` en el chat, sustituyendo `<url>` con la URL del video.
   - El bot reproducirá el audio del video en el canal de voz en el que te encuentres.

4. **Buscar y Reproducir una Canción de YouTube**:
   - Escribe `/buscar <nombre>` en el chat, reemplazando `<nombre>` con el nombre de la canción que deseas buscar.
   - El bot buscará la canción en YouTube y la reproducirá en el canal de voz.

5. **Agregar una Canción a la Cola de Reproducción**:
   - Utiliza el comando `/encolar` seguido de los detalles de la canción que deseas agregar.
   - El bot añadirá la canción especificada a la cola de reproducción actual.

6. **Cambiar de Canción**:
   - Si deseas cambiar la canción que se está reproduciendo actualmente, simplemente escribe `/next` en el chat.
   - El bot reproducirá la siguiente canción de la cola de reproducción.

7. **Pausar la Canción**:
   - Si deseas pausar la canción que se está reproduciendo actualmente, simplemente escribe `/pause` en el chat.
   - El bot pausará la canción actual.

8. **Reanudar la Canción**:   
   - Si deseas reanudar la canción que se está reproduciendo actualmente, simplemente escribe `/play` en el chat.
   - El bot reanudará la canción actual.

9. **Activar aleatorio**:
   - Si deseas activar el modo aleatorio, simplemente escribe `/shuffle` en el chat.
   - El bot activará el modo aleatorio.
10. **Mostrar lista de comandos**:
   - Si deseas ver la lista de comandos, simplemente escribe `/help` en el chat.
   - El bot mostrará la lista de comandos.

11. **Desconectar el Bot del Canal de Voz**:
   - Si deseas que el bot deje el canal de voz, simplemente escribe `/salir` en el chat.
   - El bot se desconectará del canal de voz.

¡Disfruta de la música y la interacción social con **Nombre del Bot** en tu servidor de Discord!


## Contribuir

Si estás interesado en contribuir al proyecto, por favor lee `CONTRIBUTING.md` para obtener más información.

## Licencia

Este proyecto está bajo la Licencia GNU - ver el archivo `LICENSE.md` para detalles.

## Contacto

SlotyHolly - [@SlotyHolly](https://twitter.com/SlotyHolly)

Discord - [Discord](https://discord.gg/DRdKcya5hA)

Link del Proyecto: [https://github.com/SlotyHolly/Bot-Musica-Discord.git]
