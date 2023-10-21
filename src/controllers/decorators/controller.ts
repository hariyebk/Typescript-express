import "reflect-metadata"
import AppRouter from "../../AppRouter"

// This decorator factory will associate the routehandler to the router as soon as the class is defined.
export function controller(pathPrefix: string){
    return function(target: Function) {
        const router = AppRouter.approuter
        console.log(target.prototype)
        // loop over the class prototypes  and find methods with  their metadata
        for(let key in target.prototype){
            // route handler method inside the class
            const routehandler = target.prototype[key]
            // finding the metadata with a name of path
            const path = Reflect.getMetadata("path", target.prototype, key)
            // if the method is decorated with a path
            if(path){
                console.log(`${pathPrefix}${path}`)
                router.get(`${pathPrefix}${path}`, routehandler)
            }
        }
        
    }
}