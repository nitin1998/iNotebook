import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const [notes, setNotes] = useState([]);

    // FETCH ALL NOTES
    const getNotes = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetechallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // ADD A NOTE
    const addNote = async (data) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        
        try {
            const json = await response.json();
            setNotes(notes.concat(json));
        } catch (error) {
            console.log(error);
        }
        
    }

    // DELETE A NOTE
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log("note deleted "+json)
        const newNotes = notes.filter((notes) =>{return notes._id !== id})
        setNotes(newNotes);
    }

    // EDIT A NOTE
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log("note edited : "+json);
        getNotes();
    }

    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;