import React from "react";
import { useContext } from "react";
import notesContext from "../context/Notes/notesContext";

const Notesitem = (props) => {
  const { note,updatenote } = props;
  const context = useContext(notesContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body ">
            <div className="d-flex">
          <h5 className="card-title "> {note.title}</h5>
             <i className="fa-sharp fa-solid fa-trash mx-3 my-1" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="far fa-edit mx-1 my-1" onClick={()=>{updatenote(note)}}></i>
          </div>    
          <p className="card-text">{note.description}</p>
          <div className="d-flex">
          <i className="fa-solid fa-hashtag my-1"></i>
          <p className="card-text mx-2">{note.tag}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notesitem;
