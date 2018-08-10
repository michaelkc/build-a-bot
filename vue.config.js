// vue.config.js
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/build-a-bot/'
    : '/'
}