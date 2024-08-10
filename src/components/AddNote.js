import React from 'react'
import { useContext,useState } from "react";
import notesContext from "../context/Notes/notesContext";


const AddNote = () => {
    const context = useContext(notesContext);
    const {addnote} = context

    const [note, setnote] = useState({title:"",description:"",tag:""})

    const onChange =(e)=>{
        setnote({
            ...note,[e.target.name]: e.target.value
        })
    }

    const handleclick=(e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag)
        setnote({id:"",title:"",description:"",tag:""})
    }
  return (
    <>
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
          Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Add Note
        </button>
      </form>
      </div>
      </>
  )
}

export default AddNote
