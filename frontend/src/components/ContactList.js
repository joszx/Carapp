import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import axios from "axios";

const client = axios.create({
  baseURL: "https://joszx-cd-carapp.herokuapp.com/api/contacts",
});

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [editState, setEditState] = useState("");
  const [contactToEdit, setContactToEdit] = useState({});

  const updateContactsList = () => {
    const fetchContacts = async () => {
      let response = await client.get();
      //console.log(response.data.data);
      setContacts(response.data.data);
    };
    fetchContacts();
  };

  // GET contact list once on page load with Axios
  useEffect(() => {
    updateContactsList();
  }, []);

  const getContactsToRender = () => {
    return contacts.map((contact, idx) => {
      // console.log(contact);
      return (
        <div className="columns contact mt-3 is-vcentered" key={idx}>
          <div className="column has-text-left">
            <div>Name: {contact.name}</div>
            <div>Email: {contact.email}</div>
            <div>Phone: {contact.phone}</div>
            <div>Gender: {contact.gender}</div>
          </div>
          <div className="column is-narrow">
            <div className="buttons">
              <button
                className="button is-primary"
                onClick={() => handleEditContact(contact)}
              >
                Edit
              </button>
              <button
                className="button is-danger"
                onClick={() => handleDeleteContact(contact._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleEditContact = (contact) => {
    setEditState("is-active");
    setContactToEdit(contact);
  };

  const updateContact = async () => {};

  // Delete with Axios
  const handleDeleteContact = async (id) => {
    await client.delete(`${id}`);
    updateContactsList();
  };

  // Post with Axios
  const addContact = async (name, email, phone, gender) => {
    let response = await client.post("", {
      name: name,
      email: email,
      phone: phone,
      gender: gender,
    });
    updateContactsList();
  };

  return (
    <div>
      <ContactForm
        addContact={addContact}
        updateContactsList={updateContactsList}
      />
      <hr></hr>
      <div className="contactList">{getContactsToRender()}</div>

      <div className={`modal ${editState}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit contact</p>
            <button
              onClick={() => {
                setEditState("");
              }}
              className="delete"
              aria-label="close"
            />
          </header>

          <section className="modal-card-body">
            {/* <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="e.g Alex Smith"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input type="checkbox" />I agree to get you the gift you
                  pest...
                </label>
              </div>
            </div> */}
            <ContactForm
              contact={contactToEdit}
              addContact={updateContact}
              updateContactsList={updateContactsList}
            ></ContactForm>
          </section>

          <footer className="modal-card-foot">
            <button className="button is-success" onClick={updateContact}>
              Save changes
            </button>
            <button
              onClick={() => {
                setEditState("");
              }}
              className="button"
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
