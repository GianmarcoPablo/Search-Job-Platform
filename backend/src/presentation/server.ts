import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

interface Properties {
    port: number;
    publicPath: string;
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(props: Properties) {
        const { port, publicPath, routes } = props;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    public async start() {

        // cors
        this.app.use(cors());
        // midlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // public path
        this.app.use(express.static(this.publicPath));

        //Routes
        this.app.use(this.routes);

        //SPA
        this.app.get('*', (req: Request, res: Response) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath)
        })

        // server running
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

}