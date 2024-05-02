FROM node:20-alpine3.18

WORKDIR /app

COPY ./app /app

COPY ./script.sh /script.sh
RUN ["chmod", "+x", "/script.sh"]

RUN npm install

# Default environment values
ENV DB_IP="192.168.111.31"
ENV USER_NAME="myuser"
ENV USER_PASSWORD="mypassword!"
ENV DATABASE_NAME="wbdb"
ENV TABLE_NAME="USER"

EXPOSE 3000

CMD ["node", "server.js"]
