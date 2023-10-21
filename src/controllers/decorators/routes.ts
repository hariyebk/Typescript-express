import "reflect-metadata"
import { Methods } from "../Methods"
// decorator factory
function routeMethods(httpmethod: string){
    return function(path: string){
        return function(target: any, key: string | symbol, des: TypedPropertyDescriptor<any>){
            // setting up the metadata for the decorated method
            Reflect.defineMetadata("path", path, target, key)
            Reflect.defineMetadata("method", httpmethod, target, key)
        }
    }
}

// decorator functions that define a metadata on their decorated methods , depending on that metadata the controller class decorator will mount the routehandlers to the router.
export const get = routeMethods(Methods.get)
export const put = routeMethods(Methods.put)
export const post = routeMethods(Methods.post)
export const patch = routeMethods(Methods.patch)
export const del = routeMethods(Methods.del)

