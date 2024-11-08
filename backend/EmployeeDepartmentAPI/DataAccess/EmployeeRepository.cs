using System.Collections.Generic;
using EmployeeDepartmentAPI.DataAccess;
using EmployeeDepartmentAPI.Models;
using MySql.Data.MySqlClient;


namespace EmployeeDepartmentAPI.DataAccess
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DbHelper _dbHelper;

        public EmployeeRepository(DbHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        private int CalculateAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var age = today.Year - dateOfBirth.Year;
            if (dateOfBirth.Date > today.AddYears(-age)) age--;
            return age;
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            var employees = new List<Employee>();
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                var command = new MySqlCommand("SELECT * FROM Employees", connection);
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employees.Add(new Employee
                        {
                            EmployeeId = reader.GetInt32("EmployeeId"),
                            FirstName = reader.GetString("FirstName"),
                            LastName = reader.GetString("LastName"),
                            EmailAddress = reader.GetString("EmailAddress"),
                            DateOfBirth = reader.GetDateTime("DateOfBirth"),
                            Age = reader.GetInt32("Age"),
                            Salary = reader.GetDecimal("Salary"),
                            DepartmentId = reader.GetInt32("DepartmentId")
                        });
                    }
                }
            }
            return employees;
        }

        public Employee GetEmployeeById(int id)
        {
            Employee employee = null;
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                var command = new MySqlCommand("SELECT * FROM Employees WHERE EmployeeId = @id", connection);
                command.Parameters.AddWithValue("@id", id);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        employee = new Employee
                        {
                            EmployeeId = reader.GetInt32("EmployeeId"),
                            FirstName = reader.GetString("FirstName"),
                            LastName = reader.GetString("LastName"),
                            EmailAddress = reader.GetString("EmailAddress"),
                            DateOfBirth = reader.GetDateTime("DateOfBirth"),
                            Age = reader.GetInt32("Age"),
                            Salary = reader.GetDecimal("Salary"),
                            DepartmentId = reader.GetInt32("DepartmentId")
                        };
                    }
                }
            }
            return employee;
        }

        public void AddEmployee(Employee employee)
        {
            employee.Age = CalculateAge(employee.DateOfBirth); // Calculate age

            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                var command = new MySqlCommand("INSERT INTO Employees (FirstName, LastName, EmailAddress, DateOfBirth, Age, Salary, DepartmentId) VALUES (@firstName, @lastName, @email, @dob, @age, @salary, @departmentId)", connection);
                command.Parameters.AddWithValue("@firstName", employee.FirstName);
                command.Parameters.AddWithValue("@lastName", employee.LastName);
                command.Parameters.AddWithValue("@email", employee.EmailAddress);
                command.Parameters.AddWithValue("@dob", employee.DateOfBirth);
                command.Parameters.AddWithValue("@age", employee.Age);
                command.Parameters.AddWithValue("@salary", employee.Salary);
                command.Parameters.AddWithValue("@departmentId", employee.DepartmentId);
                command.ExecuteNonQuery();
            }
        }

        public void UpdateEmployee(Employee employee)
        {
            employee.Age = CalculateAge(employee.DateOfBirth); // Calculate age

            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                var command = new MySqlCommand("UPDATE Employees SET FirstName = @firstName, LastName = @lastName, EmailAddress = @email, DateOfBirth = @dob, Age = @age, Salary = @salary, DepartmentId = @departmentId WHERE EmployeeId = @id", connection);
                command.Parameters.AddWithValue("@firstName", employee.FirstName);
                command.Parameters.AddWithValue("@lastName", employee.LastName);
                command.Parameters.AddWithValue("@email", employee.EmailAddress);
                command.Parameters.AddWithValue("@dob", employee.DateOfBirth);
                command.Parameters.AddWithValue("@age", employee.Age);
                command.Parameters.AddWithValue("@salary", employee.Salary);
                command.Parameters.AddWithValue("@departmentId", employee.DepartmentId);
                command.Parameters.AddWithValue("@id", employee.EmployeeId);
                command.ExecuteNonQuery();
            }
        }

        public void DeleteEmployee(int id)
        {
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                var command = new MySqlCommand("DELETE FROM Employees WHERE EmployeeId = @id", connection);
                command.Parameters.AddWithValue("@id", id);
                command.ExecuteNonQuery();
            }
        }
    }
}
