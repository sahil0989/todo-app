import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, db } from '../firebase';

export default function MyModal({ getList, idDoc, data, onClose }) {

  const handleOnClose = (e) => {
    if (e.target.id === "popupBlock") onClose();
  }

  const [newInput, setNewInput] = useState("")

  const updateFunc = () => {
    console.log(newInput)
  }

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      addDataFunc(idDoc)
      onClose()
    }
  }

  const addDataFunc = async (id) => {
    try {
      if (auth?.currentUser?.user !== null) {
        const moviesref = doc(db, auth?.currentUser?.email, id);
        await updateDoc(moviesref, { task: newInput });
        getList();
      } else {
        alert("Please Login")
      }
    } catch (error) {
      console.log(error.message);
      console.log("slkdhff");
    }
  }

  return (
    <div id='popupBlock' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-white px-8 mx-2 py-8 rounded-xl'>

        <h2 className="flex items-center justify-center text-2xl font-semibold mb-8 underline">Update Your Task</h2>

        <div>
          <label htmlFor="text" className="block text-md font-medium text-gray-700"> Your prev. Task </label>

          <input
            type="text"
            id="text"
            value={data}
            onChange={(e) => setNewInput(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm border px-4 py-2 my-2"
          />

          {/* <label htmlFor="text" className="block text-md font-medium text-gray-700"> Update Your TASK </label> */}

          <span className="text-md font-medium text-gray-700">Re-write your Task</span>

          <input
            type="text"
            id="text"
            value={newInput}
            onChange={(e) => setNewInput(e.target.value)}
            onClick={updateFunc}
            onKeyDown={handleEnterPress}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm border px-4 py-2 my-2"
          />
        </div>
      </div>
    </div>
  )
}
