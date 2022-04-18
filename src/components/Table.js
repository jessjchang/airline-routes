import React from 'react';

const Table = ({className, columns, rows, format}) => {
  const tableHeaderCells = columns.map(column => (
    <th key={column.name}>{column.name}</th>
  ));

  const tableBodyRows = rows.map(row => {
    const rowInfo = columns.map(column => {
      const rowInfoValue = row[column.property]
      return (
        <td key={column.property + rowInfoValue}>
          {format(column.property, rowInfoValue)}
        </td>
      );
    });

    return (
      <tr key={Object.values(row).join('-')}>
        {rowInfo}
      </tr>
    );
  });

  return (
    <table className={className}>
      <thead>
        <tr>
          {tableHeaderCells}
        </tr>
      </thead>
      <tbody>
        {tableBodyRows}
      </tbody>
    </table>
  );
};

export default Table