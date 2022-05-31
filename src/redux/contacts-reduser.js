import { createReducer } from '@reduxjs/toolkit';
import {
  addContacts,
  addValueFilter,
  removeContacts,
} from './contacts-action';

export const items = createReducer([], {
  [addContacts]: (state, action) => [...state, action.payload],
  [removeContacts]: (state, { payload }) =>
    state.filter(el => el.id !== payload),
});

export const filter = createReducer('', {
  [addValueFilter]: (_, { payload }) => payload,
});
