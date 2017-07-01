/*
	Custom Function for skicyclerun.com
*/

var scene = $( '.c-scene' );
var sceneHeight = $( window ).height();

$( window ).resize( function()
{
    sceneHeight = $( window ).height();
})

var scrollMagicController = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 0,
        duration: sceneHeight
    }
});


for( var i = 1; i <= 4; i++ )
{
    var tween = TweenMax.to( "#scene" + i + " > .c-scene__content", 1, {
        y: sceneHeight/2,
        ease:Linear.easeNone,
        autoAlpha: 0
    });

    new ScrollMagic.Scene({ triggerElement: "#scene" + i })
        .setTween( tween )
        .addIndicators()
        .addTo( scrollMagicController )
}
