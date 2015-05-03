(function(window, document, undefined) {
  "use strict";
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/contact.html", '<h1 class="cover-heading">Contact</h1><p class="lead">Cover is a one-page template for building simple and beautiful home pages.</p><p class="lead"><address><strong>Twitter, Inc.</strong><br>795 Folsom Ave, Suite 600<br>San Francisco, CA 94107<br><abbr title="Phone">P:</abbr> (123) 456-7890</address></p>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/features.html", '<h1 class="cover-heading">Features</h1><p class="lead">Cover is a one-page template for building simple and beautiful home pages.</p><hr><p class="lead"><div class="media"><a class="pull-left" href="#"><img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 64px; height: 64px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACsklEQVR4Xu2Y24upYRTGl0PI0JSimHDjMIVETVMzpvzrziLSTIkiLpTcjJLzcfaziuz2Njufsb8La93o+3jX+65nHX55NZ+fnzu6YdOIAFIB0gIyA254BpIMQaGAUEAoIBQQCtywAoJBwaBgUDAoGLxhCMifIcGgYFAwKBgUDAoGb1iBizHYbDap3+/Tbrcjp9NJwWCQNBrNQdJflKF6vU5ms5lisdhv353S/Ro+T+11kQCNRoN6vR7p9Xr2v16vyev1kt/v52eIkkql+L3BYKBEIkFarfbberuGz+82VCzAZrOhdDrNGX17e6PVakXdbpesVis9PDzwnq1Wi9/BTCYTvb6+0mQyoff3d9LpdBSPx2k8HhOCNhqNFIlEKJvNnu3zuOLO7WbFAiyXSz7sdrvloOfzObdAIBDgM8xmM8rlcuTxeGg0GtF0OmWhcNhKpULD4ZBsNhuvw3eoGqxX6vPcwPe/VywAertarbIftADKHIYgQqEQlctlzm4ymaRSqUSLxeIgwLF4WHN/f09PT090ic//LgAynM/nuXRfXl44i8VikXs9HA6zOHd3d+R2u6ndbnOl+Hw+foZ1Oh1+D3t+fuYqutSnEhEUVwAyjhmA3oYA+2cI8Pj4SLVa7Y/zYACiIjAcM5nMoWrsdjtFo9GDDyU+/zVcT4mjWAAEgQpA1lwuF3+irx0OB1cAyhyGg6EdIBAyjeA+Pj5oMBiQxWLhykF1YABirVKfSrKPNYoFwGIMsEKhQCACDO2AXkaQx4bWgACgAAYiBNnTA0KA+5gje5qc61MVChwHiGEHQ0Z/yq7h829nu6gCfipYNf2IAHIjJDdCciMkN0JqTmG19xYKCAWEAkIBoYDak1jN/YUCQgGhgFBAKKDmFFZ7b6GAUEAoIBQQCqg9idXcXyhw6xT4AgyAjZ+ww1kxAAAAAElFTkSuQmCC"></a><div class="media-body text-left"><h4 class="media-heading">Media heading</h4>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.</div></div><div class="media"><a class="pull-left" href="#"><img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 64px; height: 64px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACsklEQVR4Xu2Y24upYRTGl0PI0JSimHDjMIVETVMzpvzrziLSTIkiLpTcjJLzcfaziuz2Njufsb8La93o+3jX+65nHX55NZ+fnzu6YdOIAFIB0gIyA254BpIMQaGAUEAoIBQQCtywAoJBwaBgUDAoGLxhCMifIcGgYFAwKBgUDAoGb1iBizHYbDap3+/Tbrcjp9NJwWCQNBrNQdJflKF6vU5ms5lisdhv353S/Ro+T+11kQCNRoN6vR7p9Xr2v16vyev1kt/v52eIkkql+L3BYKBEIkFarfbberuGz+82VCzAZrOhdDrNGX17e6PVakXdbpesVis9PDzwnq1Wi9/BTCYTvb6+0mQyoff3d9LpdBSPx2k8HhOCNhqNFIlEKJvNnu3zuOLO7WbFAiyXSz7sdrvloOfzObdAIBDgM8xmM8rlcuTxeGg0GtF0OmWhcNhKpULD4ZBsNhuvw3eoGqxX6vPcwPe/VywAertarbIftADKHIYgQqEQlctlzm4ymaRSqUSLxeIgwLF4WHN/f09PT090ic//LgAynM/nuXRfXl44i8VikXs9HA6zOHd3d+R2u6ndbnOl+Hw+foZ1Oh1+D3t+fuYqutSnEhEUVwAyjhmA3oYA+2cI8Pj4SLVa7Y/zYACiIjAcM5nMoWrsdjtFo9GDDyU+/zVcT4mjWAAEgQpA1lwuF3+irx0OB1cAyhyGg6EdIBAyjeA+Pj5oMBiQxWLhykF1YABirVKfSrKPNYoFwGIMsEKhQCACDO2AXkaQx4bWgACgAAYiBNnTA0KA+5gje5qc61MVChwHiGEHQ0Z/yq7h829nu6gCfipYNf2IAHIjJDdCciMkN0JqTmG19xYKCAWEAkIBoYDak1jN/YUCQgGhgFBAKKDmFFZ7b6GAUEAoIBQQCqg9idXcXyhw6xT4AgyAjZ+ww1kxAAAAAElFTkSuQmCC"></a><div class="media-body text-left"><h4 class="media-heading">Media heading</h4>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.</div></div></p>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/game.html", '<div class="jumbotron text-center"><h1>Game Page</h1></div>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/home.html", '<h1 class="cover-heading">Cover your page.</h1><p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p><p class="lead"><a href="#" class="btn btn-lg btn-default">Learn more</a></p>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/roster.html", '<div class="jumbotron text-center"><h1>Roster Page</h1></div>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/settings.html", '<div class="jumbotron text-center"><h1>Settings Page</h1></div>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/team.html", '<div class="jumbotron text-center"><h1>Team Page</h1></div>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/examplesindex.html", '<!doctype html><html class="no-js" lang="en" ng-app="HockeyApp"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><title>HockeyApp - Yet another amazing AngularJS app!</title><meta name="description" content="Yet another amazing AngularJS app!"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content=""><meta property="og:title" content=""><meta property="og:description" content="Yet another amazing AngularJS app!"><meta property="og:image" content="https://github.global.ssl.fastly.net/images/modules/logos_page/Octocat.png"><link rel="icon" href="http://angularjs.org/favicon.ico" type="image/x-icon"><link rel="shortcut icon" href="http://angularjs.org/favicon.ico" type="image/x-icon"></head><body ontouchstart ng-controller="MainCtrl as main"><div ng-include="\'views/partials/navbar.html\'"></div><div class="container-fluid"><div class="row"><div class="col-sm-3 col-md-2" ng-include="\'views/partials/sidebar.html\'"></div><div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2" ng-view></div></div></div></body></html>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/partials\footer.html", '<p>Cover template for <a href="http://getbootstrap.com">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/partialsheader.html", '<h3 class="masthead-brand">Cover~{{ main.version }}{{ main.path() }}</h3><ul class="nav masthead-nav" bs-nav><li ng-class="{active: $path() == \'/\'}"><a href="#/">Home</a></li><li ng-class="{active: $path() == \'/features\'}"><a href="#/features">Features</a></li><li ng-class="{active: $path() == \'/contact\'}"><a href="#/contact">Contact</a></li></ul>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/partials\navbar.html", '<nav class="navbar navbar-default navbar-top"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Hockey App Nav Bar</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="/">Hockey App {{ main.version }}{{ main.path() }}</a></div><div class="navbar-collapse collapse"><ul class="nav navbar-nav navbar-right"><li ng-class="{active: $path() == \'/game\'}"><a href="/game">Game</a></li><li ng-class="{active: $path() == \'/roster\'}"><a href="/roster">Roster</a></li><li ng-class="{active: $path() == \'/team\'}"><a href="/team">Team</a></li><li ng-class="{active: $path() == \'/settings\'}"><a href="/settings">Settings</a></li><li class="active"><a href="#">{{ main.user }}</a></li></ul></div></div></nav>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/examplesiewsanalytics.html", '<div class="main"><h1 class="page-header">Analytics</h1><div class="row placeholders"><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBEOEZEQiIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojRkZGRkZGO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM5REJBQyIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojMUUyOTJDO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBEOEZEQiIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojRkZGRkZGO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM5REJBQyIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojMUUyOTJDO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div></div><h2 class="sub-header">Section title</h2><div class="table-responsive"><table class="table table-striped"><thead><tr><th>#</th><th>Header</th><th>Header</th><th>Header</th><th>Header</th></tr></thead><tbody><tr><td>1,001</td><td>Lorem</td><td>ipsum</td><td>dolor</td><td>sit</td></tr><tr><td>1,002</td><td>amet</td><td>consectetur</td><td>adipiscing</td><td>elit</td></tr><tr><td>1,003</td><td>Integer</td><td>nec</td><td>odio</td><td>Praesent</td></tr><tr><td>1,003</td><td>libero</td><td>Sed</td><td>cursus</td><td>ante</td></tr><tr><td>1,004</td><td>dapibus</td><td>diam</td><td>Sed</td><td>nisi</td></tr><tr><td>1,005</td><td>Nulla</td><td>quis</td><td>sem</td><td>at</td></tr><tr><td>1,006</td><td>nibh</td><td>elementum</td><td>imperdiet</td><td>Duis</td></tr><tr><td>1,007</td><td>sagittis</td><td>ipsum</td><td>Praesent</td><td>mauris</td></tr><tr><td>1,008</td><td>Fusce</td><td>nec</td><td>tellus</td><td>sed</td></tr><tr><td>1,009</td><td>augue</td><td>semper</td><td>porta</td><td>Mauris</td></tr><tr><td>1,010</td><td>massa</td><td>Vestibulum</td><td>lacinia</td><td>arcu</td></tr><tr><td>1,011</td><td>eget</td><td>nulla</td><td>Class</td><td>aptent</td></tr><tr><td>1,012</td><td>taciti</td><td>sociosqu</td><td>ad</td><td>litora</td></tr><tr><td>1,013</td><td>torquent</td><td>per</td><td>conubia</td><td>nostra</td></tr><tr><td>1,014</td><td>per</td><td>inceptos</td><td>himenaeos</td><td>Curabitur</td></tr><tr><td>1,015</td><td>sodales</td><td>ligula</td><td>in</td><td>libero</td></tr></tbody></table></div></div>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/examplesiewsoverview.html", '<div class="main"><h1 class="page-header">Dashboard</h1><div class="row placeholders"><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBEOEZEQiIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojRkZGRkZGO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM5REJBQyIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojMUUyOTJDO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBEOEZEQiIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojRkZGRkZGO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM5REJBQyIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojMUUyOTJDO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div></div><h2 class="sub-header">Section title</h2><div class="table-responsive"><table class="table table-striped"><thead><tr><th>#</th><th>Header</th><th>Header</th><th>Header</th><th>Header</th></tr></thead><tbody><tr><td>1,001</td><td>Lorem</td><td>ipsum</td><td>dolor</td><td>sit</td></tr><tr><td>1,002</td><td>amet</td><td>consectetur</td><td>adipiscing</td><td>elit</td></tr><tr><td>1,003</td><td>Integer</td><td>nec</td><td>odio</td><td>Praesent</td></tr><tr><td>1,003</td><td>libero</td><td>Sed</td><td>cursus</td><td>ante</td></tr><tr><td>1,004</td><td>dapibus</td><td>diam</td><td>Sed</td><td>nisi</td></tr><tr><td>1,005</td><td>Nulla</td><td>quis</td><td>sem</td><td>at</td></tr><tr><td>1,006</td><td>nibh</td><td>elementum</td><td>imperdiet</td><td>Duis</td></tr><tr><td>1,007</td><td>sagittis</td><td>ipsum</td><td>Praesent</td><td>mauris</td></tr><tr><td>1,008</td><td>Fusce</td><td>nec</td><td>tellus</td><td>sed</td></tr><tr><td>1,009</td><td>augue</td><td>semper</td><td>porta</td><td>Mauris</td></tr><tr><td>1,010</td><td>massa</td><td>Vestibulum</td><td>lacinia</td><td>arcu</td></tr><tr><td>1,011</td><td>eget</td><td>nulla</td><td>Class</td><td>aptent</td></tr><tr><td>1,012</td><td>taciti</td><td>sociosqu</td><td>ad</td><td>litora</td></tr><tr><td>1,013</td><td>torquent</td><td>per</td><td>conubia</td><td>nostra</td></tr><tr><td>1,014</td><td>per</td><td>inceptos</td><td>himenaeos</td><td>Curabitur</td></tr><tr><td>1,015</td><td>sodales</td><td>ligula</td><td>in</td><td>libero</td></tr></tbody></table></div></div>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/examplesiews\reports.html", '<div class="main"><h1 class="page-header">Reports</h1><div class="row placeholders"><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBEOEZEQiIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojRkZGRkZGO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM5REJBQyIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojMUUyOTJDO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBEOEZEQiIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojRkZGRkZGO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div><div class="col-xs-6 col-sm-3 placeholder"><img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM5REJBQyIvPjxnPjx0ZXh0IHg9Ijc0LjA0Njg3NSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojMUUyOTJDO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjAweDIwMDwvdGV4dD48L2c+PC9zdmc+" data-holder-rendered="true"><h4>Label</h4><span class="text-muted">Something else</span></div></div><h2 class="sub-header">Section title</h2><div class="table-responsive"><table class="table table-striped"><thead><tr><th>#</th><th>Header</th><th>Header</th><th>Header</th><th>Header</th></tr></thead><tbody><tr><td>1,001</td><td>Lorem</td><td>ipsum</td><td>dolor</td><td>sit</td></tr><tr><td>1,002</td><td>amet</td><td>consectetur</td><td>adipiscing</td><td>elit</td></tr><tr><td>1,003</td><td>Integer</td><td>nec</td><td>odio</td><td>Praesent</td></tr><tr><td>1,003</td><td>libero</td><td>Sed</td><td>cursus</td><td>ante</td></tr><tr><td>1,004</td><td>dapibus</td><td>diam</td><td>Sed</td><td>nisi</td></tr><tr><td>1,005</td><td>Nulla</td><td>quis</td><td>sem</td><td>at</td></tr><tr><td>1,006</td><td>nibh</td><td>elementum</td><td>imperdiet</td><td>Duis</td></tr><tr><td>1,007</td><td>sagittis</td><td>ipsum</td><td>Praesent</td><td>mauris</td></tr><tr><td>1,008</td><td>Fusce</td><td>nec</td><td>tellus</td><td>sed</td></tr><tr><td>1,009</td><td>augue</td><td>semper</td><td>porta</td><td>Mauris</td></tr><tr><td>1,010</td><td>massa</td><td>Vestibulum</td><td>lacinia</td><td>arcu</td></tr><tr><td>1,011</td><td>eget</td><td>nulla</td><td>Class</td><td>aptent</td></tr><tr><td>1,012</td><td>taciti</td><td>sociosqu</td><td>ad</td><td>litora</td></tr><tr><td>1,013</td><td>torquent</td><td>per</td><td>conubia</td><td>nostra</td></tr><tr><td>1,014</td><td>per</td><td>inceptos</td><td>himenaeos</td><td>Curabitur</td></tr><tr><td>1,015</td><td>sodales</td><td>ligula</td><td>in</td><td>libero</td></tr></tbody></table></div></div>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/examplesiewspartials\navbar.html", '<nav class="navbar navbar-inverse navbar-fixed-top"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#">Dashboard~{{ main.version }}{{ main.path() }}</a></div><div id="navbar" class="navbar-collapse collapse"><ul class="nav navbar-nav navbar-right"><li><a href="#">Dashboard</a></li><li><a href="#">Settings</a></li><li><a href="#">Profile</a></li><li><a href="#">Help</a></li></ul><form class="navbar-form navbar-right"><input type="text" class="form-control" placeholder="Search..."></form></div></div></nav>');
  } ]);
  angular.module("HockeyApp").run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/examplesiewspartialssidebar.html", '<div class="sidebar"><ul class="nav nav-sidebar"><li ng-class="{active: $path() == \'/\'}"><a href="#/">Overview <span class="sr-only">(current)</span></a></li><li ng-class="{active: $path() == \'/reports\'}"><a href="#/reports">Reports</a></li><li ng-class="{active: $path() == \'/analytics\'}"><a href="#/analytics">Analytics</a></li><li ng-class="{active: $path() == \'/export\'}"><a href="#/export">Export</a></li></ul><ul class="nav nav-sidebar"><li><a href="">Nav item</a></li><li><a href="">Nav item again</a></li><li><a href="">One more nav</a></li><li><a href="">Another nav item</a></li><li><a href="">More navigation</a></li></ul><ul class="nav nav-sidebar"><li><a href="">Nav item again</a></li><li><a href="">One more nav</a></li><li><a href="">Another nav item</a></li></ul></div>');
  } ]);
})(window, document);