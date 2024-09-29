import { useState, useEffect } from 'react';
import { User, SortType } from '../types';
import '../styles/app.scss';
import getAll from '../services/users';
import { filterHelper } from '../utils/filterHelper';
import { sorterHelper } from '../utils/sorterHelper';

interface Props {
  sendUserData: (data: User[]) => void;
}

const TableController = ({ sendUserData }: Props) => {
  const [apiUsers, setUsers] = useState<User[]>([]);
  const [filterString, setFilterString] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortDirection, setSortDirection] = useState<SortType>('asc');
  const [sortField, setSortField] = useState<string>('name');

  useEffect(() => {
    const fetchUserList = async () => {
      const users = await getAll();
      setUsers(users);
      const usersCopy = [...users];
      setFilteredUsers(usersCopy);
      sendUserData(usersCopy);
    };
    void fetchUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // send user data if filteredUsers updates
  useEffect(() => {
    sendUserData(filteredUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredUsers]);

  // handle sorting changes
  useEffect(() => {
    const sortedUsers = sorterHelper(
      [...filteredUsers],
      sortField,
      sortDirection === 'asc'
    );
    setFilteredUsers(sortedUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortDirection, sortField]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterString = e.target.value;
    const filteredItems = [...apiUsers].filter((user) =>
      filterHelper(user, newFilterString, ['name', 'email', 'phone', 'website'])
    );
    setFilteredUsers(filteredItems);
    setFilterString(newFilterString);
  };

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="table_controller">
      <div className="option_container">
        <p>Search:</p>
        <input
          type="text"
          value={filterString}
          onChange={handleFilterChange}
          placeholder="Type to search"
          className="search"
        />
      </div>
      <div className="option_container">
        <p>Sort by:</p>
        <div className="sorter_options">
          <select
            className="select"
            name="selectedSort"
            onChange={handleSortFieldChange}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          <button className="button" onClick={handleSortDirectionChange}>
            {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableController;
