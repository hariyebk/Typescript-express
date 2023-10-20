import { Request, Response } from "express"
import get  from "./decorators/routes"
import controller from "./decorators/Controller"


@controller("/auth")
class LoginRoute{
    @get("login")
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

export default LoginRoute