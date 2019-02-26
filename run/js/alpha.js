/*
  * SkiCycleRun  Alpha JS
  google maps: https://codepen.io/thomasclausen/pen/avagdy
  Medium starter: https://medium.com/@limichelle21/integrating-google-maps-api-for-multiple-locations-a4329517977a
  scroll--> https://www.npmjs.com/package/infinite-scroll
            https://infinite-scroll.com
*/
$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});

// Modal with transition
$('.grid-item').click(function(event) {
  // Check if not already open
  console.log('DEBUG: grid-item --> clicked')

  if (!$(this).hasClass('item-opened')) {
    console.log('DEBUG: !NOT has class --> item-opened')
    // Values
    var elWidth = $(this).outerWidth() / 2;
    var elPosition = this.getBoundingClientRect();

    // Store position
    $(this).attr('data-coord-left', $(this).css('left'));
    $(this).attr('data-coord-top', $(this).css('top'));

    // Transition effect
    $(this).css({
      top: elPosition.top,
      left: elPosition.left
    }).delay(400).css({
      top: '120px',
      left: '10%',
      zIndex: '99999',
      //background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),
      // marginLeft:	'-20%'
      // position: 'fixed'
    }).addClass('item-opened');
    $('.grid-alpha').fadeIn();

    $('.map-alpha').delay(600).css({
      top: '0px',
      left: '0%',
      height: '100vw',
      zIndex: '99998',
      // marginLeft:	'-20%'
      // position: 'fixed'
    }).addClass('item-opened');
    // move the map up against image
    // Store position
    $('#map').css({
      top: '100vw',
      height: '100%'
    });
    $('#map').fadeIn();

    $('.map-alpha').css({
      "background-image": "linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)"
    });
    $('.map-alpha').fadeIn();

    // Scroll to the top
    $('html, body').animate({
      scrollTop: $('.grid').offset().top
    }, 650);
    $('.grid').css('overflow', 'visible');

    selectMap($(this).css('background-image'));


  } else {

    console.log('DEBUG: YES has class --> item-opened')
    // single image clicked upon
    $('.grid').css('overflow', 'hidden');

    $('html, body').animate({
      scrollTop: $('#map').offset().top
    }, 1200);

  }

});

// Close item Modal
$(document).on('click', function(e) {

  if ($('.item-opened').length > 0) {

    if (!$(e.target).closest('.grid-item').length && !$(e.target).hasClass('item-opened')) {
      $('.grid-alpha').fadeOut(650);
      $('.map-alpha').fadeOut(650);
      $('.item-opened').css({
        top: $('.item-opened').data('coord-top'),
        left: $('.item-opened').data('coord-left'),
        marginLeft: ''
      });

      $('html, body').animate({
        scrollTop: ($('.grid').offset().top + parseFloat($('.item-opened').data('coord-top'))) - 30
      }, 650);

      setTimeout(function() {
        $('.grid-item').css('z-index', '').removeClass('item-opened');
      }, 350);
      $('.grid').css('overflow', 'hidden');

    }
  }

  var msnry = $('.grid').data('masonry')
  var elems = msnry.getItemElements()
  //console.log(elems.backgroud-image);
  //
  // for (let elem in elems) {
  //   console.log('element: ', elem.)
  // }

  msnry.reloadItems();

});

$(document).on('click', function(e) {

  console.log('EVENT: --> CLICK CLICK!');

  //getLocation();

  //
  //  change backgroud image? // Keep alpha to 300 rnd #
  // const rndNo = getRandomInt(10000, 10300);
  // const newURL = 'https://img.skicyclerun.com/pub/skiCycleRun/' + rndNo + '.jpg';
  // $(this).css('background-image', 'url("' + newURL + '")');
  // console.log('DEBUG: new Background --> ', newURL)

});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

