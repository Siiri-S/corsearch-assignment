import { User, SortFieldType } from '../types';

export const sortAsc = (users: Array<User>, field: string) => {
  return users.sort(function (a, b) {
    if (a[field as keyof SortFieldType] < b[field as keyof SortFieldType]) {
      return -1;
    }
    if (a[field as keyof SortFieldType] > b[field as keyof SortFieldType]) {
      return 1;
    }
    return 0;
  });
};

export const sortDesc = (users: Array<User>, field: string) => {
  return users.sort(function (a, b) {
    if (a[field as keyof SortFieldType] > b[field as keyof SortFieldType]) {
      return -1;
    }
    if (a[field as keyof SortFieldType] < b[field as keyof SortFieldType]) {
      return 1;
    }
    return 0;
  });
};
