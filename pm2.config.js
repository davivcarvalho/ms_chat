module.exports = {
  apps : [{
    name   : "chat",
    script : "./dist/main.js"
  }],
  env_production: {
    NODE_ENV: "production"
 },
}