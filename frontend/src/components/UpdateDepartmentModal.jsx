// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
const UpdateDepartmentModal = ({ open, handleClose, department, onSave, mode }) => {
  const [formData, setFormData] = useState({
    departmentCode: '',
    departmentName: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && department) {
      setFormData(department);
    } else if (mode === 'add') {
      // Clear the form when opening in "add" mode
      setFormData({ departmentCode: '', departmentName: '' });
    }
    setErrors({}); // Clear errors when modal is opened
  }, [mode, department]);

  // Update the form state when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateForm();
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.departmentCode.trim()) {
      newErrors.departmentCode = 'Department Code is required';
    }
    if (!formData.departmentName.trim()) {
      newErrors.departmentName = 'Department Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      handleClose(); // Close the modal after saving
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
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          {mode === 'edit' ? 'Update Department' : 'Add Department'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Department Code"
            name="departmentCode"
            value={formData.departmentCode}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.departmentCode}
            helperText={errors.departmentCode}
          />
          <TextField
            label="Department Name"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.departmentName}
            helperText={errors.departmentName}
          />
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

export default UpdateDepartmentModal;
