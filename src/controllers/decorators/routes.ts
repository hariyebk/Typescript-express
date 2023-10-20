import "reflect-metadata"
// decorator factory
export default function get(path: string){
    return function(target: any, key: string | symbol){
        // setting up the metadata for the decorated method
        Reflect.defineMetadata("path", path, target, key)
    }
}
