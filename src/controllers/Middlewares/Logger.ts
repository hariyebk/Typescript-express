import { Request, Response, NextFunction } from "express"

export default function Logger(req: Request, res: Response, next: NextFunction): void{
    console.log("harun bekri")
    next()
}