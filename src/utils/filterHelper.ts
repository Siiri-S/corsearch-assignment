import { User } from '../types';

export const filterHelper = (
  user: User,
  searchTerm: string,
  fields: string[]
) => {
  let containsString: boolean = false;
  for (let i = 0; i < fields.length; i++) {
    if (
      user[fields[i] as keyof Omit<User, 'id' | 'address' | 'company'>]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      containsString = true;
      break;
    }
  }
  return containsString;
};
