# Bot Musica Discord

Es un bot interactivo de Discord con habilidades como reproducir música directamente desde listas de reproducción de Spotify, buscar y reproducir canciones específicas de YouTube, y emitir saludos personalizados.
.

## Características

- Enviar mensajes de saludo.
- Agregar canciones desde Spotify a la cola de reproducción.
- Reproducir videos de YouTube en el canal de voz.
- Buscar y reproducir canciones de YouTube por su nombre.
- Desconectar el bot del canal de voz.
- Agregar canciones a la cola de reproducción.

## Comandos

Aquí tienes una lista de los comandos disponibles y qué hace cada uno:

- `/hola`: Enviar un mensaje de saludo en el chat.
- `/spotify <url>`: Agregar todas las canciones de una lista de reproducción de Spotify a la cola de reproducción.
- `/youtube <url>`: Reproducir un video de YouTube en el canal de voz.
- `/buscar <nombre>`: Buscar una canción en YouTube por su nombre y reproducirla en el canal de voz.
- `/encolar`: Agregar una canción a la cola de reproducción.
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
##### Instalar NodeJS: 
- [Release NodeJS](https://nodejs.org/en/download/current)
  
##### Configurar config.json con sus claves de API:
```json
{
  "DISCORD_TOKEN": "TU_CLAVE_API",
  "DISCORD_CLIENT_ID": "TU_CLAVE_API",
  "ID_SERVER": "TU_CLAVE_API",
  "CHANNEL_ID": "TU_CLAVE_API",
  "SPOTIFY_TOKEN": "TU_CLAVE_API",
  "YOUTUBE_API_KEY": "TU_CLAVE_API"
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
##### Iniciar el bot:
```terminal
npm run start
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

5. **Desconectar el Bot del Canal de Voz**:
   - Si deseas que el bot deje el canal de voz, simplemente escribe `/salir` en el chat.
   - El bot se desconectará del canal de voz.

6. **Agregar una Canción a la Cola de Reproducción**:
   - Utiliza el comando `/encolar` seguido de los detalles de la canción que deseas agregar.
   - El bot añadirá la canción especificada a la cola de reproducción actual.

¡Disfruta de la música y la interacción social con **Nombre del Bot** en tu servidor de Discord!


## Contribuir

Si estás interesado en contribuir al proyecto, por favor lee `CONTRIBUTING.md` para obtener más información.

## Licencia

Este proyecto está bajo la Licencia GNU - ver el archivo `LICENSE.md` para detalles.

## Contacto

SlotyHolly - [@SlotyHolly](https://twitter.com/SlotyHolly)

Discord - [Discord](https://discord.gg/DRdKcya5hA)

Link del Proyecto: [https://github.com/SlotyHolly/Bot-Musica-Discord.git]
