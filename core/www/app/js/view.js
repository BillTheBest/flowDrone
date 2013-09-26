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
    recognition: null,
    events: {
        "click .pageLink": "nextPage"
    },
    nextPage: function(event){
        event.preventDefault();
        var thisPage = $(event.currentTarget).attr("data-link");
        if(thisPage === "talk"){
            if ($(event.currentTarget).hasClass("takingCommands")){
                $(event.currentTarget).removeClass("takingCommands").addClass("noCommands");
                if (this.recognition) {
                    this.recognition.stop();
                }
                console.log("We are not taking commands anymore, the copter should land automatically");
            } else {
                try {
                    this.recognition = new webkitSpeechRecognition();
                } catch(e) {
                    console.log('No speech recognition available');
                    return;
                }
                $(event.currentTarget).removeClass("noCommands").addClass("takingCommands");
                console.log("We are taking commands!");
                this.recognition.continuous = true;

                var interimResult = '';
                var list = $('.speechtext');

                this.recognition.start();

                this.recognition.onspeechstart = function (event) {
                  console.log('Look who is talking!');
                }

                var handled = [];
                this.recognition.onresult = function (event) {
                  _.each(event.results, function (result, idx) {
                    if (!result.isFinal) {
                      return;
                    }
                    if (handled.indexOf(idx) !== -1) {
                      return;
                    }
                    list.append($('<li>' + result[0].transcript + '</li>'));
                    handled.push(idx);
                  });
                }.bind(this);

                this.recognition.onend = function() {
                    $('.takingCommands').removeClass('takingCommands').addClass('noCommands');
                    this.recognition = null;
                }.bind(this);
            }
        } else {
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
