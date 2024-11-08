using System.Collections.Generic;
using EmployeeDepartmentAPI.DataAccess;
using EmployeeDepartmentAPI.Models;
using MySql.Data.MySqlClient;


namespace EmployeeDepartmentAPI.DataAccess
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly DbHelper _dbHelper;

        public DepartmentRepository(DbHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public IEnumerable<Department> GetAllDepartments()
        {
            var departments = new List<Department>();
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                var command = new MySqlCommand("SELECT * FROM Departments", connection);
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        departments.Add(new Department
                        {
                            DepartmentId = reader.GetInt32("DepartmentId"),
                            DepartmentCode = reader.GetString("DepartmentCode"),
                            DepartmentName = reader.GetString("DepartmentName")
                        });
                    }
                }
            }
            return departments;
        }

        public Department GetDepartmentById(int id)
        {
            Department department = null;
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                var command = new MySqlCommand("SELECT * FROM Departments WHERE DepartmentId = @id", connection);
                command.Parameters.AddWithValue("@id", id);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        department = new Department
                        {
                            DepartmentId = reader.GetInt32("DepartmentId"),
                            DepartmentCode = reader.GetString("DepartmentCode"),
                            DepartmentName = reader.GetString("DepartmentName")
                        };
                    }
                }
            }
            return department;
        }

        public void AddDepartment(Department department)
        {
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                var command = new MySqlCommand("INSERT INTO Departments (DepartmentCode, DepartmentName) VALUES (@code, @name)", connection);
                command.Parameters.AddWithValue("@code", department.DepartmentCode);
                command.Parameters.AddWithValue("@name", department.DepartmentName);
                command.ExecuteNonQuery();
            }
        }

        public void UpdateDepartment(Department department)
        {
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                var command = new MySqlCommand("UPDATE Departments SET DepartmentCode = @code, DepartmentName = @name WHERE DepartmentId = @id", connection);
                command.Parameters.AddWithValue("@code", department.DepartmentCode);
                command.Parameters.AddWithValue("@name", department.DepartmentName);
                command.Parameters.AddWithValue("@id", department.DepartmentId);
                command.ExecuteNonQuery();
            }
        }

        public void DeleteDepartment(int id)
        {
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();

                // Check if any employees are associated with this department
                var checkCommand = new MySqlCommand("SELECT COUNT(*) FROM Employees WHERE DepartmentId = @id", connection);
                checkCommand.Parameters.AddWithValue("@id", id);

                var employeeCount = Convert.ToInt32(checkCommand.ExecuteScalar());
                if (employeeCount > 0)
                {
                    throw new InvalidOperationException("The department cannot be deleted because there are employees registered in this department.");
                }

                // Proceed with deletion if no employees are associated
                var command = new MySqlCommand("DELETE FROM Departments WHERE DepartmentId = @id", connection);
                command.Parameters.AddWithValue("@id", id);
                command.ExecuteNonQuery();
            }
        }
    }
}
