import "reflect-metadata"
// decorator factory
export function get(path: string){
    return function(target: any, key: string | symbol, des: TypedPropertyDescriptor<any>){
        // setting up the metadata for the decorated method
        Reflect.defineMetadata("path", path, target, key)
    }
}
