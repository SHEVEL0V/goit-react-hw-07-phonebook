import React, { useState } from 'react';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from 'redux/contacts-action';
import {
  useGetContactsQuery,
  useAddContactsMutation,
} from 'redux/contacts-fetch';

import s from './form.module.css';

export default function Form() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(true);

  const [updatePost] = useAddContactsMutation();

  const { data, isFetching, currentData } = useGetContactsQuery();

  console.log(data);

  const contacts = useSelector(state => state.items);
  const dispatch = useDispatch();

  const onSubmit = () => {
    addValidContacts({ name, phone, id: nanoid(5) });
    removeState();
    setStatus(!status);
    updatePost({ name, phone });
  };

  const removeState = () => {
    setName('');
    setPhone('');
  };

  const addValidContacts = value => {
    if (
      contacts.every(
        e => e.name.toLowerCase() !== value.name.toLowerCase(),
      )
    ) {
      dispatch(addContacts(value));
    } else {
      alert(`"${value.name}" is already in contact!`);
    }
  };

  return (
    <form
      className={s.form}
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label>
        <p className={s.text}>Name</p>
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <p className={s.text}>Number</p>
        <input
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={e => setPhone(e.target.value)}
          value={phone}
        />
      </label>
      <button className={s.button} type="sabmit">
        {isFetching && !currentData ? 'loading...' : 'add contact'}
        <span>
          <BsFillArrowRightSquareFill />
        </span>
      </button>
    </form>
  );
}
