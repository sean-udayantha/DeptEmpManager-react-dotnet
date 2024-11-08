namespace EmployeeDepartmentAPI.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; } // Automatically calculated based on DOB
        public decimal Salary { get; set; }
        public int DepartmentId { get; set; }
    }
}
