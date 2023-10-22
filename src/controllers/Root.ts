import { Request, Response, NextFunction } from "express";
import { get, controller, Use } from "./decorators";
import requireAuth from "./Middlewares/Authorization";

@controller("")
// defining routes and their handlers
class Root{
    @get("/")
    getRoot(req: Request, res: Response): void{
        if(req.session && req.session.loggedIn){
            res.send(`
                <div>
                    <p> You are logged in </p>
                    <a href = "/auth/logout"> logout </a>
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
    }
    
    @get("/protected")
    @Use(requireAuth)
    getProtected(req: Request, res: Response): void{
        res.send("Welcome to the protected route logged In user")
    }
}