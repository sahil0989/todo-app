import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase";

function TodoInput({ getList }) {

    const [inputText, setInputText] = useState('');
    const movieCollectionRef = collection(db, auth?.currentUser?.email)

    const handleEnterPress = (e) => {
        if (e.keyCode === 13) {
            addDataFunc()
        }
    }
    
    const addDataFunc = async () => {
        try {
            if (auth?.currentUser?.uid) {
                await addDoc(movieCollectionRef, { task: inputText })
                getList();
                setInputText("")
            } else {
                alert("Please Login")
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="input-container">
            <input
                type="text"
                className="input-box-todo"
                placeholder="Enter your todo"
                value={inputText}
                onChange={e => {
                    setInputText(e.target.value)
                }}
                onKeyDown={handleEnterPress}
            />
            <button className="add-btn"
                onClick={() => {
                    addDataFunc()
                    setInputText("")
                }}>+</button>
        </div>
    );
}

export default TodoInput;