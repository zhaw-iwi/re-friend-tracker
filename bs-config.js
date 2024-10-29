module.exports = {
  proxy: "localhost:8080",
  files: ["app/**/*.json"],
  port: 3000,
  open: true,
  notify: false,
  reloadDelay: 500,
  reloadDebounce: 500
};
