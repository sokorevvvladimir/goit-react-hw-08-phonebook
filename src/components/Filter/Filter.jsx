import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filter/filterSlice';
import { getFilter } from '../../redux/filter/filterSelectors';
import { useGetContactsByNameQuery } from 'redux/contactsSlice';
import Form from 'react-bootstrap/Form';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onInputHandler = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  useGetContactsByNameQuery(filter, {
    skip: filter === '',
  });

  return (
    <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Find contacts by name</Form.Label>
      
      <Form.Control type="text" value={filter} onChange={onInputHandler} />
    </Form.Group>
  );
};

export default Filter;
