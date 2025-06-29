import { fetchMiddlewares, KoaTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HelloRoute } from './hello.route';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {};
const templateService = new KoaTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
export function RegisterRoutes(router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsHelloRoute_sayHello = {
        name: { "in": "path", "name": "name", "required": true, "dataType": "string" },
    };
    router.get('/hello/:name', ...(fetchMiddlewares(HelloRoute)), ...(fetchMiddlewares(HelloRoute.prototype.sayHello)), async function HelloRoute_sayHello(context, next) {
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsHelloRoute_sayHello, context, next });
        }
        catch (err) {
            const error = err;
            error.message ||= JSON.stringify({ fields: error.fields });
            context.status = error.status;
            context.throw(context.status, error.message, error);
        }
        const controller = new HelloRoute();
        return templateService.apiHandler({
            methodName: 'sayHello',
            controller,
            context,
            validatedArgs,
            successStatus: undefined,
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
