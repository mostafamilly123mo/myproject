import React, { Fragment, useState } from 'react';
import Navbar from "../Navbar";
import grouppage from './grouppage.json';




export const Grouppage = () => {

const [contacts ,setContacts] =useState(grouppage);

    return(
         <>
         <Navbar />
          <div className="container-app">
        <h2 className='namegroup'> Namegroup</h2>
        <form className='form-data' >
          <table className='table'>
            <thead>
              <tr>
                <th className='th'>FileName </th>
                <th className='th'>States</th>
                <th className='th'> Reserved By</th>
                <th> <button className=' btn-block' >   ADD </button></th>
                <th> <button  className='btn-block'>  Cancel </button></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact)=>(
                 < tr>
                 <td>{contact.FileName}</td>
                 <td>{contact.States}</td>
                 <td>{contact.ReservedBy}</td>
                 </tr>
             ) )}
            
            </tbody>

          </table>
        </form>

      </div>
      
    </>
    )
}
export default Grouppage;