using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EmployeeDepartmentAPI.DataAccess;
using EmployeeDepartmentAPI.Models;


namespace EmployeeDepartmentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeesController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        // GET: api/employees
        [HttpGet]
        public ActionResult<ApiResponse<IEnumerable<Employee>>> GetEmployees()
        {
            try
            {
                var employees = _employeeRepository.GetAllEmployees();
                return Ok(new ApiResponse<IEnumerable<Employee>>(true, "Employees retrieved successfully.", employees));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }

        // GET: api/employees/{id}
        [HttpGet("{id}")]
        public ActionResult<ApiResponse<Employee>> GetEmployee(int id)
        {
            try
            {
                var employee = _employeeRepository.GetEmployeeById(id);
                if (employee == null)
                {
                    return NotFound(new ApiResponse<string>(false, "Employee not found.", null));
                }
                return Ok(new ApiResponse<Employee>(true, "Employee retrieved successfully.", employee));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }

        // POST: api/employees
        [HttpPost]
        public IActionResult CreateEmployee([FromBody] Employee employee)
        {
            if (employee == null)
            {
                return BadRequest(new ApiResponse<string>(false, "Invalid employee data.", null));
            }

            try
            {
                _employeeRepository.AddEmployee(employee);
                return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeId },
                    new ApiResponse<Employee>(true, "Employee created successfully.", employee));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }

        // PUT: api/employees/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, [FromBody] Employee employee)
        {
            if (employee == null || employee.EmployeeId != id)
            {
                return BadRequest(new ApiResponse<string>(false, "Invalid employee data or ID mismatch.", null));
            }

            try
            {
                var existingEmployee = _employeeRepository.GetEmployeeById(id);
                if (existingEmployee == null)
                {
                    return NotFound(new ApiResponse<string>(false, "Employee not found.", null));
                }

                _employeeRepository.UpdateEmployee(employee);
                return Ok(new ApiResponse<Employee>(true, "Employee updated successfully.", employee));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }

        // DELETE: api/employees/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            try
            {
                var existingEmployee = _employeeRepository.GetEmployeeById(id);
                if (existingEmployee == null)
                {
                    return NotFound(new ApiResponse<string>(false, "Employee not found.", null));
                }

                _employeeRepository.DeleteEmployee(id);
                return Ok(new ApiResponse<string>(true, "Employee deleted successfully.", null));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }
    }
}
