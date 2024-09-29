import { User, SortFieldType } from '../types';

export const sorterHelper = (
  users: Array<User>,
  field: string,
  isAsc: boolean
) => {
  return users.sort(function (a, b) {
    if (a[field as keyof SortFieldType] < b[field as keyof SortFieldType]) {
      return isAsc ? -1 : 1;
    }
    if (a[field as keyof SortFieldType] > b[field as keyof SortFieldType]) {
      return isAsc ? 1 : -1;
    }
    return 0;
  });
};
