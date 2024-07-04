import type { Express } from "express"
import GetAllMagicMoversController from "./controllers/GetAllMagicMoversController"
import CreateMagicMoverController from "./controllers/CreateMagicMoverController"
import CreateMagicItemController from "./controllers/CreateMagicItemController"
import GetAllMagicItemsController from "./controllers/GetAllMagicItemsController"
import LoadMatchMoverController from "./controllers/LoadMatchMoverController"
import UnloadMatchMoverController from "./controllers/UnloadMatchMoverController"
import StartMatchMoverMissionController from "./controllers/StartMatchMoverMissionController"
import EndMatchMoverMissionController from "./controllers/EndMatchMoverMissionController"
import GetAllMagicMoverMissionsController from "./controllers/GetAllMagicMoverMissionsController"
import GetAllMagicMoverCurrentMissionController from "./controllers/GetAllMagicMoverCurrentMissionController"

export default {
  applyMiddleware(server: Express) {
    server.get('/magic-movers', GetAllMagicMoversController.handler)
    server.post('/magic-movers', CreateMagicMoverController.handler)

    server.get('/magic-items', GetAllMagicItemsController.handler)
    server.post('/magic-items', CreateMagicItemController.handler)

    server.post('/magic-movers/:id/load-item', LoadMatchMoverController.handler)
    server.post('/magic-movers/:id/unload-item', UnloadMatchMoverController.handler)
    
    server.post('/magic-movers/:id/start-mission', StartMatchMoverMissionController.handler)
    server.post('/magic-movers/:id/end-mission', EndMatchMoverMissionController.handler)
  
    server.get('/magic-movers/:id/missions', GetAllMagicMoverMissionsController.handler)
    server.get('/magic-movers/:id/current-mission', GetAllMagicMoverCurrentMissionController.handler)
  }
}