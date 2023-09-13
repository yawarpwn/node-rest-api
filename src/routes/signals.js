import { Router } from 'express'
import { SignalController} from '../controllers/signals.js'

export const signalsRouter = Router()

signalsRouter.get('/', SignalController.getAll )



