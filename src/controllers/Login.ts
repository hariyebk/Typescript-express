import { Request, Response } from "express"
import {controller, get} from "./decorators"

@controller("/auth")
class Login {
    @get("/login")
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
}

