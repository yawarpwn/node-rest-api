import { Router } from 'express'
import { SignalController} from '../controllers/signals.js'
import { filesMiddleware } from '../middlewares/files.js'

export function createSignalRoute({ signalModel}) {
  const signalController = new SignalController({ signalModel})

  const signalsRouter = Router()

  signalsRouter.get('/', signalController.getAll )
  signalsRouter.get('/:id', signalController.getById)
  signalsRouter.post('/', [filesMiddleware()] ,signalController.create)
  signalsRouter.patch('/:id', [filesMiddleware()], signalController.update)
  signalsRouter.delete('/:id', signalController.delete)

  return signalsRouter
}



