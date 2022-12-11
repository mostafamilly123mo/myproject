import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    
    <tr>
      <td  className='th'>{contact.NameUser}<a href="/addgroup"></a></td>
      <td  className='th'>{contact.Owner}</td>
      <td  className='th'>{contact.description}</td>
    </tr>
  );
};

export default ReadOnlyRow;