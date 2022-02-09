angular.module('appModule').controller('homeController', homePageController);

function homePageController(Employees) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.currentPage = 0;
  homePageVm.totalPages = 0;
  homePageVm.loadMoreEmployees = loadMoreEmployees;
  homePageVm.isLoading = false;

  activate();

  function activate() {
    Employees.getEmployees().then(({ data }) => {
      updateData(data);
      console.log(homePageVm.currentPage, homePageVm.totalPages);
    });
  }

  function loadMoreEmployees() {
    if (homePageVm.currentPage < homePageVm.totalPages) {
      homePageVm.isLoading = true;
      homePageVm.currentPage += 1;
      Employees.loadMoreEmployees(homePageVm.currentPage).then(({ data }) => {
        updateData(data);
        homePageVm.isLoading = false;
      });
    }
  }

  function updateData(data) {
    homePageVm.employees = homePageVm.employees.concat(data.employees);
    homePageVm.currentPage = data.current_page;
    homePageVm.totalPages = data.pages;
  }
}
