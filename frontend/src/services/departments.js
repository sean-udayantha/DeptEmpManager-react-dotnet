import axiosInstance from "./axiosInstance";

// Get all departments
export const getDepartments = async () => {
    try {
      const response = await axiosInstance.get('/departments');
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  };
  
  // Get department by ID
  export const getDepartmentById = async (id) => {
    try {
      const response = await axiosInstance.get(`/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching department by ID:', error);
      throw error;
    }
  };
  
  // Add a new department
  export const addDepartment = async (departmentData) => {
    try {
      const response = await axiosInstance.post('/departments', departmentData);
      return response.data;
    } catch (error) {
      console.error('Error adding department:', error);
      throw error;
    }
  };
  
  // Update a department
  export const updateDepartment = async (id, departmentData) => {
    try {
      const response = await axiosInstance.put(`/departments/${id}`, departmentData);
      return response.data;
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  };
  
  // Delete a department
  export const deleteDepartment = async (id) => {
    try {
      await axiosInstance.delete(`/departments/${id}`);
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  };
  
 