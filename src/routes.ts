import type { Express } from "express"
import GetAllMagicMoversController from "./controllers/GetAllMagicMoversController"
import CreateMagicMoverController from "./controllers/CreateMagicMoverController"
import CreateMagicItemController from "./controllers/CreateMagicItemController"
import GetAllMagicItemsController from "./controllers/GetAllMagicItemsController"
import LoadMagicMoverController from "./controllers/LoadMagicMoverController"
import UnloadMagicMoverController from "./controllers/UnloadMagicMoverController"
import StartMagicMoverMissionController from "./controllers/StartMagicMoverMissionController"
import EndMagicMoverMissionController from "./controllers/EndMagicMoverMissionController"
import GetAllMagicMoverMissionsController from "./controllers/GetAllMagicMoverMissionsController"
import GetMagicMoverCurrentMissionController from "./controllers/GetMagicMoverCurrentMissionController"

export default {
  applyMiddleware(server: Express) {
    server.get('/magic-movers', GetAllMagicMoversController.handler)
    server.post('/magic-movers', CreateMagicMoverController.handler)

    server.get('/magic-items', GetAllMagicItemsController.handler)
    server.post('/magic-items', CreateMagicItemController.handler)

    server.post('/magic-movers/:id/load-item', LoadMagicMoverController.handler)
    server.post('/magic-movers/:id/unload-item', UnloadMagicMoverController.handler)
    
    server.post('/magic-movers/:id/start-mission', StartMagicMoverMissionController.handler)
    server.post('/magic-movers/:id/end-mission', EndMagicMoverMissionController.handler)
  
    server.get('/magic-movers/:id/missions', GetAllMagicMoverMissionsController.handler)
    server.get('/magic-movers/:id/current-mission', GetMagicMoverCurrentMissionController.handler)
  }
}