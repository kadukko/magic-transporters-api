import EnvironmentModule from './modules/EnvironmentModule'
import LoggerModule from './modules/LoggerModule'
import app from './server'

const PORT = EnvironmentModule.get('PORT', '4000')

app.listen(PORT, () => {
  LoggerModule.log('Listening to localhost:' + PORT)
})