const url = require('url');

module.exports = {
  proxy: {
    target: 'http://localhost:8080',
    ws: true
  },
  proxy: "localhost:8080",
  files: ["app/**/*.json"],
  port: 3000,
  open: true,
  notify: false,
  reloadDelay: 500,
  reloadDebounce: 500,
  socket: {
    domain: process.env.CODESPACE_NAME
      ? `https://${process.env.CODESPACE_NAME}-3000.app.github.dev`
      : 'http://localhost:3000'
  }
};
