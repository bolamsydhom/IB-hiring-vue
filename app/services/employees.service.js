angular.module('appModule').service('Employees', EmployeesService);

function EmployeesService($http) {
  const getEmployees = () => {
    const employeesUrl = 'https://fe-task.getsandbox.com/employees';

    return $http.get(employeesUrl);
  };

  const loadMoreEmployees = (currentPage) => {
    // [Load more empolyess logic goes here]
    const employeesUrl = 'https://fe-task.getsandbox.com/employees';
    const params = { page: currentPage };
    return $http.get(employeesUrl, { params });
  };

  return {
    getEmployees,
    loadMoreEmployees,
  };
}
