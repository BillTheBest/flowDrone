// Namespace
cannonerd.application = {};
/*
* The router. In here we will handle the page navigation
* */
cannonerd.application.AppRouter = Backbone.Router.extend({

    routes: {
        "": "firstpage",
        "firstpage": "firstpage"
    },
    /**
     *  different pages called with using the same change page function
     *this way we don't need to tell every page how it should load.
     */

    firstpage: function () {
        var view = new cannonerd.views.FirstPageView();
        this.changePage(view);
    },
    changePage: function (page) {
        // Page load
        $(page.el).attr('data-role', 'page');
        page.render();
        $('#container').html(page.el);

    }

});
function preloader()
{
    applicationRoute = new cannonerd.application.AppRouter();
    Backbone.history.start();
}
    if (cannonerd.config.inLocalMode) {
    $(document).ready(function () {
        console.log("Document Ready");
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
        preloader();
        });


} else {
    document.addEventListener('deviceready', function () {
        console.log("Device Ready");
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
        preloader();
    }, false);
}
