import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Box
        sx={{
          // backgroundColor: "#e7e7e7",
          padding:"5px"
        }}
      >
      <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </Router>
      </Box>
    </>
  );
}

export default App;
