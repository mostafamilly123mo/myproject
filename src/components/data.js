import React, { useState } from 'react';
import Makedata from './Makedata.json';


const Data = () => {

  const [contacts, setContacts] = useState(Makedata);


  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (

    <>
      <div className="container-app">
        <h2 className='allgroups'> GROUPS</h2>
        <form className='form-data' >
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
                < tr>
                 <td>{contact.NameUser}</td>
                 <td>{contact.Owner}</td>
                 <td>{contact.description}</td>
                 </tr>
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
