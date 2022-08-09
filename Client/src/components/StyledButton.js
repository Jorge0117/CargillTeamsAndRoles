import React from "react";
import { LoadingButton } from "@mui/lab"

const StyledButton = ({ onClick, label, loading }) => {
  return (
    <LoadingButton className="button" variant="contained" onClick={onClick} loading={loading} loadingIndicator={'Loading...'}>
      {label}
    </LoadingButton>
  );
};

export default StyledButton;
