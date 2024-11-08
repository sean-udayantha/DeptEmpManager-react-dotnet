import React, { useEffect, useState } from 'react';
import { getDepartments } from '../services/departments';
import { getEmployees, addEmployee, updateEmployee ,deleteEmployee } from '../services/employees'; // Ensure this path matches where you placed the CRUD functions
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import UpdateEmployeeModal from './UpdateEmployeeModal'; // Create this component similarly to UpdateDepartmentModal
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Reuse the delete modal

import { toast } from 'react-toastify';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [updateTable, setUpdateTable] = useState(); 

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to load employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (err) {
      setError('Failed to load departments');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [updateTable]);

  const handleAddClick = () => {
    setSelectedEmployee({
      firstName: '',
      lastName: '',
      emailAddress: '',
      dateOfBirth: '',
      salary: '',
      departmentId: '',
    }); // Reset form data for a new employee
    setModalMode('add');
    setOpenModal(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalMode('edit');
    setOpenModal(true);
  };

  const handleSave = async (employeeData) => {
    if (modalMode === 'add') {
      try {
        const newEmployee = await addEmployee(employeeData);
        if(newEmployee.success){   
            setUpdateTable(newEmployee);
            // setEmployees((prev) => [...prev, newEmployee.data]);
            toast.success('Employee added successfully!');
        } 
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    } else if (modalMode === 'edit') {
      try {
        const afterUpdateEmployee = await updateEmployee(employeeData.employeeId,employeeData);
        if(afterUpdateEmployee.success){
            toast.success('Employee updated successfully!');
            setEmployees((prev) =>
              prev.map((emp) =>
                emp.employeeId === employeeData.employeeId ? employeeData : emp
              )
            );
        }   
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    }
    setOpenModal(false);
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteModal(true);
  };

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees((prev) => prev.filter((emp) => emp.employeeId !== employeeId));
      toast.success('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
    setOpenDeleteModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to get department name by ID
  const getDepartmentName = (departmentId) => {
    const department = departments.find((dept) => dept.departmentId === departmentId);
    return department ? department.departmentName : 'Unknown Department';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginBottom: '16px' }}>
        Add Employee
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
        <Table  >
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.employeeId}>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.emailAddress}</TableCell>
                <TableCell>{formatDate(employee.dateOfBirth)}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{getDepartmentName(employee.departmentId)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(employee)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(employee)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateEmployeeModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        employee={selectedEmployee}
        onSave={handleSave}
        mode={modalMode}
        departments={departments}
      />

      <DeleteConfirmationModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        onDelete={handleDelete}
        department={selectedEmployee}
        openOne="employee"
      />
    </div>
  );
};

export default EmployeesList;
