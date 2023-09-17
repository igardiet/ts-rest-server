import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/users'
import db from '../db/connection';

class Server
{
    private app: Application;
    private port: string;
    private paths =
        {
            users: '/api/users'
        }

    constructor()
    {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection ()
    {
        try
        {
            await db.authenticate();
            console.log( 'Database online' );
        } catch ( error: any )
        {
            throw new Error( error );
        }
    }

    middlewares ()
    {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static( 'public' ) );
    }

    routes ()
    {
        this.app.use( this.paths.users, userRoutes )
    }

    listen ()
    {
        this.app.listen( this.port, () =>
        {
            console.log( `Server running on port ${ this.port }` );
        } )
    }
}

export default Server;