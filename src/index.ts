import express from "express"
import { router } from "./routes"
import bodyParser from "body-parser"
import cookieSession from "cookie-session"


class Server{
    app: express.Express = express()
    PORT: number = 3000
    constructor(){
    // adds the body property to the request object
    this.app.use(bodyParser.urlencoded({extended: true}))
    // adds the session property to the request object
    this.app.use(cookieSession({keys: ["harun"]}))
    this.app.use(router)
    }
    start(): void{
        this.app.listen(this.PORT, (): void => {
                console.log(`Listening at port ${this.PORT}`)
        })
    }
}


new Server().start()