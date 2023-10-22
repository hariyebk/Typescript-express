import { RequestHandler } from "express";
import "reflect-metadata"
import { Metadata } from "../data/Enums";
// factory decorator
export function Use(middleware: RequestHandler){
    return function(target: any, key: string | symbol){
        // first the middlewares array is empty because we haven't defined the metadata yet
        const middlewares = Reflect.getMetadata(Metadata.middleware, target, key) || []
        Reflect.defineMetadata(Metadata.middleware, [...middlewares, middleware], target, key)
        // now the metadata value is [middleware1], then the second middleware passed to the use decorater will be added to the middleware array metadata, by the end the metadata will be an array of all the middlewares passed to the use decorator.
    }
}