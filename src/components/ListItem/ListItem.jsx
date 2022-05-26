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


const Li = styled.li`
list-style: none;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  // @media (min-width: 769px){
  //   width: 80%;
  //   height: 50px;
  // };
  // @media (min-width: 1024px) {
  //   width: 40%;
  // }
  )
`;

// const Button = styled.button`
//   width: 100px;
//   min-width: 100px;
//   height: 40px;
//   font-size: 12px;
//   font-weight: 400;
//   border-radius: 3px;
//   margin-left: 10px;
//   max-height: 40px;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   &:hover {
//     background-color: #cde2e5;
//   }
//   &:active {
//     color: #ffffff;
//     background-color: #b3c2c4;
//   }
// `;

// const StyledDiv = styled.div`
//   height: 90px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;

//   @media (min-width: 769px) {
//     flex-direction: row;
//     max-height: 40px;
//   } ;
// `;

// const ModalButton = styled.button`
//   width: 15vw;
//   height: 40px;
//   font-size: 20px;
//   font-weight: 400;
//   border-radius: 3px;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-left: auto;
//   margin-right: auto;

//   &:hover {
//     background-color: #cde2e5;
//   }
//   &:active {
//     color: #ffffff;
//     background-color: #b3c2c4;
//   }
// `;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 10px;
  background-image: repeating-linear-gradient(
    -45deg,
    #1cadca,
    #1cadca 10px,
    #25515a 10px,
    #25515a 20px
  );
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 95%;
  margin-top: 5px;
  &:focus {
    outline: 3px solid #1ac7d2;
    border: none;
  }
`;

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
      {/* <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    > */}
      {/* <Modal.Header closeButton> */}
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      {/* </Modal.Header> */}
      {/* <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body> */}
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    {/* </Modal> */}
      
        <Modal show={isShown} onHide={toggleModal} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
          Edit
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ModalForm onSubmit={onSubmitHandler}>
            <Label>
              Name
              <Input
                type="text"
                name="name"
                value={newName}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={onInputHandler}
              />
            </Label>
            <Label>
              Number
              <Input
                type="tel"
                name="number"
                value={newNumber}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={onInputHandler}
              />
            </Label>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Oval color="#25515a" height={20} width={20} />
              ) : (
                'OK'
              )}
            </Button>
            </ModalForm>
          </Modal.Body> 
        </Modal>
 
      
      
      <Li>
        <Card bg='info'>
          <Card.Body style={{display: 'flex', justifyContent: 'space-between',
  alignItems: 'center'}}>
            <Card.Title style={{marginBottom: 0}}>{name}:</Card.Title>
            <Card.Text style={{marginBottom: 0}}>{number}</Card.Text>
            <div><Button variant="outline-light" type="button" onClick={toggleModal} style={{marginRight: '1rem'}}>
            Edit
          </Button>
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
          </Card.Body>
        </Card>
        {/* {name}: {number}
        <StyledDiv>
          <Button type="button" onClick={toggleModal}>
            Edit
          </Button>
          <Button
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
        </StyledDiv> */}
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
