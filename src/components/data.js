import React, { Fragment, useState } from 'react';
import { nanoid } from "nanoid";
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import Makedata from './Makedata.json';





const Data = () => {

  const [contacts, setContacts] = useState(Makedata);
  const [addFormData, setAddFormData] = useState({
    NameUser: "",
    Owner: "",
    description: "",

  });

  const [editFormData, setEditFormData] = useState({
    NameUser: "",
    Owner: "",
    description: "",

  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      NameUser: addFormData.NameUser,
      Owner: addFormData.address,
      description: addFormData.description,

    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      NameUser: editFormData.NameUser,
      Owner: editFormData.Owner,
      description: editFormData.description,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      NameUser: contact.NameUser,
      Owner: contact.Owner,
      description: contact.description,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (

    <>
      <div className="container-app">
        <h2 className='allgroups'> GROUPS</h2>
        <form className='form-data' onSubmit={handleEditFormSubmit}>
          <table className='table'>
            <thead>
              <tr>
                <th className='th'>NameGroup </th>
                <th className='th'>Owner</th>
                <th className='th'> description</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (

                <Fragment>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
            <div>
              <button className=' btn-block' onClick={() => openInNewTab('./addgroup')}>
                ADD Group
              </button>
            </div>
          </table>
        </form>

      </div>
    </>
  );




};

export default Data;
