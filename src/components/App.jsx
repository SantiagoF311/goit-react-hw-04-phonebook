import React, { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm";
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeName = (event) => {
    const { value } = event.target;
    setName(value);
  }

  const handleChangeNumber = (e) => {
    const { value } = e.target;
    setNumber(value);
  }

  const handleChangeFilter = (e) => {
    const { value } = e.target;
    setFilter(value);

    const filteredContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredContacts(filteredContact);
  }

  const addContact = () => {
    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const newContact = {
      id: nanoid(3),
      name: name,
      number: number
    };

    const sameContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(newContact.name.toLowerCase())
    );

    if (sameContact.length > 0) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      setName('');
      setNumber('');
    }
  }

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        filter={filter}
        contacts={contacts}
        filteredContacts={filteredContacts}
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
        onChangeFilter={handleChangeFilter}
        onAddContact={addContact}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
