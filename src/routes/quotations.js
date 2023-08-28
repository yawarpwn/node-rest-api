import { Router } from 'express'
import { QuotationController} from '../controllers/quotations.js'
export const quotationsRouter = Router()

quotationsRouter.get('/', QuotationController.getAll)
quotationsRouter.get('/:id', QuotationController.getById)
quotationsRouter.post('/', QuotationController.create)
quotationsRouter.patch('/:id', QuotationController.update)
quotationsRouter.delete('/:id', QuotationController.delete)
