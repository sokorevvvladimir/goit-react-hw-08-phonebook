import { useState } from 'react';
import { useCreateContactMutation } from '../../redux/contactsSlice';
import { useGetAllContactsQuery } from '../../redux/contactsSlice';
import { Oval } from 'react-loader-spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import styled from 'styled-components';

const StyledButton = styled(Button)`
display: flex;
justify-content: center`;

const ToastContainerWithZindex = styled(ToastContainer)`
z-index: 999;`;

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { data } = useGetAllContactsQuery();
  const contacts = data;
  const [createContact, { isLoading }] = useCreateContactMutation();
  const [contactCreatedToast, setContactCreatedToast] = useState(false);
  const [nameForToast, setNameForToast] = useState('');
  const [onSameNameForToast, setOnSameNameForToast] = useState(false);
  const [onSameNumberForToast, setOnSameNumberForToast] = useState(false);
  
  const onSameName = data => {
        return contacts.find(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
  };

  const onSamePhoneNumber = data => {
    return contacts.find(({ number }) => number === data.number);
  };

  const onFormSubmit = data => {
    if (onSameName(data)) {
      setNameForToast(data.name);
      setOnSameNameForToast(true);
      return;
    }
    if (onSamePhoneNumber(data)) {
      setOnSameNumberForToast(true);
      return;
    }

    createContact(data);
    setContactCreatedToast(true);
    setNameForToast(data.name);
    return;
  };

  const onInputHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    onFormSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <ToastContainerWithZindex position="bottom-end">
       <Toast bg="success" onClose={() => setContactCreatedToast(false)} show={contactCreatedToast} delay={3000} autohide>
        <Toast.Header><strong className="me-auto">Success!</strong><small>Just now!</small></Toast.Header>
          <Toast.Body>{`${nameForToast} added to your contacts!`}</Toast.Body>
        </Toast>
        <Toast bg="danger" onClose={() => setOnSameNameForToast(false)} show={onSameNameForToast} delay={3000} autohide>
        <Toast.Header><strong className="me-auto">Warning!</strong><small>Just now!</small></Toast.Header>
          <Toast.Body>{`${nameForToast} is already in your contacts.`}</Toast.Body>
        </Toast>
        <Toast bg="danger" onClose={() => setOnSameNumberForToast(false)} show={onSameNumberForToast} delay={3000} autohide>
        <Toast.Header><strong className="me-auto">Warning!</strong><small>Just now!</small></Toast.Header>
          <Toast.Body>{`Contact with this phone number is already in your contacts.`}</Toast.Body>
        </Toast>
        </ToastContainerWithZindex>
    <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
            placeholder="Enter name"
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onInputHandler}
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          placeholder="Phone number"
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onInputHandler}
          />
      </Form.Group>
      <div className="d-grid gap-2">
        <StyledButton variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Oval color="#ffffff" height={20} width={20} />
          ) : (
            'Add contact'
          )}
        </StyledButton>
        </div>
      </Form>
      </>
  );
};

export default ContactForm;
