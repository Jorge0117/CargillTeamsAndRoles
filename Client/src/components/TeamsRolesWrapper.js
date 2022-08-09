import React, { useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import Teams from "./Teams";
import Roles from "./Roles";

const TeamsRolesWrapper = () => {
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);

  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(false);

  const [alertData, setAlertData] = useState({ result: "", message: "" });

  const fetchRoles = useCallback(() => {
    setRolesLoading(true);
    axios
      .get("http://localhost:5000/roles")
      .then((response) => {
        setRoles(response.data);
        setRolesLoading(false);
      })
      .catch(() => {
        showAlert("error", "Error fetching roles");
      });
  }, []);

  const fetchTeams = useCallback(() => {
    setTeamsLoading(true);
    axios
      .get("http://localhost:5000/teams")
      .then((response) => {
        setTeams(response.data);
        setTeamsLoading(false);
      })
      .catch(() => {
        showAlert("error", "Error fetching teams");
      });
  }, []);

  const showAlert = (result, message) => {
    setAlertData({ result, message });
  };

  const onCloseAlert = () => {
    setAlertData({ result: "", message: "" });
  };

  return (
    <>
      <Roles
        roles={roles}
        fetchRoles={fetchRoles}
        loading={rolesLoading}
        fetchTeams={fetchTeams}
        showAlert={showAlert}
      />
      <Teams
        teams={teams}
        fetchTeams={fetchTeams}
        loading={teamsLoading}
        showAlert={showAlert}
      />

      <Snackbar
        open={Boolean(alertData.result)}
        autoHideDuration={5000}
        onClose={onCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {alertData.result ? (
          <Alert severity={alertData.result}>{alertData.message}</Alert>
        ) : null}
      </Snackbar>
    </>
  );
};

export default TeamsRolesWrapper;
