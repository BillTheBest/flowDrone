// Namespace
basilicom.application = {};
var slider;
var oldpage;
/*
* The router. In here we will handle the page navigation
* */
basilicom.application.AppRouter = Backbone.Router.extend({

    routes: {
        "": "firstpage",
        "firstpage": "firstpage",
        "secondpage": "secondpage",
        "thirdpage": "thirdpage",
        "fourthpage": "fourthpage"
    },
    /**
     *  different pages called with using the same change page function
     *this way we don't need to tell every page how it should load.
     */

    firstpage: function () {
        var view = new basilicom.views.FirstPageView();
        view.render();
        slider.slidePage($(view.el));

    },

    secondpage: function () {
        var view = new basilicom.views.SecondPageView();
        view.render();
        //this is our new Change page. It supports transitions between pages
        slider.slidePage($(view.el));
    },

    thirdpage: function () {
    var view = new basilicom.views.ThirdPageView();
    view.render();
    //this is our new Change page. It supports transitions between pages
    slider.slidePage($(view.el));
},

    fourthpage: function () {
        var view = new basilicom.views.FourthPageView();
        view.render();
        //this is our new Change page. It supports transitions between pages
        slider.slidePage($(view.el));
    }
});
function preloader()
{
    // counter
    var i = 0;
    // create object
    imageObj = new Image();
    // set image list
    images = new Array();
    images[0]="asset/img/small/bmwi-gallery_1.jpg";
    images[1]="asset/img/small/bmwi-gallery_2.jpg";
    images[2]="asset/img/small/bmwi-gallery_3.jpg";
    images[3]="asset/img/small/bmwi-gallery_4.jpg";
    images[4]="asset/img/small/bmwi-gallery_5.jpg";
    images[5]="asset/img/small/bmwi-gallery_6.jpg";
    images[6]="asset/img/small/bmwi-gallery_7.jpg";
    images[7]="asset/img/small/bmwi-gallery_8.jpg";
    images[8]="asset/img/small/bmwi-gallery_9.jpg";
    images[9]="asset/img/small/bmwi-gallery_10.jpg";
    images[10]="asset/img/small/bmwi-gallery_11.jpg";
    images[11]="asset/img/small/bmwi-gallery_12.jpg";
    images[12]="asset/img/small/bmwi-gallery_13.jpg";
    images[13]="asset/img/small/bmwi-gallery_14.jpg";
    images[14]="asset/img/small/bmwi-gallery_15.jpg";
    images[15]="asset/img/small/bmwi-gallery_last.jpg";

    // start preloading
    for(i=0; i<=14; i++)
    {
        imageObj.src=images[i];
    }

    applicationRoute = new basilicom.application.AppRouter();
    Backbone.history.start();
}
    if (basilicom.config.browserInLocalMode) {
    $(document).ready(function () {
        console.log("Document Ready");
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
        slider = new PageSlider($("#container"));
        preloader();
        });


} else {
    document.addEventListener('deviceready', function () {
        console.log("Device Ready");
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
        slider = new PageSlider($("#container"));
        preloader();
    }, false);
}
