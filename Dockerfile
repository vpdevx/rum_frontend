# Use a imagem oficial do Nginx como base
FROM nginx:latest

# Copie seus arquivos para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Copie a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta 80
EXPOSE 80
