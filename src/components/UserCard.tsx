import { User } from '../types';

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => (
  <div className="user_card">
    <div className="user_card_body">
      <div className="user_card_title">
        <p>{user.name}</p>
      </div>
    </div>
    <div className="columns">
      <div className="column_right">
        <div className="column_content">
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <a href={user.website}>{user.website}</a>
        </div>
      </div>
      <div className="column_left">
        <div className="column_content">
          <p>
            {user.address.street} {user.address.suite}
          </p>
          <p>
            {user.address.city} {user.address.zipcode}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default UserCard;
