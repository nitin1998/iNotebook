import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:'', description:'', tag:''});

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({title:'', description:'', tag:''});
        props.showAlert("Note Added","success");
    }

    const handleOnChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})         
    }

    return (
        <div>
            <div className="container my-4">
                <div className="card border-secondary rounded" >
                    <div className="card-body">
                        <h2 className='text-center card-title'>Add a Note</h2>
                        <hr/>
                        <form>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control fw-light" id="title" name="title" placeholder='Title' value={note.title} onChange={handleOnChange}/>
                                <label htmlFor="title" className="form-label fw-bold">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control fw-light" id="description" name="description" rows="3" placeholder='Description' value={note.description} onChange={handleOnChange}></textarea>
                                <label htmlFor="description" className="form-label fw-bold">Description</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control fw-light" id="tag" name="tag" placeholder='Tag' value={note.tag} onChange={handleOnChange}/>
                                <label htmlFor="tag" className="form-label fw-bold">Tag</label>
                            </div>
                            <hr/>
                            <button disabled={note.title.length === 0 || note.description.length === 0} type="submit" className="btn btn-outline-secondary d-grid gap-2 col-1 mx-auto" onClick={handleAddNote}>Add Note</button>
                        </form>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default AddNote
