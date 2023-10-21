import "reflect-metadata"
import AppRouter from "../../AppRouter"

// This decorator factory will associate the routehandler to the router as soon as the class is defined.
export function controller(pathPrefix: string){
    return function(target: Function) {
        const router = AppRouter.approuter
        // loop over the class prototypes  and find methods with  their metadata
        const methods = Object.getOwnPropertyNames(target.prototype)
        methods.forEach((methodName: string): void => {
            // route handler method inside the class
            const routehandler = target.prototype[methodName]
            // finding the metadata with a name of path
            const path = Reflect.getMetadata("path", target.prototype, methodName)
            // if the method is decorated with a path
            if(path){
                router.get(`${pathPrefix}${path}`, routehandler)
            }
        })
    }
}