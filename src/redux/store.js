import { configureStore } from '@reduxjs/toolkit';
import { items, filter } from './contacts-reduser';
import { contactsApi } from 'redux/contacts-fetch';

export const store = configureStore({
  reducer: {
    items,
    filter,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