async function selectMap(urlMap) {

  // TODO: wierd glitch for substring - always added extra )" on the end
  var image = urlMap.substring(urlMap.lastIndexOf('/') + 1, urlMap.length - 2);

  var newURL = urlMap.substr(0, urlMap.lastIndexOf('/'));
  var album = newURL.substring(newURL.lastIndexOf('/') + 1).trim();

  const pTagObj = await getPhotoTags(album, image);

  const gLat = parseFloat(pTagObj.GPSLatitude);
  const gLng = parseFloat(pTagObj.GPSLongitude);
  const newLatLng = {
    lat: gLat,
    lng: gLng
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: newLatLng,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  var marker = new google.maps.Marker({
    position: newLatLng,
    title: "SkiCycleRun"
  });
  marker.setMap(map);

}

async function getPhotoTags(alb, img) {

  try {

    let url = 'https://api.skicyclerun.com/deadpool/getPhotoTags/pub/' + alb + '/' + img;
    let response = await fetch(url, {
      cache: 'no-cache'
    })
    let data = await response.json();

    return data;

  } catch (e) {
    console.log('ERROR: ', e)
  }
}

function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  alert("Latitude : " + latitude + " Longitude: " + longitude);
}

function errorHandler(err) {
  if (err.code == 1) {
    alert("Error: Access is denied!");
  } else if (err.code == 2) {
    alert("Error: Position is unavailable!");
  }
}

function getLocation() {

  if (navigator.geolocation) {

    // timeout at 60000 milliseconds (60 seconds)
    var options = {
      timeout: 60000
    };
    navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
  } else {
    alert("Sorry, browser does not support geolocation!");
  }
}


