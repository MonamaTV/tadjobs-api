import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send({
    message: "You are at the Users routes",
  });
});

export default router;
