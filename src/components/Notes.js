import React,{ useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {

    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context;

    let navigate = useNavigate();
    
    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({id:'', etitle:'', edescription:'', etag:''});

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
        
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id : currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag})
    }


    const handleOnChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }

    const handleEditNote = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note updated","success");
        refClose.current.click()
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}/>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div className="modal-body">
                            <form>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control fw-light" id="etitle" name="etitle" placeholder='Title' value={note.etitle} onChange={handleOnChange}/>
                                    <label htmlFor="etitle" className="form-label fw-bold">Title</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea className="form-control fw-light" id="edescription" name="edescription" rows="3" placeholder='Description' value={note.edescription} onChange={handleOnChange}></textarea>
                                    <label htmlFor="edescription" className="form-label fw-bold">Description</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control fw-light" id="etag" name="etag" placeholder='Tag' value={note.etag}  onChange={handleOnChange}/>
                                    <label htmlFor="etag" className="form-label fw-bold">Tag</label>
                                </div>
                            </form>
                        </div>
                    
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button disabled={note.etitle.length === 0 || note.edescription.length === 0} type="button" className="btn btn-success" onClick={handleEditNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Your's Notes</h2>
            <div className="row row-cols-2 row-cols-md-4 g-4">
                {/* <div className="col my-4">
                    {notes.length === 0 && 'No Notes to display' }
                </div> */}
                {notes.map( (note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
                })}
            </div>
        </>
    )
}

export default Notes
