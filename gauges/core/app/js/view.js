// Namespace
cannonerd.views = {};

/**
 *
 * @type Backbone View
 */

cannonerd.views.FirstPageView = Backbone.View.extend({
    localizations: cannonerd.language.firstpage,
    mockcompassclearer: null,
    mockspeedclearer: null,
    mockaltitudeclearer: null,
    mockvarioclearer: null,
    watchID: null,
    events: {
        "click .pageLink": "nextPage"
    },
    nextPage: function(event){
        event.preventDefault();
        var thisPage = $(event.currentTarget).attr("data-link");
        console.log(thisPage);
        applicationRoute.navigate("#" + thisPage, true);
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

        /*Compass functionalities testing for 5 seconds*/
        var mockcompass = 0;
        this.mockcompassclearer= window.setInterval(function(){
            mockcompass = Math.random() * 360;
            $(".compassrotator", this.el).css({
                "-webkit-transform": "rotate("+mockcompass+"deg)"
            });
        }, 1000);
        var self= this;
        var timeout= setTimeout(function(){
            window.clearInterval(self.mockcompassclearer);
        }, 5000);

        var mocckaltitudedata = 0;
        $(".altitudemoving", this.el).css({
            "left": mocckaltitudedata+"%",
            "top": mocckaltitudedata+"%"
        });

        var mockspeed= 87;
        this.mockspeedclearer= window.setInterval(function(){
            mockspeed = Math.random() * 360;
            $(".speedometerpointer", this.el).css({
                "-webkit-transform": "rotate("+mockspeed+"deg)"
            });
        }, 1000);
        var timeout2= setTimeout(function(){
            window.clearInterval(self.mockspeedclearer);
        }, 5000);


        var mockaltitudepointershort= 0;
        var mockaltitudepointerlong= 56;
        this.mockaltitudeclearer= window.setInterval(function(){
            mockaltitudepointershort = Math.random() * 360;
            $(".altitudepointershort", this.el).css({
                "-webkit-transform": "rotate("+mockaltitudepointershort+"deg)"
            });

            mockaltitudepointerlong = Math.random() * 360;
            $(".altitudepointerlong", this.el).css({
                "-webkit-transform": "rotate("+mockaltitudepointerlong+"deg)"
            });
        }, 1000);
        var timeout3= setTimeout(function(){
            window.clearInterval(self.mockaltitudeclearer);
        }, 5000);


        var mockvario= 37;
        this.mockvarioclearer= window.setInterval(function(){
            mockvario = Math.random() * 360;
            $(".variopointer", this.el).css({
                "-webkit-transform": "rotate("+mockvario+"deg)"
            });
        }, 1000);
        var timeout4= setTimeout(function(){
            window.clearInterval(self.mockvarioclearer);
        }, 5000);
        return this;
    }
});


