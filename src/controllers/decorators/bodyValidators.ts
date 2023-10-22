import "reflect-metadata"
import { Metadata } from "../Enums"

export function requiredProps(props : string){
    const requiredProps = props.split(",").map((prop: string): string => prop.trimStart().trimEnd())
    return function(target: any, key: string | symbol, dec: TypedPropertyDescriptor<any>){
        // A decorator that defines a metadata for the requires properties passed to the factory functions.
        Reflect.defineMetadata(Metadata.validator, requiredProps, target, key)
    }
}