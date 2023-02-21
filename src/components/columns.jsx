import { format } from '../utils/dateFormat';

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Image',
    accessor: 'image',
    Cell: (tableProps) => {
      return tableProps.row.original.image ? (
        <img src={tableProps.row.original.image} height='200' width='200' />
      ) : null;
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Causes',
    accessor: 'causes',
  },
  {
    Header: 'Symptoms',
    accessor: 'symptoms',
  },
  {
    Header: 'Severity',
    accessor: 'severity',
  },
  {
    Header: 'Preventions',
    accessor: 'preventions',
  },
  {
    Header: 'Treatments',
    accessor: 'treatments',
  },
  {
    Header: 'Created At',
    accessor: 'createdAt',
    Cell: ({ value }) => {
      return format(value);
    },
  },
];
