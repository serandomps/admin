var dust = require('dust')();

var serand = require('serand');
var utils = require('utils');
var watcher = require('watcher');
var uready = require('uready');
var auth = require('auth');
var page = serand.page;
var redirect = serand.redirect;
var current = serand.current;

var app = serand.app({
    self: 'admin',
    from: 'serandomps'
});

var layout = serand.layout(app);

var loginUri = utils.resolve('admin:///auth');

var can = function (permission) {
    return function (ctx, next) {
        if (ctx.token) {
            return next();
        }
        watcher.emit('user', 'login', ctx.path);
    };
};

page('/signin', auth.signin({
    loginUri: loginUri
}));

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
        return watcher.emit('user', 'initialize', o);
    }
    watcher.emit('user', 'logged out');
});

page('/', function (ctx, next) {
    layout('two-column-right')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#right')
        .add('model-vehicles:recent')
        .area('#middle')
        .add('admin-client:home')
        .add('model-vehicles:featured')
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
            workflow: ctx.query.workflow,
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

page('/manage-realestates', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:realestates', {query: ctx.query})
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

page('/contacts/:id/edit', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        .area('#middle')
        .add('model-contacts:create', {
            id: ctx.params.id,
            location: '/manage-contacts'
        })
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

page('/locations/:id/edit', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        .area('#middle')
        .add('model-locations:create', {
            id: ctx.params.id,
            location: '/manage-locations'
        })
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
        .add('model-vehicles:findone', {
            id: ctx.params.id,
            privileged: true
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/realestates/:id', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('model-realestates:findone', {
            id: ctx.params.id,
            privileged: true
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

page('/vehicles/:id/review', function (ctx, next) {
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

page('/realestates/:id/review', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:realestates-review', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/vehicles/:id/edit', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('model-vehicles:create', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/realestates/:id/edit', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('model-realestates:create', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/contacts/:id/edit', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('model-contacts:create', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/vehicles/:id/delete', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('model-vehicles:remove', {
            id: ctx.params.id
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/realestates/:id/delete', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('model-realestates:remove', {
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
        .add('model-configs:create', {title: 'Create Configs', location: '/manage-configs'})
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
        .add('model-configs:findone', {
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
        .add('model-configs:create', {
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
        .add('model-configs:review', {
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
        .add('model-pages:create', {title: 'Create Pages', location: '/manage-pages'})
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

page('/manage-messages', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('admin-client:messages', {query: ctx.query})
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/messages/:id', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('admin-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('model-messages:findone', {
            id: ctx.params.id
        })
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
        .add('model-pages:findone', {
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
        .add('model-pages:create', {
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
        .add('model-pages:review', {
            id: ctx.params.id,
            location: '/manage-pages'
        })
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

//TODO: redirect user to login page when authentication is needed
//TODO: basically a front controller pattern
watcher.on('user', 'login', function (path) {
    if (!path) {
        path = serand.path();
    }
    serand.persist('state', {
        path: path
    });
    watcher.emit('user', 'authenticator', {
        type: 'serandives',
        location: loginUri
    }, function (err, uri) {
        redirect(uri);
    });
});

watcher.on('user', 'logged in', function (usr) {
    var state = serand.persist('state', null);
    redirect(state && state.path || '/');
});

watcher.on('user', 'logged out', function (usr) {
    var state = serand.persist('state', null);
    redirect(state && state.path || '/');
});

watcher.emit('serand', 'ready');
