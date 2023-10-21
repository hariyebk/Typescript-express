import express from "express";

// A Singleton and centralized router implementation
class AppRouter{
    // The router
    private static Instance: express.Router
    // An accessor that creates a router if there is none , or returns it
    static get approuter(): express.Router{
        if(!this.Instance){
            this.Instance = express.Router()
        }
        return this.Instance
    }
}

export default AppRouter