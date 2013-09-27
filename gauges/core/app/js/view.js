// Namespace
cannonerd.views = {};

/**
 *
 * @type Backbone View
 */

cannonerd.views.FirstPageView = Backbone.View.extend({
    localizations: cannonerd.language.firstpage,
    timeoutclearer: null,
    watchID: null,
    events: {
        "click .pageLink": "nextPage",
        "click .stop": "stop"
    },
    nextPage: function(event){
        event.preventDefault();
        var thisPage = $(event.currentTarget).attr("data-link");
        console.log(thisPage);
        applicationRoute.navigate("#" + thisPage, true);
    },
    stop: function(event){
        event.preventDefault();
        if(cannonerd.config.inLocalMode){
            window.clearInterval(this.timeoutclearer);
        }else{
            if (this.watchID) {
                navigator.compass.clearWatch(this.watchID);
                this.watchID = null;
            }
        }

    },
    initialize: function (options) {
        // Ensure our methods keep the `this`
        // reference to the view itself
        _.bindAll(this, 'render');

    },
    template: function (viewData) {
        var data = _.isObject(viewData) ? viewData : {};
        var tpl = Handlebars.compile($('#firstpage').html());
        return tpl(data);
    },

    render: function (eventName) {
        this.$el.append(this.template(this.localizations));
        //The global touchstart listener is to enable the usage of -webkit-tap-highlight-color: rgba(black, 0);
        //to get instant feedback on button pushes. For the user it FEELS faster
        document.addEventListener("touchstart", function(){}, true);
        var compassread = 0;
        if(cannonerd.config.inLocalMode){
            this.timeoutclearer= window.setInterval(function(){
                compassread = Math.random() * 360;
                console.log(compassread);
                $(".compassrotator", this.el).css({
                    "-webkit-transform": "rotate("+compassread+"deg)"
                });
            }, 1000);
        }else{

            // Update compass every 3 seconds
            var options = { frequency: 1000 };
            console.log(navigator.compass);
            this.watchID= navigator.compass.watchHeading(onSuccess, onError, options);
                console.log(this.watchID);
            // onSuccess: Get the current heading
            //
            function onSuccess(heading) {
                console.log('Heading: ' + heading.magneticHeading);
                $(".compassrotator", this.el).css({
                    "-webkit-transform": "rotate("+heading.magneticHeading+"deg)"
                });
            }

            // onError: Failed to get the heading
            //
            function onError(compassError) {
                console.log('Compass Error: ' + compassError.code);
            }

        }

        return this;
    }
});


