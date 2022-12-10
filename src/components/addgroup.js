import React,{Fragment ,useState}  from 'react';
import { nanoid } from "nanoid";
import Form from "react-validation/build/form";
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import Makedata from './Makedata.json';
import Navbar from '../Navbar';

const ADD = () => {
   
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
  
    // const handleEditFormSubmit = (event) => {
    //   event.preventDefault();
  
    //   const editedContact = {
    //     id: editContactId,
    //     NameUser: editFormData.NameUser,
    //     Owner: editFormData.Owner,
    //     description: editFormData.description,
    //   };
      
    //   const handleDeleteClick = (contactId) => {
    //   const newContacts = [...contacts];
  
    //   const index = contacts.findIndex((contact) => contact.id === editContactId);
  
    //   newContacts[index] = editedContact;
  
    //   setContacts(newContacts);
    //   setEditContactId(null);
    // };
  
  
    //   setEditFormData(formValues);
    // };
  

    return(
        <>
        <Navbar/>
        <div className="col-md-12">
         <div className="container-apps">
         <h2 className='addgruop'>ADD GROUP</h2>
        <Form onSubmit={handleAddFormSubmit} >
          <input
            className="td"
            type="text"
            name="NameUser"
            required="required"
            placeholder="Enter a NameUser..."
            onChange={handleAddFormChange}
          />
          <input
             className="td"
            type="text"
            name="description"
            required="required"
            placeholder="Enter a description..."
            onChange={handleAddFormChange}
          />
  
          <div><button className='btn-block1' type="submit">Add</button></div>
        </Form>
        </div>
        </div>
        </>
    )
    };


    export default ADD;

