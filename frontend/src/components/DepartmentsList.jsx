// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from '../services/departments'; // Ensure this path matches where you placed the CRUD functions
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import UpdateDepartmentModal from './UpdateDepartmentModal'; // Adjust path as necessary
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toast } from 'react-toastify';


const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [updateTable, setUpdateTable] = useState(); 
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response.data);
      } catch (err) {
        setError('Failed to load departments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [updateTable]);

  const handleAddClick = () => {
    setSelectedDepartment({
      departmentCode: '',
      departmentName: '',
    });
    setModalMode('add');
    setOpenModal(true);
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setModalMode('edit');
    setOpenModal(true);
  };

  const handleSave = async (departmentData) => {
    if (modalMode === 'add') {
      try {
        const newDepartment = await addDepartment(departmentData);
        if(newDepartment.success){
          setUpdateTable(newDepartment.data);
          toast.success('Department added successfully!');
        }
        // setDepartments((prev) => [...prev, newDepartment]);
      } catch (error) {
        console.error('Error adding department:', error);
      }
    } else if (modalMode === 'edit') {
      try {
        const afterUpdateDepartment = await updateDepartment(departmentData.departmentId, departmentData);
        if(afterUpdateDepartment.success){
          setUpdateTable(afterUpdateDepartment.data)
          toast.success('Department  updated successfully!');
        }
        // setDepartments((prev) =>
        //   prev.map((dept) =>
        //     dept.departmentId === departmentData.departmentId ? departmentData : dept
        //   )
        // );
      } catch (error) {
        console.error('Error updating department:', error);
      }
    }
  };

  const handleDeleteClick = (department) => {
    setSelectedDepartment(department);
    setOpenDeleteModal(true);
  };

  const handleDelete = async (departmentId) => {
    try {
      await deleteDepartment(departmentId);
      setDepartments((prev) => prev.filter((dept) => dept.departmentId !== departmentId));
      toast.success('Department deleted successfully!'); 
    } catch (error) {
      console.error('Error deleting department:', error);
      toast.error(error.errorMsg); 
    }
    setOpenDeleteModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginBottom: '16px' }}>
        Add Department
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Department ID</TableCell>
              <TableCell>Department Code</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.departmentId}>
                <TableCell>{department.departmentId}</TableCell>
                <TableCell>{department.departmentCode}</TableCell>
                <TableCell>{department.departmentName}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(department)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(department)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateDepartmentModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        department={selectedDepartment}
        onSave={handleSave}
        mode={modalMode}
      />
       <DeleteConfirmationModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        onDelete={handleDelete}
        department={selectedDepartment}
        openOne="department"
      />
    </div>
  );
};

export default DepartmentsList;
