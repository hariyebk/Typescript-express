import { NextFunction, Request, Response } from "express"
import {controller, get, Use, requiredProps, post} from "./decorators"
import Logger from "./Middlewares/Logger"
// defining routes and their handlers
@controller("/auth")
class Authentication {
    @get("/login")
    @Use(Logger)
    getLogin(req: Request, res: Response): void{
        res.send(`
        <form method = "POST">
            <div>
                <div>
                    <label> Email: </label>
                    <input name = "email" type = "email"/>
                </div>
                <div>
                    <label> Password: </label>
                    <input name = "password" type = "password"/>
                </div>
                <button type = "submit"> Submit </button>
            </div>
        </form>
        `)
    }

    @post("/login")
    @requiredProps("email, password")
    postLogin(req: Request, res: Response): void{
        req.session = {loggedIn: true}
        res.redirect("/")
    }

    @get("/logout")
    getLogout(req: Request, res: Response): void{
        req.session = undefined
        res.send(`
        <div>
            <p> You are logged out !! </p>
            <a href = "/auth/login"> Login </a>
        </div>
        
        `)
    }
}

