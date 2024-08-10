import NoteContext from "./notesContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = [];

  const [notes, setnotes] = useState(notesinitial);

  //Get all Notes api call

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers:{"Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
    });

    const json = await response.json();
    setnotes(json);
  };
  //Add Notes api call
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers:{"Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
    
  };

  //Delete notes api call
  const deleteNote = async (id) => {
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers:{"Content-Type":"application/json",
      "auth-token":localStorage.getItem('token')
    },
  });
  const json = await response.json();
  console.log(json);
  };

  //Update Note APi call
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers:{"Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });

    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
      break;
    }
    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addnote, deleteNote, editnote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
