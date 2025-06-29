import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import { RegisterRoutes } from './routes/routes';
import { koaSwagger } from 'koa2-swagger-ui';
import * as swagger from './swagger/swagger.json';
const app = new Koa();
const router = new Router();
app.use(bodyParser());
// Register tsoa-generated routes
RegisterRoutes(router);
app.use(router.routes()).use(router.allowedMethods());
// Swagger docs
app.use(koaSwagger({
    routePrefix: '/docs',
    specPrefix: '/docs/spec',
    exposeSpec: true,
    swaggerOptions: { spec: swagger }
}));
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
    console.log('Swagger docs at http://localhost:3000/docs');
});
