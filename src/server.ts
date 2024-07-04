import express from 'express'
import routes from './routes'
import swaggerUI from 'swagger-ui-express'
import path from 'node:path'
import YAML from 'yamljs'

const app = express()
app.use(express.json())

routes.applyMiddleware(app)

const swaggerFilename = path.join(__dirname, '../swagger.yaml')
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(YAML.load(swaggerFilename)))

export default app