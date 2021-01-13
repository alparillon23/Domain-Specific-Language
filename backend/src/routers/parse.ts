import { Request, Response, Router } from 'express'
import { Controller } from '../controller'

const router = Router()

router.post('/', (req: Request, res: Response) => new Controller(req, res))

export default router
