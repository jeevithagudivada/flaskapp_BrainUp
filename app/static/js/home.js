angular
  .module('app', [
  'ui.router',
  'ngAnimate',
])
  .config(function($urlRouterProvider, $animateProvider) {
    $urlRouterProvider.otherwise('/');
    $animateProvider.classNameFilter( /\banimated\b/ );
  })
  .config( function($stateProvider) {
    $stateProvider
      .state('home', {
      url: '/',
      views: {},
    });
  });

angular
  .module('app')
  .controller('appController', function($scope, $http) {
  $scope.submit = function() {
    $scope.pending = true;
    var pictimer = setTimeout(getPics, 4800)
  };
  
  function getPics() {
    $scope.pending = false;
    $scope.$digest();
  }
});






//nav
[].slice.call(document.querySelectorAll('.dropdown .nav-link')).forEach(function(el){
    el.addEventListener('click', onClick, false);
});

function onClick(e){
    e.preventDefault();
    var el = this.parentNode;
    el.classList.contains('show-submenu') ? hideSubMenu(el) : showSubMenu(el);
}

function showSubMenu(el){
    el.classList.add('show-submenu');
    document.addEventListener('click', function onDocClick(e){
        e.preventDefault();
        if(el.contains(e.target)){
            return;
        }
        document.removeEventListener('click', onDocClick);
        hideSubMenu(el);
    });
}

function hideSubMenu(el){
    el.classList.remove('show-submenu');
}