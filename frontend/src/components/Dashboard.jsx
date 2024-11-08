// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Container, Typography, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import EmployeesList from './EmployeesList'; // Adjust the import path as needed
import DepartmentsList from './DepartmentsList'; // Adjust the import path as needed

const Dashboard = () => {
  const [selectedTable, setSelectedTable] = useState('employees');

  const handleMenuClick = (table) => {
    setSelectedTable(table);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <ListItem button onClick={() => handleMenuClick('employees')}>
            <ListItemText primary="Employees" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('departments')}>
            <ListItemText primary="Departments" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {selectedTable === 'employees' ? 'Employees' : 'Departments'}
        </Typography>
        <Container maxWidth="lg">
          {selectedTable === 'employees' && <EmployeesList />}
          {selectedTable === 'departments' && <DepartmentsList />}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
