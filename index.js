var dust = require('dust')();

var serand = require('serand');
var utils = require('utils');
var uready = require('uready');
var page = serand.page;
var redirect = serand.redirect;
var current = serand.current;

var app = serand.app({
    self: 'admin',
    from: 'serandomps'
});

var layout = serand.layout(app);

var loginUri = utils.resolve('admin:///auth');

var auth = require('./controllers/auth');

var can = function (permission) {
    return function (ctx, next) {
        if (ctx.token) {
            return next();
        }
        utils.emit('user', 'login', ctx.path);
    };
};

page(function (ctx, next) {
    utils.loading();
    next();
});

page('/signin', auth.signin);

page('/signup', function (ctx, next) {
    var query = ctx.query | {};
    utils.emit('user', 'login', query.dest || '/');
});

page('/auth', function (ctx, next) {
    var el = $('#content');
    var o = {
        tid: sera.tid,
        username: sera.username,
        access: sera.access,
        expires: sera.expires,
        refresh: sera.refresh
    };
    if (o.username) {
        return utils.emit('user', 'initialize', o);
    }
    utils.emit('user', 'logged out');
});

page('/', function (ctx, next) {
    layout('two-column-right')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#right')
        .add('vehicles:recent')
        .area('#middle')
        .add('admin-client:home')
        .add('vehicles:featured')
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/transits/:id', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:transits', {
            id: ctx.params.id,
            domain: ctx.query.domain,
            model: ctx.query.model,
            status: ctx.query.status,
            location: ctx.query.location
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/manage-vehicles', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:vehicles', {query: ctx.query})
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/manage-contacts', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:contacts', {query: ctx.query})
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/manage-locations', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:locations', {query: ctx.query})
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/vehicles/:id', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('vehicles:findone', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/contacts/:id/review', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:contacts-review', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/locations/:id/review', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:locations-review', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/vehicles/:id/review', can('vehicle:update'), function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:vehicles-review', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/vehicles/:id/edit', can('vehicle:update'), function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('vehicles:create', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/contacts/:id/edit', can('vehicle:update'), function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('contacts:create', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/vehicles/:id/delete', can('vehicle:update'), function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('vehicles:remove', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/create-configs', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        .area('#middle')
        .add('configs:create', {title: 'Create Configs', location: '/manage-configs'})
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/manage-configs', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:configs', {query: ctx.query})
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/configs/:id', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('configs:findone', {
            id: ctx.params.id,
            location: '/manage-configs'
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/configs/:id/edit', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('configs:create', {
            id: ctx.params.id,
            location: '/manage-configs'
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/configs/:id/review', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('configs:review', {
            id: ctx.params.id,
            location: '/manage-configs'
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/create-pages', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        .area('#middle')
        .add('pages:create', {title: 'Create Pages', location: '/manage-pages'})
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/manage-pages', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:pages', {query: ctx.query})
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/pages/:id', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('pages:findone', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/pages/:id/edit', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('pages:create', {
            id: ctx.params.id,
            location: '/manage-pages'
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/pages/:id/review', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('pages:review', {
            id: ctx.params.id,
            location: '/manage-pages'
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/mine', can('user'), function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        .area('#middle')
        .add('vehicles:mine')
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

//TODO: redirect user to login page when authentication is needed
//TODO: basically a front controller pattern
utils.on('user', 'login', function (path) {
    var ctx;
    if (!path) {
        ctx = serand.current();
        path = ctx.path;
    }
    serand.store('state', {
        path: path
    });
    utils.emit('user', 'authenticator', {
        type: 'serandives',
        location: loginUri
    }, function (err, uri) {
        redirect(uri);
    });
});

utils.on('user', 'logged in', function (usr) {
    var state = serand.store('state', null);
    redirect(state && state.path || '/');
});

utils.on('user', 'logged out', function (usr) {
    var state = serand.store('state', null);
    redirect(state && state.path || '/');
});

utils.emit('serand', 'ready');
