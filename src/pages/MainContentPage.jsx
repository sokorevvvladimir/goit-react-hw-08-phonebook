import ContactForm from "../components/Form";
import Filter from "../components/Filter";
import List from "../components/List";

const MainContentPage = () => { 
 
  return <>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
    <List/></>
};

export default MainContentPage;