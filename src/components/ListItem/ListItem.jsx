import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearFilter } from 'redux/filter/filterSlice';
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from 'redux/contactsSlice';
import { Oval } from 'react-loader-spinner';
import PropTypes from 'prop-types'; 
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Li = styled.li`
list-style: none;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
  )
`;
const StyledCard = styled(Card)`
@media (max-width: 767px) {
  font-size: 14px;
}`;

const StyledCardTitle = styled(Card.Title)`
margin-bottom: 0;

@media (max-width: 767px) {
  font-size: 14px;
}`;
const StyledCardBody = styled(Card.Body)`
display: flex;
justify-content: space-between;
align-items: center;

@media (max-width: 767px) {
  padding: 5px 5px;
}
`;

const StyledCardText = styled(Card.Text)`
margin-bottom: 0;`;

const StyledButton = styled(Button)`
margin-right: 1rem`;

const StyledModalButton = styled(Button)`
display: flex;
justify-content: center;
align-items: center`;

const ListItem = ({ id, name, number, passDeletedContactInfoForToast, passUpdatedContactInfoForToast }) => {
  const dispatch = useDispatch();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const [updateContact, { isLoading }] = useUpdateContactMutation();
  const [newName, setNewName] = useState(name);
  const [newNumber, setNewNumber] = useState(number);
   const [isShown, setIsshown] = useState(false);
  
  const toggleModal = () => {
    setIsshown(!isShown);
  };
 
  const onFormSubmit = data => {
    const { id, newName: name, newNumber: number } = data;

    updateContact({ id, name, number });
    passUpdatedContactInfoForToast(true);
    return;
  };

  const onInputHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setNewName(value);
        break;
      case 'number':
        setNewNumber(value);
        break;
      default:
        return;
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    onFormSubmit({ id, newName, newNumber });
  };

  return (
    <>      
        <Modal show={isShown} onHide={toggleModal} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
          Edit
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
              
              <Form.Control
                type="text"
                name="name"
                value={newName}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={onInputHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Number</Form.Label>
              
              <Form.Control
                type="tel"
                name="number"
                value={newNumber}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={onInputHandler}
              />
            </Form.Group>
            <div className="d-grid gap-2">
            <StyledModalButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <Oval color="#ffffff" height={20} width={20} />
              ) : (
                'OK'
              )}
              </StyledModalButton>
              </div>
            </Form>
          </Modal.Body> 
        </Modal>
 
      
      
      <Li>
        <StyledCard bg='info'>
          <StyledCardBody >
            <StyledCardTitle>{name}:</StyledCardTitle>
            <StyledCardText>{number}</StyledCardText>
            <div><StyledButton variant="outline-light" type="button" onClick={toggleModal}>
            Edit
          </StyledButton>
            <Button
              variant="outline-light"
            type="button"
            onClick={() => {
              dispatch(clearFilter());
              deleteContact(id);
              passDeletedContactInfoForToast(true);
            }}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Oval color="#25515a" height={20} width={20} />
            ) : (
              'Delete'
            )}
              </Button>
              </div>
          </StyledCardBody>
        </StyledCard>
       </Li>
      
    </>
  );
};

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  passDeletedContactInfoForToast: PropTypes.func.isRequired,
  passUpdatedContactInfoForToast: PropTypes.func.isRequired,
};

export default ListItem;
