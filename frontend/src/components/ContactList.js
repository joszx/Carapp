import { useState } from "react";

export default function ContactList() {
  const [contacts, setContacts] = useState([
    { name: "Bobby" },
    { name: "Jake Kim" },
    { name: "Daniel Park" },
  ]);

  const [newContact, setNewContact] = useState(null);

  const getContactsToRender = () => {
    return contacts.map((contact, idx) => {
      return (
        <div className="columns contact mt-3 is-vcentered" key={idx}>
          <div className="column has-text-left">
            <div key={idx}>{contact.name}</div>
          </div>
          <div className="column is-narrow">
            <div className="buttons">
              <button className="button is-dark">Dark</button>
              <button className="button is-danger">Delete</button>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleInputChanged = (event) => {
    setNewContact(event.target.value);
  };

  const handleAddNewTodo = () => {
    const newContactList = [...contacts];
    newContactList.push({ name: newContact });
    setContacts(newContactList);
  };

  return (
    <div>
      <input
        className="input is-normal"
        type="text"
        placeholder="Add a new contact"
        onChange={handleInputChanged}
      ></input>
      <input
        className="button mt-3 is-fullwidth"
        type="submit"
        value="Add contact"
        onClick={handleAddNewTodo}
      ></input>
      <hr></hr>
      <div className="contactList">{getContactsToRender()}</div>
    </div>
  );
}
