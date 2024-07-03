require('dotenv').config()

export default {
  get (key: string, defaultValue: string) {
    return process.env[key] || defaultValue
  }
}