//----------- Modernizr ------
addEventListener(document, "touchstart", function(e) {
  console.log('DEBUG: ', e.defaultPrevented); // will be false
  e.preventDefault(); // does nothing since the listener is passive
  console.log('DEBUG: ', e.defaultPrevented); // still false
}, Modernizr.passiveeventlisteners ? {
  passive: true
} : false);

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-flexbox-passiveeventlisteners-scriptasync-setclasses !*/
! function(e, n, t) {
  function r(e, n) {
    return typeof e === n
  }

  function s() {
    var e, n, t, s, o, i, a;
    for (var l in S)
      if (S.hasOwnProperty(l)) {
        if (e = [], n = S[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
          for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
        for (s = r(n.fn, "function") ? n.fn() : n.fn, o = 0; o < e.length; o++) i = e[o], a = i.split("."), 1 === a.length ? Modernizr[a[0]] = s : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = s), C.push((s ? "" : "no-") + a.join("-"))
      }
  }

  function o(e) {
    var n = x.className,
      t = Modernizr._config.classPrefix || "";
    if (_ && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      n = n.replace(r, "$1" + t + "js$2")
    }
    Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), _ ? x.className.baseVal = n : x.className = n)
  }

  function i() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : _ ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
  }

  function a(e, n) {
    return !!~("" + e).indexOf(n)
  }

  function l(e) {
    return e.replace(/([a-z])-([a-z])/g, function(e, n, t) {
      return n + t.toUpperCase()
    }).replace(/^-/, "")
  }

  function f(e, n) {
    return function() {
      return e.apply(n, arguments)
    }
  }

  function u(e, n, t) {
    var s;
    for (var o in e)
      if (e[o] in n) return t === !1 ? e[o] : (s = n[e[o]], r(s, "function") ? f(s, t || n) : s);
    return !1
  }

  function c(e) {
    return e.replace(/([A-Z])/g, function(e, n) {
      return "-" + n.toLowerCase()
    }).replace(/^ms-/, "-ms-")
  }

  function d(n, t, r) {
    var s;
    if ("getComputedStyle" in e) {
      s = getComputedStyle.call(e, n, t);
      var o = e.console;
      if (null !== s) r && (s = s.getPropertyValue(r));
      else if (o) {
        var i = o.error ? "error" : "log";
        o[i].call(o, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
      }
    } else s = !t && n.currentStyle && n.currentStyle[r];
    return s
  }

  function p() {
    var e = n.body;
    return e || (e = i(_ ? "svg" : "body"), e.fake = !0), e
  }

  function m(e, t, r, s) {
    var o, a, l, f, u = "modernizr",
      c = i("div"),
      d = p();
    if (parseInt(r, 10))
      for (; r--;) l = i("div"), l.id = s ? s[r] : u + (r + 1), c.appendChild(l);
    return o = i("style"), o.type = "text/css", o.id = "s" + u, (d.fake ? d : c).appendChild(o), d.appendChild(c), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(n.createTextNode(e)), c.id = u, d.fake && (d.style.background = "", d.style.overflow = "hidden", f = x.style.overflow, x.style.overflow = "hidden", x.appendChild(d)), a = t(c, e), d.fake ? (d.parentNode.removeChild(d), x.style.overflow = f, x.offsetHeight) : c.parentNode.removeChild(c), !!a
  }

  function v(n, r) {
    var s = n.length;
    if ("CSS" in e && "supports" in e.CSS) {
      for (; s--;)
        if (e.CSS.supports(c(n[s]), r)) return !0;
      return !1
    }
    if ("CSSSupportsRule" in e) {
      for (var o = []; s--;) o.push("(" + c(n[s]) + ":" + r + ")");
      return o = o.join(" or "), m("@supports (" + o + ") { #modernizr { position: absolute; } }", function(e) {
        return "absolute" == d(e, null, "position")
      })
    }
    return t
  }

  function y(e, n, s, o) {
    function f() {
      c && (delete T.style, delete T.modElem)
    }
    if (o = r(o, "undefined") ? !1 : o, !r(s, "undefined")) {
      var u = v(e, s);
      if (!r(u, "undefined")) return u
    }
    for (var c, d, p, m, y, g = ["modernizr", "tspan", "samp"]; !T.style && g.length;) c = !0, T.modElem = i(g.shift()), T.style = T.modElem.style;
    for (p = e.length, d = 0; p > d; d++)
      if (m = e[d], y = T.style[m], a(m, "-") && (m = l(m)), T.style[m] !== t) {
        if (o || r(s, "undefined")) return f(), "pfx" == n ? m : !0;
        try {
          T.style[m] = s
        } catch (h) {}
        if (T.style[m] != y) return f(), "pfx" == n ? m : !0
      } return f(), !1
  }

  function g(e, n, t, s, o) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
      a = (e + " " + P.join(i + " ") + i).split(" ");
    return r(n, "string") || r(n, "undefined") ? y(a, n, s, o) : (a = (e + " " + E.join(i + " ") + i).split(" "), u(a, n, t))
  }

  function h(e, n, r) {
    return g(e, t, t, n, r)
  }
  var C = [],
    S = [],
    w = {
      _version: "3.6.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [],
      on: function(e, n) {
        var t = this;
        setTimeout(function() {
          n(t[e])
        }, 0)
      },
      addTest: function(e, n, t) {
        S.push({
          name: e,
          fn: n,
          options: t
        })
      },
      addAsyncTest: function(e) {
        S.push({
          name: null,
          fn: e
        })
      }
    },
    Modernizr = function() {};
  Modernizr.prototype = w, Modernizr = new Modernizr, Modernizr.addTest("passiveeventlisteners", function() {
    var n = !1;
    try {
      var t = Object.defineProperty({}, "passive", {
        get: function() {
          n = !0
        }
      });
      e.addEventListener("test", null, t)
    } catch (r) {}
    return n
  });
  var x = n.documentElement,
    _ = "svg" === x.nodeName.toLowerCase();
  Modernizr.addTest("scriptasync", "async" in i("script"));
  var b = "Moz O ms Webkit",
    P = w._config.usePrefixes ? b.split(" ") : [];
  w._cssomPrefixes = P;
  var E = w._config.usePrefixes ? b.toLowerCase().split(" ") : [];
  w._domPrefixes = E;
  var z = {
    elem: i("modernizr")
  };
  Modernizr._q.push(function() {
    delete z.elem
  });
  var T = {
    style: z.elem.style
  };
  Modernizr._q.unshift(function() {
    delete T.style
  }), w.testAllProps = g, w.testAllProps = h, Modernizr.addTest("flexbox", h("flexBasis", "1px", !0)), s(), o(C), delete w.addTest, delete w.addAsyncTest;
  for (var N = 0; N < Modernizr._q.length; N++) Modernizr._q[N]();
  e.Modernizr = Modernizr
}(window, document);
