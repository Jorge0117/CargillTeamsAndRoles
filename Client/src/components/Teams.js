import React, { useState, useEffect } from "react";

import StyledTable from "./StyledTable";
import StyledButton from "./StyledButton";
import TeamForm from "./TeamForm";

const Teams = ({teams, fetchTeams, loading, showAlert}) => {
  const [openForm, setOpenForm] = useState(false);
  const [initialTeamData, setInitialTeamData] = useState();

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const onTeamClick = (team) => {
    setInitialTeamData(team);
    setOpenForm(true);
  };

  const onCloseModal = () => {
    fetchTeams();
    setInitialTeamData(undefined);
    setOpenForm(false);
  };

  return (
    <div style={{marginTop: '8px'}}>
      <span className="table-title">Teams</span>
      <StyledButton
        onClick={() => setOpenForm(true)}
        label="Add Team"
        loading={false}
      />
      <StyledTable
        columns={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role", accessor: 'name' },
        ]}
        data={teams}
        loading={loading}
        onRowClick={onTeamClick}
      />

      <TeamForm
        open={openForm}
        onClose={onCloseModal}
        initialData={initialTeamData}
        showAlert={showAlert}
      />
    </div>
  );
};

export default Teams;
