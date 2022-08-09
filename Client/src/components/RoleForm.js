import React, { useState, useEffect } from "react";
import { Modal, Paper, TextField, Grid } from "@mui/material";
import StyledButton from "./StyledButton";
import axios from "axios";
import ConfirmationMessage from "./ConfirmationMessage";

const RoleForm = ({ open, onClose, initialData, showAlert }) => {
  const [roleData, setRoleData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (initialData) {
      setRoleData(initialData);
    }
  }, [initialData]);

  const submitData = () => {
    if (validate()) {
      setLoading(true);
      if (initialData?.id) {
        axios
          .patch(`http://localhost:5000/roles/${initialData.id}`, roleData)
          .then(() => {
            showAlert("success", "Role updated succesfully");
            onFormClose();
          })
          .catch(() => {
            showAlert("error", "Error updating role");
            setLoading(false);
          });
      } else {
        axios
          .post("http://localhost:5000/roles", roleData)
          .then(() => {
            showAlert("success", "Role created succesfully");
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
    if (!roleData.name) {
      setErrors((prev) => ({ ...prev, name: "This field is required" }));
      return false;
    }
    setErrors({});
    return true;
  };

  const deleteRole = () => {
    axios
      .delete(`http://localhost:5000/roles/${initialData.id}`)
      .then(() => {
        showAlert("success", "Role deleted succesfully");
        onFormClose();
      })
      .catch(() => {
        showAlert("error", "Error deleting role");
        setLoading(false);
      });
  };

  const onFormClose = () => {
    setLoading(false);
    setRoleData({ name: "" });
    setErrors({})
    onClose();
  };

  return (
    <Modal open={open} onClose={() => onFormClose()}>
      <Paper className="modal-style">
        <span className="table-title">Add Role</span>
        <TextField
          required
          label="Name"
          value={roleData.name}
          fullWidth
          margin="normal"
          error={Boolean(errors.name)}
          helperText={errors.name || undefined}
          onChange={(e) =>
            setRoleData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
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
          onOk={deleteRole}
          onCancel={() => setOpenDeleteConfirmation(false)}
          text="Are you sure you want to delete this team?"
        />
      </Paper>
    </Modal>
  );
};

export default RoleForm;
