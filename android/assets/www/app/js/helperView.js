basilicom.helperviews = {};

/**
 * @type Backbone View
 *///TODO:Wrap up as a component!!


basilicom.helperviews.errorOverlay= Backbone.View.extend({
    attrs: {},
    events: {
        'click .feedbackbutton': 'clickAction'
    },
    initialize: function (options) {
        this.attrs.title = options.title;
        this.attrs.description = options.description;
        this.attrs.actions = options.actions;
    },
    clickAction: function (event) {
        var action = event.target.id;
        this.attrs.actions[action]();
    },
    render: function () {
        this.$el.html(_.template($('#errorOverlay').html(), this.attrs));
        $('body').fadeIn(250);

        return this;
    }
});


basilicom.helperviews.topNavigation= Backbone.View.extend({
    attrs: {},
    events: {
        'click .feedbackbuttonsmall': 'clickAction'
    },
    initialize: function (options) {
        this.attrs.navbartitle = options.navbartitle;
        this.attrs.actions = options.actions;
    },
    clickAction: function (event) {
        console.log("event");
        var action = event.target.id;
        this.attrs.actions[action]();
    },
    render: function () {
        console.log("NAVBAR");
        this.$el.html(_.template($('#navBarTop').html(), this.attrs));
        return this;
    }
});