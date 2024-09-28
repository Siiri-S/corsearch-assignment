import { useState, useEffect } from 'react';
import { User, SortType } from './types';
import './styles/app.scss';
import getAll from './services/users';
import UserCard from './components/UserCard';
import { filterHelper } from './utils/filterHelper';
import { sortAsc, sortDesc } from './utils/sorterHelper';

function App() {
  const [apiUsers, setUsers] = useState<User[]>([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortType, setSortType] = useState<SortType>('asc');
  const [sortField, setSortField] = useState<string>('name');

  useEffect(() => {
    const fetchUserList = async () => {
      const users = await getAll();
      setUsers(users);
      setFilteredUsers(users);
    };
    void fetchUserList();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = apiUsers.filter((user) =>
      filterHelper(user, searchTerm, ['name', 'email', 'phone', 'website'])
    );

    setFilteredUsers(filteredItems);
  };

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSortField(e.target.value);
    const sortedUsers =
      sortType === 'asc'
        ? sortAsc(filteredUsers, e.target.value)
        : sortDesc(filteredUsers, e.target.value);

    setFilteredUsers(sortedUsers);
  };

  const handleSortTypeChange = () => {
    if (sortType === 'desc') {
      setSortType('asc');
      const sortedUsers = sortAsc(filteredUsers, sortField);
      setFilteredUsers(sortedUsers);
    } else {
      setSortType('desc');
      const sortedUsers = sortDesc(filteredUsers, sortField);
      setFilteredUsers(sortedUsers);
    }
  };

  return (
    <>
      <div className="table_header">
        <div className="option_container">
          <p>Search:</p>
          <input
            type="text"
            value={searchItem}
            onChange={handleInputChange}
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
            <button className="button" onClick={handleSortTypeChange}>
              {sortType === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
      </div>

      {filteredUsers.map((user) => {
        return <UserCard user={user}></UserCard>;
      })}
    </>
  );
}

export default App;
