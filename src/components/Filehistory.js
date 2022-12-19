import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { filesService } from '../services/files.service';





const Filehistory = () => {


  const [filesHistory, setFilesHistory] = useState([]);


  useEffect(()=>{
    filesService.getFilesHistory()?.then(res => setFilesHistory(res?.file_history?.data || []))
  },[])

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
            <tbody>
              {
                filesHistory?.map(row => <tr key={row.file_id}>
                  <td>Hi</td>
                  <td>Hii</td>
                  <td>Hiii</td>
                  <td>Hiiii</td>
                  <td>Hiiiii</td>
                </tr>)
              }
              
            </tbody>

          </table>
        </form>

      </div>
    </>
  );




};

export default Filehistory;
