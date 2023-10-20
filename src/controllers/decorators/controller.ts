import "reflect-metadata"
import express from "express"

export const router = express.Router()

export default function controller(pathPrefix: string){
    return function(target: Function) {
        // loop over the class prototypes  and find methods with  their metadata
        for(let key in target.prototype){
            // route handler method inside the class
            const routehandler = target.prototype[key]
            // finding the metadata with a name of path
            const path = Reflect.getMetadata("path", target.prototype, key)
            // if the method is decorated with a path
            if(path){
                router.get(`${pathPrefix}/${path}`, routehandler)
            }
        }
        
    }
}