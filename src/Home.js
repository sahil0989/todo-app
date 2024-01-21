import React from 'react'
import TodoInput from './Components/TodoInput';
import Todolist from './Components/TodoList';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import MyModal from './Components/MyModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home() {

    const [alertFunc, setAlert] = useState(true)
    const [prevData, setPrevData] = useState("")
    const [listTodo, setListTodo] = useState([])
    const [divBlock, setDiv] = useState(false)
    const [idDoc, setId] = useState("");

    const uidUser = auth?.currentUser?.email
    const movieCollectionRef = collection(db, uidUser)
    const navigate = useNavigate();

    useEffect(() => {
        getList();
        setAlert(false);
        // eslint-disable-next-line
    }, []);

    const getList = async () => {
        try {
            const data = await getDocs(movieCollectionRef);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setListTodo(filterData);
            console.log('asdf ' + listTodo.length)
            if (filterData.length === 0) {
                setDiv(true);
            } else {
                setDiv(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    const signOutFunc = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleOnClose = () => {
        setAlert(false);
    }

    const particularData = async (id) => {
        const docRef = doc(db, uidUser, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setPrevData(docSnap.data().task);
        } else {
            console.log("No such document!");
        }
    };

    const editFunc = async (id) => {
        if (auth?.currentUser?.uid) {
            setAlert(true)
            setId(id);
            particularData(id)
        } else {
            alert("Please Login");
        }
    }

    return (
        <>
            <div className="main-container relative">
                <div className="center-container">
                    <TodoInput getList={getList} />
                    <h1 className="app-heading text-xl mt-2">TODO</h1>
                    <hr />
                    {
                        divBlock && <h3 className='text-white mt-4'>No Task to do now...</h3>
                    }
                    {listTodo.map((listItem, id) => {
                        return (
                            <Todolist key={id} index={id} editFunc={editFunc} item={listItem} setAlert={setAlert} getList={getList} />
                        )
                    })}
                </div>

                <button className='absolute right-10 top-5 text-white bg-[#316fc1] px-4 py-2 rounded-full' onClick={signOutFunc}>Sign Out</button>
            </div>

            <div className='absolute'>Made by :- Sahil</div>

            {alertFunc && <MyModal getList={getList} idDoc={idDoc} data={prevData} onClose={handleOnClose} />}
        </>
    )
}
