import type { Express } from "express"
import GetAllMagicMoversController from "./controllers/GetAllMagicMoversController"
import CreateMagicMoverController from "./controllers/CreateMagicMoverController"
import CreateMagicItemController from "./controllers/CreateMagicItemController"
import GetAllMagicItemsController from "./controllers/GetAllMagicItemsController"

export default {
  applyMiddleware(server: Express) {
    server.get('/magic-movers', GetAllMagicMoversController.handler)
    server.post('/magic-movers', CreateMagicMoverController.handler)

    server.get('/magic-items', GetAllMagicItemsController.handler)
    server.post('/magic-items', CreateMagicItemController.handler)
  }
}