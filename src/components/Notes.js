import React, { useEffect, useState, useContext, useRef } from "react";
import notesContext from "../context/Notes/notesContext";
import Notesitem from "./Notesitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';
import './Notes.css'; // Import the CSS file

const Notes = () => {
  const context = useContext(notesContext);
  let navigate = useNavigate();
  const { notes, getNotes, editnote } = context;
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
      id: currentnote._id,
    });
  };

  const onChange = (e) => {
    setnote({
      ...note, [e.target.name]: e.target.value
    });
  };

  const handleclick = (e) => {
    editnote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editNoteModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={note.etitle}
                    name="etitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={onChange}
                    rows="4"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag}
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleclick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 notes-container">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && <div className="no-notes">No Notes to display</div>}
        </div>
        {notes.map((note) => {
          return (
            <Notesitem key={note._id} note={note} updatenote={updatenote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
