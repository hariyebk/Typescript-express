import express from "express"
import { router } from "./routes"
import bodyParser from "body-parser"
import cookieSession from "cookie-session"
import "./controllers/Login"
import AppRouter from "./AppRouter"

const app =  express()

app.use(bodyParser.urlencoded({extended: true}))
// adds the session property to the request object
app.use(cookieSession({keys: ["harun"]}))
// Main router
app.use(router)
// controller router
app.use(AppRouter.approuter)


const PORT: number = 3000

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})


// class Server{
//     app: express.Express = express()
//     PORT: number = 3000
//     constructor(){
//     // adds the body property to the request object
//     this.app.use(bodyParser.urlencoded({extended: true}))
//     // adds the session property to the request object
//     this.app.use(cookieSession({keys: ["harun"]}))
//     // Main router
//     this.app.use(router)
//     // controller router
//     this.app.use(AppRouter.approuter)
//     }
//     start(): void{
//         this.app.listen(this.PORT, (): void => {
//                 console.log(`Listening at port ${this.PORT}`)
//         })
//     }
// }


// new Server().start()