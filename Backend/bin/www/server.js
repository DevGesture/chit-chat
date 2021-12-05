import express from 'express';
var bodyParser = require('body-parser');
let { json, urlencoded } = bodyParser;
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import DB from '../../config/db.setting'
import CONFIG from '../../config/app.setting';
import Api from '../../lib/api';
import ApiRouting from '../../config/api.routing';

class Server {

	constructor() {
		this.app = express();
		this.router = express.Router();
		this.configure();
	}

	configure() {
		this.configureMiddleware();
		this.configureRoutes();
		this.errorHandler();
	}

	configureMiddleware() {
		this.app.use(compression());
		this.app.use(urlencoded({ limit: '50mb', extended: true }));
		this.app.use(json({ limit: '50mb' }));
		this.app.use(express.static('public'));
		this.app.use(express.static('uploads'));
		this.enableHelmet();
		this.app.set('PORT', CONFIG.APP.PORT);
	}

	enableHelmet() {
		this.app.use(helmet());
		this.app.use(helmet.hidePoweredBy());
		this.app.use(helmet.hsts({ maxAge: 7776000000 }));
		this.app.use(helmet.frameguard('SAMEORIGIN'));
		this.app.use(helmet.xssFilter({ setOnOldIE: true }));
		this.app.use(helmet.noSniff());
	}

	configureRoutes() {
		this.app.use(cors());
		this.app.use(function (req, res, next) {
			for (let key in req.query) {
				if (key) {
					req.query[key.toLowerCase()] = req.query[key];
				}
			}
			next();
		});
		ApiRouting.ConfigureRouters(this.app);
	}

	errorHandler() {
		this.app.use(function (err, req, res, next) {
			if (err.name === 'UnauthorizedError') {
				Api.serverError(req, res, 'Credentials verification failed');
			} else
				Api.serverError(req, res, err);
		});

		this.app.use((req, res, next) => {
			Api.notFound(req, res, { code: '9004', message: 'Invalid resource path' });
		});
	}

	run() {
		let server = http.createServer(this.app);
		server.listen(CONFIG.APP.PORT, () => {
			console.log(`${CONFIG.APP.NAME} - is listening on ${CONFIG.APP.ADDRESS}`);
		});
	}
}
process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', err => {
		console.error(err, 'Uncaught Exception thrown');
	});
export default new Server();
