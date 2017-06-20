/*
	Custom Function for skicyclerun.com
*/

//ScrollMagic - create the controller
var controller = new ScrollMagic.Controller();

// Parallax background
new ScrollMagic.Scene({
        triggerElement: "#parallax",
        triggerHook: "onEnter",
    })
    .duration('200%')
    .setTween("#parallax", {
        backgroundPosition: "50% 100%",
        ease: Linear.easeNone
    })
    .addIndicators() // for debugging purposes
    .addTo(controller);
