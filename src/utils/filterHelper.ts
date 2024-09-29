import { User } from '../types';

export const filterHelper = (
  user: User,
  searchTerm: string,
  fields: string[]
) => {
  let containsString: boolean = false;
  for (const field of fields) {
    containsString = user[
      field as keyof Omit<User, 'id' | 'address' | 'company'>
    ]
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (containsString) {
      break;
    }
  }
  return containsString;
};
