import React, { useEffect, useState } from 'react';

const Table = ({className, columns, rows, format, perPage=25}) => {
  const [page, setPage] = useState(1);

  const startingIndex = perPage * (page - 1);

  useEffect(() => {
    setPage(1);
  }, [rows]);

  const tableHeaderCells = columns.map(column => (
    <th key={column.name}>{column.name}</th>
  ));

  const previousPage = (event) => {
    event.preventDefault();
    setPage(page - 1);
  };

  const nextPage = (event) => {
    event.preventDefault();
    setPage(page + 1);
  };

  const tableBodyRows = rows
    .slice(startingIndex, startingIndex + perPage)
    .map(row => {
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

  const displayRange = (() => {
    const starting = rows.length === 0 ? 0 : startingIndex + 1;
    const ending = startingIndex + tableBodyRows.length
    return {starting, ending};
  })();

  return (
    <div>
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
      <div className="pagination">
        <p>
          Showing {displayRange.starting}-{displayRange.ending} of {rows.length} total routes.
        </p>
        <p>
          <button
            onClick={previousPage}
            disabled={page <= 1}
          >
            Previous Page
          </button>
          <button
            onClick={nextPage}
            disabled={page >= Math.ceil((rows.length) / perPage)}
          >
            Next Page
          </button>
        </p>
      </div>
    </div>
  );
};

export default Table