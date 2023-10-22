import { Request, Response, NextFunction } from "express"
// Authorization  middleware
export default function requireAuth(req: Request, res: Response, next: NextFunction): void{
    if(req.session && req.session.loggedIn){
        next()
        return 
    }
    else{
        res.status(403).send(`
        <div>
            <p> You have to login in order to access this route </p>
            <a href = "/auth/login"> login </a>
        </div>
        `)
    }
}

