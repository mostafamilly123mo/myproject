import React, { Fragment, useState } from 'react';
import { nanoid } from "nanoid";
import Makedata from './Makedata.json';





const Filehistory = () => {

  return (

    <>
      <div className="container-app">
        <h2 className='filehis'> File History</h2>
        <form className='form-data'>
          <table className='table'>
            <thead>
              <tr>
                <th className='th'>UserName </th>
                <th className='th'>booking Date</th>
                <th className='th'> Modification Date</th>
                <th className='th'> Download Date</th>
                <th className='th'> cancel Reservation</th>
              </tr>
            </thead>


          </table>
        </form>

      </div>
    </>
  );




};

export default Filehistory;
