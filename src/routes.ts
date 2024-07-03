import type { Express } from "express"
import GetAllMagicMoversController from "./controllers/GetAllMagicMoversController"
import CreateMagicMoverController from "./controllers/CreateMagicMoverController"
import CreateMagicItemController from "./controllers/CreateMagicItemController"
import GetAllMagicItemsController from "./controllers/GetAllMagicItemsController"
import LoadMatchMoverController from "./controllers/LoadMatchMoverController"
import UnloadMatchMoverController from "./controllers/UnloadMatchMoverController"
import StartMatchMoverMissionController from "./controllers/StartMatchMoverMissionController"
import EndMatchMoverMissionController from "./controllers/EndMatchMoverMissionController"

export default {
  applyMiddleware(server: Express) {
    server.get('/magic-movers', GetAllMagicMoversController.handler)
    server.post('/magic-movers', CreateMagicMoverController.handler)

    server.get('/magic-items', GetAllMagicItemsController.handler)
    server.post('/magic-items', CreateMagicItemController.handler)

    server.post('/magic-movers/:id/load', LoadMatchMoverController.handler)
    server.post('/magic-movers/:id/unload', UnloadMatchMoverController.handler)
    
    server.post('/magic-movers/:id/start-mission', StartMatchMoverMissionController.handler)
    server.post('/magic-movers/:id/end-mission', EndMatchMoverMissionController.handler)
  }
}