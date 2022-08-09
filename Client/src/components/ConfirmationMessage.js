import React from "react";
import { Modal, Paper, Grid } from "@mui/material";
import StyledButton from "./StyledButton";

const ConfirmationMessage = ({ open, text, onOk, onCancel }) => {
  return (
    <Modal open={open}>
      <Paper className="modal-style" style={{ textAlign: "center" }}>
        <span>{text}</span>

        <Grid container>
          <Grid item xs={6}>
            <StyledButton
              onClick={onOk}
              label={"Ok"}
              loading={false}
            ></StyledButton>{" "}
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <StyledButton
              onClick={onCancel}
              label={"Cancel"}
              loading={false}
            ></StyledButton>{" "}
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ConfirmationMessage;
