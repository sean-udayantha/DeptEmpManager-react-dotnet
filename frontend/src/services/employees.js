import axiosInstance from "./axiosInstance";

// Get all employees
export const getEmployees = async () => {
    try {
      const response = await axiosInstance.get('/employees');
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  };
  
  // Get employee by ID
  export const getEmployeeById = async (id) => {
    try {
      const response = await axiosInstance.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee by ID:', error);
      throw error;
    }
  };
  
  // Add a new employee
  export const addEmployee = async (employeeData) => {
    try {
      const response = await axiosInstance.post('/employees', employeeData);
      return response.data;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  };
  
  // Update an employee
  export const updateEmployee = async (id, employeeData) => {
    try {
      const response = await axiosInstance.put(`/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  };
  
  // Delete an employee
  export const deleteEmployee = async (id) => {
    try {
      await axiosInstance.delete(`/employees/${id}`);
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };
  