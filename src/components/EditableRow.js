import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <div className="container-app">
    <tr>
      <td  className='td'>
        <input
        className="td"
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="nameUser"
          value={editFormData.NameUser}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td  className='td'>
        <input
         className="td"
          type="text"
          required="required"
          placeholder="Enter an Owner..."
          name="owner"
          value={editFormData.owner}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td  className='td'>
        <input
           className="td"
          type="text"
          required="required"
          placeholder="Enter a description..."
          name="description"
          value={editFormData.description}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td> 
        <button className=' btn-block'  type="submit">Save</button>
        <button  className=' btn-block'  type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
    </div>
  );
};

export default EditableRow;