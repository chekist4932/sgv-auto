#SGV-Auto documentation



## How to deploy

### Common

1. Connect to vps
2. sudo apt-get update && sudo apt-get upgrade

### Ssl certificate

1. sudo snap install core; sudo snap refresh core
2. sudo apt remove certbot
3. sudo snap install --classic certbot
4. sudo ln -s /snap/bin/certbot /usr/bin/certbot
5. sudo ufw allow 80
6. sudo ufw allow 443
7. sudo certbot certonly --standalone -d sgv-auto.ru

### Install docker/docker-compose
1. sudo apt install apt-transport-https ca-certificates curl software-properties-common
2. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
3. sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
4. sudo apt update
5. apt-cache policy docker-ce
6. sudo apt install docker-ce
7. sudo apt-get install docker-compose-plugin

### Clone repository