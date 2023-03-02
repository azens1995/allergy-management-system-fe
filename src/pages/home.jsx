import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllergyTable } from '../components/allergyTable';
import { LOGIN, STATUS } from '../constants/api';
import { getAllergy, deleteAllergy } from '../services/allergy.service';
import { removeToken } from '../services/storage.service';

import { format } from '../utils/dateFormat';

export const Home = () => {
  const [diseases, setDiseases] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await getAllergy();
    if (res.status === STATUS.SUCCESS) {
      const { rows } = res.data.data;
      setLoading(false);
      setDiseases(rows);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const openAddAllergy = () => {
    navigate('/allergy/add');
  };

  const logout = () => {
    removeToken();
    navigate(LOGIN);
  };

  const navigateDetail = (allergyDetail) => {
    navigate(`/allergy/update/${allergyDetail.id}`, { state: allergyDetail });
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteAllergy(id);
      alert(data.message);
    } catch (err) {
      alert(err.response.message);
    }
  };

  const CustomActionCell = (props) => {
    return (
      <div className='action-button-wrapper action-button-wrapper--table'>
        <button
          className='btn button--secondary'
          onClick={() => navigateDetail(props.row.original)}
        >
          Edit
        </button>
        <button
          className='btn button--danger'
          onClick={() => handleDelete(props.row.original.id)}
        >
          {' '}
          Delete{' '}
        </button>
      </div>
    );
  };

  const COLUMNS = [
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
    {
      Header: 'Action',
      accessor: '',
      Cell: CustomActionCell,
    },
  ];

  return (
    <div>
      <div className='action-button-wrapper'>
        <button className='button--primary' onClick={openAddAllergy}>
          Add Allergy
        </button>
        <button className='button--secondary' onClick={logout}>
          Logout
        </button>
      </div>
      {isLoading ? (
        <div id='loading'>Loading...</div>
      ) : diseases.length === 0 ? (
        <div>No data available</div>
      ) : (
        <AllergyTable allergies={diseases} columns={COLUMNS} />
      )}
    </div>
  );
};
