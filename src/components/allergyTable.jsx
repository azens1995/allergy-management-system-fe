import React, { useMemo } from 'react';
import { usePagination, useTable } from 'react-table';
import './table.css';

export const AllergyTable = ({ allergies, columns }) => {
  const data = useMemo(() => allergies, []);

  const tableInstance = useTable({ columns, data }, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', padding: '8px' }}>
        <button
          style={{ margin: '8px' }}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className='btn button--primary'
        >
          Previous
        </button>
        <button
          style={{ margin: '8px' }}
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className='btn button--secondary'
        >
          Next
        </button>
      </div>
    </>
  );
};
