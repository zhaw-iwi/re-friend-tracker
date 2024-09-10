FROM node:22.8.0
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
CMD ["node","dist/server/server.js"]
EXPOSE 10000