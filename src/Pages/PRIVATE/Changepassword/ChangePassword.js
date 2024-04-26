import React, { useState, useEffect } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import resetpassword from "../../../assets/resetpassword.jpg";
import axios from 'axios';

function ChangePassword() {
 const [currentPassword, setCurrentPassword] = useState("");
 const [newPassword, setNewPassword] = useState("");
 const [confirmNewPassword, setConfirmNewPassword] = useState("");
 const [wantsToChangePassword, setWantsToChangePassword] = useState(false);

 useEffect(() => {
    document.title = "Change Password | USTP - ITSU";
 }, []);

 const handleChangePassword = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Authentication token not found');
      return;
    }

    axios.post('/change-password/', {
      old_password: currentPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword 
    }, {
      headers: {
        'Authorization': `Token ${token}` // Corrected template literal syntax
      }
    })
    .then(response => {
      console.log(response.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    })
    .catch(error => {
      console.error('Error changing password:', error);
    });
 };

 return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1 style={{ marginBottom: '20px', font: 'Arial'}}>Change Password</h1>
      <img className="resetpassword" src={resetpassword} style={{ width: '50%', maxWidth: '200px', marginBottom: '20px' }} />
      <div style={{ width: '450px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff' }}>
        <TextField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={wantsToChangePassword}
              onChange={(e) => setWantsToChangePassword(e.target.checked)}
              color="primary"
            />
          }
          label="Do you want to change your password?"
        />
        {wantsToChangePassword && (
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        )}
      </div>
    </div>
 );
}

export default ChangePassword;
