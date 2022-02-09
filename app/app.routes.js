angular
  .module('appModule')
  .config(($locationProvider, $urlMatcherFactoryProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
    });
    $urlMatcherFactoryProvider.strictMode(false);
  })
  .config(($urlRouterProvider, $stateProvider) => {
    $stateProvider
      .state({
        name: 'app',
        url: '/',
        templateUrl: './pages/home-page/home-page.html',
        controller: 'homeController',
        controllerAs: 'homePageVm',
      })
      .state({
        name: 'team-performance',
        url: '/team-performance',
        template: '<v-performance-page></v-performance-page>',
      });
    // .state({
    //   name: 'not-found',
    //   url: '/not-found',
    //   template: '<v-not-found></v-not-found>',
    // });
    $urlRouterProvider.otherwise('/not-found');
  });
