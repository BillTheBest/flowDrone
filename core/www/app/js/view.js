// Namespace
basilicom.views = {};

/**
 *
 * @type Backbone View
 */

basilicom.views.FirstPageView = Backbone.View.extend({
    localizations: basilicom.language.firstpage,
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
        return this;
    }
});

/**
 *
 * @type Backbone View
 */


basilicom.views.SecondPageView = Backbone.View.extend({
    localizations: basilicom.language.secondpage,
    events: {
        "click .pageLink": "nextPage"
    },
    nextPage: function(event){
        event.preventDefault();
        var thisPage = $(event.currentTarget).attr("data-link");
        console.log(thisPage);
        if(thisPage === "talk"){

            if($(event.currentTarget).hasClass("takingCommands")){
                $(event.currentTarget).removeClass("takingCommands").addClass("noCommands");
                console.log("We are not taking commands anymore, the copter should land automatically");
            }
            else{
                $(event.currentTarget).removeClass("noCommands").addClass("takingCommands");
                console.log("We are taking commands!");
                
                                
                try {
                    var recognition = new webkitSpeechRecognition();
                } catch(e) {
                  var recognition = Object;
                }
                recognition.continuous = true;
                recognition.interimResults = true;

                var interimResult = '';
                var textArea = $('.speechtext');
                var textAreaID = 'speechtext';

                var startRecognition = function() {
                    textArea.focus();
                    recognition.start();
               };


                startRecognition();
        

                recognition.onresult = function (event) {
                  console.log(event.result)
                };

                recognition.onend = function() {
                    $('.takingCommands').removeClass('takingCommands').addClass('noCommands');
                };
    
                
                }
        }else{
            applicationRoute.navigate("#" + thisPage, true);
        }

    },
    initialize: function (options) {
        // Ensure our methods keep the `this`
        // reference to the view itself
        _.bindAll(this, 'render');

    },
    template: function (viewData) {
        var data = _.isObject(viewData) ? viewData : {};
        var tpl = Handlebars.compile($('#secondpage').html());
        return tpl(data);
    },

    render: function (eventName) {
        $(this.el).append(this.template(this.localizations));
        //The global touchstart listener is to enable the usage of -webkit-tap-highlight-color: rgba(black, 0);
        //to get instant feedback on button pushes. For the user it FEELS faster
        document.addEventListener("touchstart", function(){}, true);
        return this;

    }
});

/*
*
* @type Backbone View
*/

basilicom.views.ThirdPageView = Backbone.View.extend({
    localizations: basilicom.language.thirdpage,
    events: {
        "click .pageLink": "nextPage"
    },
    nextPage: function(event){
        event.preventDefault();
        var thisPage = $(event.currentTarget).attr("data-link");
        applicationRoute.navigate("#" + thisPage, true);
    },
    initialize: function (options) {
        // Ensure our methods keep the `this`
        // reference to the view itself
        _.bindAll(this, 'render');

    },
    template: function (viewData) {
        var data = _.isObject(viewData) ? viewData : {};
        var tpl = Handlebars.compile($('#thirdpage').html());
        return tpl(data);
    },

    render: function (eventName) {
        $(this.el).append(this.template(this.localizations));
        //The global touchstart listener is to enable the usage of -webkit-tap-highlight-color: rgba(black, 0);
        //to get instant feedback on button pushes. For the user it FEELS faster
        document.addEventListener("touchstart", function(){}, true);
        return this;

    }
});
