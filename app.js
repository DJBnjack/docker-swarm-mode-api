const Koa = require('koa');
const app = new Koa();
var router = require('koa-router')();
var boom = require('boom');
var Docker = require('dockerode');
var docker = new Docker({ socketPath: '/var/run/docker.sock' });

router.get('/', function (ctx, next) {
    //ctx.body = 'Hello World!';
    docker.listContainers({ all: true }, function (err, containers) {
        if (!err)
        {
            ctx.body = 'ALL: ' + containers.length;
        } else {
            ctx.body = err;
        }
    });
});

app.use(router.routes());
app.use(router.allowedMethods({
    throw: false,
    notImplemented: () => new boom.notImplemented(),
    methodNotAllowed: () => new boom.methodNotAllowed()
}));

app.listen(3000);