import React, { Fragment, useState } from 'react';
import Navbar from "../Navbar";
import Makedata from './Makedata.json';




export const NameGroup = () => {



    return(
         <>
         <Navbar />
          <div className="container-app">
        <h2 className='allgroups'> </h2>
        <form className='form-data' >
          <table className='table'>
            <thead>
              <tr>
                <th className='th'>FileName </th>
                <th className='th'>States</th>
                <th className='th'> Reserved By</th>
              </tr>
            </thead>
            <tbody>
     
            <Fragment>

        
              </Fragment>
   
            </tbody>
            <div>
              <button className=' btn-block' >
                ADD 
              </button>
              <div>
              <button  className=' btn-block'  type="button">
                  Cancel
                   </button>
            </div>
            </div>
          </table>
        </form>

      </div>
      
    </>
    )
}
export default NameGroup;