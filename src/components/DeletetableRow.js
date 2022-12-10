import React from "react";

const DeletetableRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    
    <tr>
      <td  className='th'>{contact.NameUser}<a href="/addgroup"></a></td>
      <td  className='th'>{contact.Owner}</td>
      <td  className='th'>{contact.description}</td>
    
      <td>
        <button  className=' block'  type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DeletetableRow;