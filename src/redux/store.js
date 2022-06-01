import { configureStore } from '@reduxjs/toolkit';
import { filterValue } from './contacts-reduser';
import { contactsApi } from 'redux/contacts-RTK';

export const store = configureStore({
  reducer: {
    filterValue,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
