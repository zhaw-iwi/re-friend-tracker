FROM node:18.12.1

# Create app directory
WORKDIR /usr/src/app

# Copy app
COPY . .

# Install
RUN npm install
RUN npm run build

# Docker Run Command
EXPOSE 8080
CMD [ "node", "/usr/src/app/server/server.js" ]