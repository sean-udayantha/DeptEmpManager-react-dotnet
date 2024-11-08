using EmployeeDepartmentAPI.Models;
using System.Collections.Generic;



namespace EmployeeDepartmentAPI.DataAccess
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAllEmployees();
        Employee GetEmployeeById(int id);
        void AddEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        void DeleteEmployee(int id);

    }
}
