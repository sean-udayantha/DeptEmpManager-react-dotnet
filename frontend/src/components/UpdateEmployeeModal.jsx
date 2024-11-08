/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
// eslint-disable-next-line react/prop-types
const UpdateEmployeeModal = ({ open, handleClose, employee, onSave, mode, departments }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    dateOfBirth: '',
    salary: '',
    departmentId: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && employee) {
        setFormData({
            ...employee,
            // eslint-disable-next-line react/prop-types
            dateOfBirth: formatDate(employee.dateOfBirth), // Ensure the date is in the correct format
          });
    } else if (mode === 'add') {
      setFormData({ firstName: '', lastName: '', emailAddress: '', dateOfBirth: '', salary: '', departmentId: '' });
    }
    setErrors({});
  }, [mode, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.emailAddress.trim()) newErrors.emailAddress = 'Email is required';
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.salary) newErrors.salary = 'Salary is required';
    if (!formData.departmentId) newErrors.departmentId = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          {mode === 'edit' ? 'Update Employee' : 'Add Employee'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            fullWidth
            margin="normal"
            
            error={!!errors.emailAddress}
            helperText={errors.emailAddress}
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            fullWidth
            margin="normal" 
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.salary}
            helperText={errors.salary}
          />
          <FormControl fullWidth margin="normal"  error={!!errors.departmentId}>
            <InputLabel>Department</InputLabel>
            <Select
              label="Department"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
            >
              {departments.map((dept) => (
                <MenuItem key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </MenuItem>
              ))}
            </Select>
            {errors.departmentId && <Typography color="error">{errors.departmentId}</Typography>}
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleClose} fullWidth sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {mode === 'edit' ? 'Update' : 'Add'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateEmployeeModal;
