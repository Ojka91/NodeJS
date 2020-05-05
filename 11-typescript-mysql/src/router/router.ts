import {Router, Request, Response} from 'express'

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: "Everything ok"
    })
})


router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id;

    res.json({
        ok: true,
        mensaje: "Everything ok",
        id:id
    })
})




export default router;