import { AiFillDelete } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetContactsQuery,
  useDeleteContactsMutation,
} from 'redux/contacts-fetch';
import { useEffect, useState } from 'react';
import s from './contactsList.module.css';

export default function ContactsList() {
  const [contacts, setContacts] = useState(null);
  // const dispatch = useDispatch();

  // const filter = useSelector(state => state.filter.toLowerCase());

  const { currentData } = useGetContactsQuery('');
  const [deleteEl] = useDeleteContactsMutation();

  // const filterItems = contacts.filter(el =>
  //   el.name.toLowerCase().includes(filter),
  // );

  return (
    <div>
      <h2>Contacts:</h2>
      <ul>
        {currentData &&
          currentData.map((el, inx) => {
            const numberEl = inx + 1;
            const { name, phone, id } = el;
            return (
              <li key={id} className={s.item}>
                <span className={s.number}>{numberEl}</span>
                <span>
                  <b className={s.text}>name:</b> {name}{' '}
                </span>
                <span>
                  <b className={s.text}>tel:</b>
                  {phone}
                </span>
                <button
                  className={s.button}
                  type="button"
                  onClick={() => deleteEl(id)}
                >
                  <AiFillDelete />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

// ContactsList.propTypes = {
//   removeContacs: PropTypes.func.isRequired,
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     }),
//   ),
// };
