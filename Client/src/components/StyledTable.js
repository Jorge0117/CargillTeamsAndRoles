import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  CircularProgress,
} from "@mui/material";

const StyledTable = ({ columns, data, loading, onRowClick }) => {
  return (
    <TableContainer component={Paper} style={{minHeight: '216px', maxHeight: '322px'}}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell className="table-header-text" key={column.key}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow className="table-row" key={index} onClick={() => onRowClick(row)}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{column.accessor ? row[column.key]?.[column.accessor] : row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default StyledTable;
