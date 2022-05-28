import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Notification from '../Notification';
import { getFilter } from '../../redux/filter/filterSelectors';
import { useGetAllContactsQuery } from 'redux/contactsSlice';
import ListItem from 'components/ListItem';
import MainLoaderSpinner from 'components/MainLoaderSpinner';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const StyledUl = styled.ul`
  padding-inline-start: 0;
`;

const ToastContainerWithZindex = styled(ToastContainer)`
z-index: 999;`;

const List = () => {
  const { data, isFetching } = useGetAllContactsQuery();
  const contacts = data;
  const filter = useSelector(getFilter);
  const [deletedContactForToast, setDeletedContactForToast] = useState(false);
const [shouldUpdateForToast, setShouldUpdateForToast] = useState(false);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  const passDeletedContactInfoForToast = info => { 
    setDeletedContactForToast(info);
  };

  const passUpdatedContactInfoForToast = info => {
    setShouldUpdateForToast(info);
  }

  return (
    <>
      <ToastContainerWithZindex position="bottom-end">
       <Toast bg="success" onClose={() => setDeletedContactForToast(false)} show={deletedContactForToast} delay={3000} autohide>
        <Toast.Header><strong className="me-auto">Success!</strong><small>Just now!</small></Toast.Header>
          <Toast.Body>{'Deleted from your contacts!'}</Toast.Body>
        </Toast>
      </ToastContainerWithZindex>
      <ToastContainerWithZindex position="bottom-end">
       <Toast bg="success" onClose={() => setShouldUpdateForToast(false)} show={shouldUpdateForToast} delay={3000} autohide>
        <Toast.Header><strong className="me-auto">Success!</strong><small>Just now!</small></Toast.Header>
          <Toast.Body>{'Contact updated!'}</Toast.Body>
        </Toast>
        </ToastContainerWithZindex>
    <StyledUl>
      {isFetching && <MainLoaderSpinner />}
      {contacts &&
        !isFetching &&
        filteredContacts.map(contact => {
          return <ListItem key={contact.id} {...contact} passDeletedContactInfoForToast={passDeletedContactInfoForToast} passUpdatedContactInfoForToast={ passUpdatedContactInfoForToast}/>;
        })}
      {(!contacts || contacts.length === 0) && !isFetching && <Notification />}
      </StyledUl>
      </>
  );
};

export default List;
