import express from "express";

// A Singleton router
class AppRouter{
    private static Instance: express.Router
    // An accessor that creates a router if there is no router
    static get approuter(): express.Router{
        if(!this.Instance){
            this.Instance = express.Router()
        }
        return this.Instance
    }
}

export default AppRouter