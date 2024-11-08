using EmployeeDepartmentAPI.Models;
using System.Collections.Generic;
using EmployeeDepartmentAPI.Models;

namespace EmployeeDepartmentAPI.DataAccess
{
    public interface IDepartmentRepository
    {
        IEnumerable<Department> GetAllDepartments();
        Department GetDepartmentById(int id);
        void AddDepartment(Department department);
        void UpdateDepartment(Department department);
        void DeleteDepartment(int id);
    }
}
