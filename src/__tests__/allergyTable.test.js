import { cleanup, render, screen } from '@testing-library/react';
import { AllergyTable } from '../components/allergyTable';

describe('Allergy Table', () => {
  const COLUMNS = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Image',
      accessor: 'image',
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
    },
    {
      Header: 'Action',
      accessor: '',
    },
  ];
  const data = {
    id: 1,
    name: 'Allergy',
    causes: 'External medicine use',
    symptoms: 'Hallucination',
    severity: 'High',
    preventions: 'Medication',
    treatments: 'Medicine',
    createdAt: '2023-01-14',
  };
  beforeEach(() => {
    // render the table
    render(<AllergyTable allergies={[data]} columns={COLUMNS} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the allergy table successfully', async () => {
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  it('should have table elements when the table is loaded', async () => {
    const idHeaderElement = screen.getByRole('columnheader', { name: 'Id' });
    const nameHeaderElement = screen.getByRole('columnheader', {
      name: 'Name',
    });
    const causesHeaderElement = screen.getByRole('columnheader', {
      name: 'Causes',
    });
    expect(idHeaderElement).toBeInTheDocument();
    expect(nameHeaderElement).toBeInTheDocument();
    expect(causesHeaderElement).toBeInTheDocument();
  });

  it('should display the data when the table is rendered', async () => {
    const idRowElement = screen.getByRole('cell', { name: data.id });
    const nameRowElement = screen.getByRole('cell', { name: data.name });
    const causesRowElement = screen.getByRole('cell', { name: data.causes });
    const symptomsRowElement = screen.getByRole('cell', {
      name: data.symptoms,
    });
    const severityRowElement = screen.getByRole('cell', {
      name: data.severity,
    });
    const preventionRowElement = screen.getByRole('cell', {
      name: data.preventions,
    });
    const treatmentRowElement = screen.getByRole('cell', {
      name: data.treatments,
    });
    const emptyRowElements = screen.getAllByRole('cell', { name: '' });

    expect(idRowElement).toBeInTheDocument();
    expect(nameRowElement).toBeInTheDocument();
    expect(causesRowElement).toBeInTheDocument();
    expect(symptomsRowElement).toBeInTheDocument();
    expect(severityRowElement).toBeInTheDocument();
    expect(preventionRowElement).toBeInTheDocument();
    expect(treatmentRowElement).toBeInTheDocument();
    expect(emptyRowElements.length).toBe(2);
  });
});
