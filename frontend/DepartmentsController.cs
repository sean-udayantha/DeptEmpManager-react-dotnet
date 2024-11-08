using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EmployeeDepartmentAPI.DataAccess;
using EmployeeDepartmentAPI.Models;

namespace EmployeeDepartmentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentsController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        // GET: api/departments
        [HttpGet]
        public ActionResult<ApiResponse<IEnumerable<Department>>> GetDepartments()
        {
            try
            {
                var departments = _departmentRepository.GetAllDepartments();
                return Ok(new ApiResponse<IEnumerable<Department>>(true, "Departments retrieved successfully.", departments));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }

        // POST: api/departments
        [HttpPost]
        public ActionResult<ApiResponse<Department>> CreateDepartment([FromBody] Department department)
        {
            if (department == null)
            {
                return BadRequest(new ApiResponse<string>(false, "Invalid department data.", null));
            }

            try
            {
                _departmentRepository.AddDepartment(department);
                return CreatedAtAction(nameof(GetDepartment), new { id = department.DepartmentId },
                    new ApiResponse<Department>(true, "Department created successfully.", department));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }

        // GET: api/departments/{id}
        [HttpGet("{id}")]
        public ActionResult<ApiResponse<Department>> GetDepartment(int id)
        {
            try
            {
                var department = _departmentRepository.GetDepartmentById(id);
                if (department == null)
                {
                    return NotFound(new ApiResponse<string>(false, "Department not found.", null));
                }
                return Ok(new ApiResponse<Department>(true, "Department retrieved successfully.", department));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }

        // PUT: api/departments/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(int id, [FromBody] Department department)
        {
            if (department == null || department.DepartmentId != id)
            {
                return BadRequest(new ApiResponse<string>(false, "Invalid department data or ID mismatch.", null));
            }

            try
            {
                var existingDepartment = _departmentRepository.GetDepartmentById(id);
                if (existingDepartment == null)
                {
                    return NotFound(new ApiResponse<string>(false, "Department not found.", null));
                }

                _departmentRepository.UpdateDepartment(department);
                return Ok(new ApiResponse<Department>(true, "Department updated successfully.", department));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }

        // DELETE: api/departments/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            try
            {
                var existingDepartment = _departmentRepository.GetDepartmentById(id);
                if (existingDepartment == null)
                {
                    return NotFound(new ApiResponse<string>(false, "Department not found.", null));
                }

                _departmentRepository.DeleteDepartment(id);
                return Ok(new ApiResponse<string>(true, "Department deleted successfully.", null));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"An error occurred: {ex.Message}", null));
            }
        }
    }
}