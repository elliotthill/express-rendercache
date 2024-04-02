import { Request, Response, NextFunction } from "express";

/*
 *
 * RenderCache is the express middleware to serve up
 * cached pages from any store (redis, orm, db, memory)
 *
 */
class RenderCache {

    store: any;                 //ORM or mock object for testing
    findOneFunc: string;        //Should be an ORM function to return one row by PATH
                                //e.g. findByPk for sequelize, get for redis

    constructor() {
        this.findOneFunc = "findByPk"
    }

    set_store = (store:any, findOneFunc: string) => {
        this.store = store;
        this.findOneFunc = findOneFunc;
    }

    middleware = async (req: Request,res: Response, next: NextFunction) => {

        console.log(req.path);
        const cache = await this.store[this.findOneFunc](req.path);

        if (cache === null) {
            next();
            return;
        }

        res.send(cache.html);
        return;
    }

}

export default new RenderCache()
