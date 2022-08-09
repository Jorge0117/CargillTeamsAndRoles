import React, { useState, useEffect } from "react";
import {
  Modal,
  Paper,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import StyledButton from "./StyledButton";
import axios from "axios";
import ConfirmationMessage from "./ConfirmationMessage";

const TeamForm = ({ open, onClose, initialData, showAlert }) => {
  const [teamData, setTeamData] = useState({ name: "", role: null });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (open) {
      axios.get("http://localhost:5000/roles").then((response) => {
        setRoles(response.data);
      });
    }
  }, [open]);

  useEffect(() => {
    if (initialData) {
      setTeamData(initialData);
    }
  }, [initialData]);

  const submitData = () => {
    if (validate()) {
      setLoading(true);
      if (initialData?.id) {
        axios
          .patch(`http://localhost:5000/teams/${initialData.id}`, teamData)
          .then(() => {
            showAlert("success", "Team updated succesfully");
            onFormClose();
          })
          .catch(() => {
            showAlert("error", "Error updating team");
            setLoading(false);
          });
      } else {
        axios
          .post("http://localhost:5000/teams", teamData)
          .then(() => {
            showAlert("success", "Team created succesfully");
            onFormClose();
          })
          .catch(() => {
            showAlert("error", "Error creating team");
            setLoading(false);
          });
      }
    }
  };

  const validate = () => {
    if (!teamData.name) {
      setErrors((prev) => ({ ...prev, name: "This field is required" }));
      return false;
    }
    setErrors({});
    return true;
  };

  const deleteTeam = () => {
    axios
      .delete(`http://localhost:5000/teams/${initialData.id}`)
      .then(() => {
        showAlert("success", "Team deleted succesfully");
        onFormClose();
      })
      .catch(() => {
        showAlert("error", "Error deleting team");
      });
  };

  const onFormClose = (result, message) => {
    setLoading(false);
    setTeamData({ name: "", role: null });
    setErrors({})
    onClose();
  };

  return (
    <Modal open={open} onClose={() => onFormClose()}>
      <Paper className="modal-style">
        <span className="table-title">Add Team</span>
        <TextField
          required
          label="Name"
          value={teamData.name}
          fullWidth
          margin="normal"
          error={Boolean(errors.name)}
          helperText={errors.name || undefined}
          onChange={(e) =>
            setTeamData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <FormControl fullWidth>
          <InputLabel id="roleSelect">Role</InputLabel>
          <Select
            labelId="roleSelect"
            label="Role"
            value={teamData.role?.id || ""}
            onChange={(e) =>
              setTeamData((prev) => ({
                ...prev,
                role: { id: e.target.value, name: e.target.name },
              }))
            }
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container>
          <Grid item xs={6}>
            <StyledButton
              onClick={submitData}
              label={"Submit"}
              loading={loading}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            {initialData?.id ? (
              <StyledButton
                onClick={() => setOpenDeleteConfirmation(true)}
                label={"Delete"}
                loading={loading}
              />
            ) : null}
          </Grid>
        </Grid>

        <ConfirmationMessage
          open={openDeleteConfirmation}
          onOk={deleteTeam}
          onCancel={() => setOpenDeleteConfirmation(false)}
          text="Are you sure you want to delete this team?"
        />
      </Paper>
    </Modal>
  );
};

export default TeamForm;
