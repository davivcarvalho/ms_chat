module.exports = {
  apps: [
    {
      name: 'chat',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
