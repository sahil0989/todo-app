import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { auth, db } from '../firebase';

function Todolist(props) {

    const deleteListItem = async (id) => {
        try {
            if (auth?.currentUser?.uid) {
                const moviesData = doc(db, auth?.currentUser?.email, id);
                await deleteDoc(moviesData);
                props.getList();
            } else {
                alert("Please Login")
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <li className="list-item">
                <h2 className='w-64'>{props.item.task}</h2>
                <div className='flex gap-4 icons'>
                    <div className='hover:cursor-pointer' onClick={() => props.editFunc(props.item.id)}>
                        <span>
                            <FaRegEdit />
                        </span>
                    </div>
                    <div className='scale-125 hover:cursor-pointer' onClick={() => deleteListItem(props.item.id)}>
                        <span>
                            <MdOutlineDelete />
                        </span>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Todolist