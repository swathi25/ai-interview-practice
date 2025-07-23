import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

interface RoleSelectorProps {
  onSelect: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Mobile App Developer",
    "UI/UX Designer",
  ];

  return (
    <Box sx={{ my: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Select Role</InputLabel>
        <Select
          value={selectedRole}
          label="Select Role"
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => onSelect(selectedRole)}
        disabled={!selectedRole}
      >
        Generate Questions
      </Button>
    </Box>
  );
};

export default RoleSelector;
