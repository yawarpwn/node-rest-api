import { Router } from 'express'
import { SignalController} from '../controllers/signals.js'
import { filesMiddleware } from '../middlewares/files.js'

export const signalsRouter = Router()

signalsRouter.get('/', SignalController.getAll )
signalsRouter.get('/:id', SignalController.getById)
signalsRouter.post('/', [filesMiddleware()] ,SignalController.create)
signalsRouter.patch('/:id', [filesMiddleware()], SignalController.update)
signalsRouter.delete('/:id', SignalController.delete)



