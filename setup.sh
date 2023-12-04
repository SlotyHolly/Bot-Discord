#!/bin/bash

# Función para mostrar la barra de progreso
show_progress() {
  echo -ne '####################                     (50%)\r'
  sleep 1
  echo -ne '####################################     (100%)\r'
  echo -ne '\n'
}

# Actualización de paquetes
echo "Actualizando paquetes..."
sudo apt-get update
show_progress

# Instalación de Node.js
echo "Instalando Node.js..."
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=21
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install nodejs -y
show_progress

# Instalación de MySQL
echo "Instalando MySQL..."
sudo apt-get install default-mysql-server
show_progress

# Verificando el estado de MySQL
echo "Verificando el estado de MySQL..."
sudo systemctl status mysql

# Instalación de PM2
echo "Instalando PM2..."
sudo npm install pm2 -g
show_progress

# Integrar MySQL con el Bot de Discord
echo "Integrando MySQL con el Bot de Discord..."
npm install mysql
show_progress

echo "Instalación completada."