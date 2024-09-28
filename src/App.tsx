import { useState } from 'react';
import { User } from './types';
import './styles/app.scss';
import UserCard from './components/UserCard';
import TableController from './components/TableController';
function App() {
  
  const [shownUsers, setShownUsers] = useState<User[]>([]);

  function handleSetUsers(users: Array<User>) {
    setShownUsers(users);
  }
  return (
    <>
     <TableController sendUserData={handleSetUsers}></TableController>
      {shownUsers.map((user) => {
        return <UserCard user={user}></UserCard>;
      })}
    </>
  );
}

export default App;
