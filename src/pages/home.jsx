import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllergyTable } from '../components/allergyTable';
import { LOGIN, STATUS } from '../constants/api';
import { getAllergy } from '../services/allergy.service';
import { removeToken } from '../services/storage.service';

export const Home = () => {
  const [diseases, setDiseases] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    const res = await getAllergy();
    if (res.status === STATUS.SUCCESS) {
      const { rows } = res.data.data;
      setDiseases(rows);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const openAddAllergy = () => {
    navigate('/allergy');
  };

  const logout = () => {
    removeToken();
    navigate(LOGIN);
  };

  return (
    <div>
      <button onClick={openAddAllergy}>Add Allergy</button>
      <button onClick={logout}>Logout</button>
      {diseases.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <AllergyTable allergies={diseases} />
      )}
    </div>
  );
};
