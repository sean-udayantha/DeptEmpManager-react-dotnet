/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

 
const DeleteConfirmationModal = ({ open, handleClose, onDelete, department, openOne }) => {
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
          Confirm Delete
        </Typography>
        {openOne=="department" ?
        <Typography variant="body1" mb={3}>
          Are you sure you want to delete the department &quot;{department?.departmentName}&quot;?
        </Typography>
        :
         <Typography variant="body1" mb={3}>
         Are you sure you want to delete the Employee {department?.firstName} {department?.lastName}?
         </Typography>
        }
        <Button
          variant="contained"
          color="secondary" 
          onClick={openOne=="department" ? () => onDelete(department.departmentId):() => onDelete(department.employeeId)}
          style={{ marginRight: '8px' }}
        >
          Delete
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
