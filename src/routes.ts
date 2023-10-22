import { Router, Request, Response, NextFunction } from "express";

interface RequestBody extends Request{
    body: {
        [key: string]: string| undefined
    }
}
const router = Router()

// Authorization  middleware
function requireAuth(req: Request, res: Response, next: NextFunction): void{
    if(req.session && req.session.loggedIn){
        next()
        return 
    }
    else{
        res.status(403).send(`
        <div>
            <p> You have to login in order to access this route </p>
            <a href = "/login"> login </a>
        </div>
        
        `)
    }
}

router.get("/", (req: Request, res: Response) => {
    if(req.session && req.session.loggedIn){
        res.send(`
            <div>
                <p> You are logged in </p>
                <a href = "/logout"> logout </a>
            </div>
        `)
    }
    else{
        res.send(`
            <div>
                <p> You are not logged in </p>
                <a href = "/auth/login"> login </a>
            </div>
        `)
    }
})
router.get("/logout", (req: Request, res: Response) => {
    req.session = undefined
    res.send(`
    <div>
        <p> You are logged out !! </p>
        <a href = "/auth/login"> Login </a>
    </div>
    
    `)
})
router.get("/protected", requireAuth, (req: Request, res: Response) => {
    res.send("Welcome to the protected route loggedin user")
})



export {router}