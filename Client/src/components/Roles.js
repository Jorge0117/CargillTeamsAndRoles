import React, { useState, useEffect } from "react";

import StyledTable from "./StyledTable";
import StyledButton from "./StyledButton";
import RoleForm from "./RoleForm";

const Roles = ({roles, fetchRoles, loading, fetchTeams, showAlert}) => {
  const [openForm, setOpenForm] = useState(false);
  const [initialRoleData, setInitialRoleData] = useState();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const onRoleClick = (role) => {
    setInitialRoleData(role);
    setOpenForm(true);
  };

  const onCloseModal = () => {
    fetchRoles();
    fetchTeams();
    setInitialRoleData(undefined);
    setOpenForm(false);
  };

  return (
    <div>
      <span className="table-title">Roles</span>
      <StyledButton
        onClick={() => setOpenForm(true)}
        label="Add Role"
        loading={false}
      />
      <StyledTable
        columns={[{ key: "name", label: "Name" }]}
        data={roles}
        loading={loading}
        onRowClick={onRoleClick}
      />

      <RoleForm
        open={openForm}
        onClose={onCloseModal}
        initialData={initialRoleData}
        showAlert={showAlert}
      />
    </div>
  );
};

export default Roles;
