import "reflect-metadata"
import AppRouter from "../../AppRouter"
import { Methods, Metadata } from "../Enums"
import { Request, Response,NextFunction, RequestHandler } from "express"
import { credentials } from "../../credentials"

function Validator(props: string[]){
    // checks if the request body has the required properties (email and password)
    return function(req: Request, res: Response, next: NextFunction){
        // check if there is a body property in the request object
        if(!req.body){
            return res.status(422).send(" Invalid request")
        }
        for(let prop of props){
            // check if therequired properties exist in request.body
            if(!req.body[prop]){
                return res.status(422).send(`${prop} is Required`)
            }
            // check if the email and password are correct
            if(req.body[prop] !== credentials[prop]){
                console.log(req.body[prop], credentials[prop])
                return res.status(403).send(`Incorrect ${prop}`)
            }
        }
        next()
    }
}


// This decorator factory will associate the routehandler to the router as soon as the class is defined.
export function controller(pathPrefix: string){
    return function(target: Function) {
        const router = AppRouter.approuter
        // loop over the class prototypes  and find methods with  their metadata
        const methods = Object.getOwnPropertyNames(target.prototype)
        methods.forEach((methodName: string): void => {
            if(methodName !== "constructor"){
                // route handler method inside the class
                const routehandler = target.prototype[methodName]
                // finding the metadata with a name of path
                const path = Reflect.getMetadata(Metadata.path, target.prototype, methodName)
                const httpmethod: Methods = Reflect.getMetadata(Metadata.method, target.prototype, methodName)
                const middlewares = Reflect.getMetadata(Metadata.middleware, target.prototype, methodName) || []
                const bodyProps = Reflect.getMetadata(Metadata.validator, target.prototype, methodName) || []
                // console.log(bodyProps, middlewares)
                // if the method is decorated with a path
                if(path){
                    router[httpmethod](`${pathPrefix}${path}`, ...middlewares, Validator(bodyProps), routehandler)
                    // all the middlewares defined in the use decorator will run before the route handeler
                }
            }
        })
    }
}