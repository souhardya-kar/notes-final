import React, { useState, useEffect } from "react";
import TagInput from "../../components/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  notedata,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(notedata?.title || "");
  const [content, setContent] = useState(notedata?.content || "");
  const [tags, setTags] = useState(notedata?.tags || []);
  const [noteType, setNoteType] = useState(notedata?.noteType || "notes");
  const [expense, setExpense] = useState(notedata?.expense || "");
  const [error, setError] = useState(null);

  //add new note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
        noteType,
        expense: noteType === "finance" ? expense : undefined,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note added successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  //edit note
  const editNote = async () => {
    const noteId = notedata._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    if (noteType === "finance" && !expense) {
      setError("Please enter the expense");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  useEffect(() => {
    if (type === "edit" && notedata) {
      setNoteType(notedata.noteType);
      if (notedata.noteType === "finance") {
        setExpense(notedata.expense);
      }
    }
  }, [notedata, type]);

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-5">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to gym at 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <div className="mt-3">
        <label className="input-label">Type</label>
      </div>

      <div className="mt-3">
        <select
          value={noteType}
          onChange={({ target }) => setNoteType(target.value)}
          disabled={type === "edit"} // disable select when editing
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
        >
          <option value="notes">Notes</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      {noteType === "finance" && (
        <div className="mt-3">
          <label className="input-label">Expense</label>
          <input
            type="number"
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded ml-3"
            placeholder="Expense"
            value={expense}
            onChange={({ target }) => setExpense(target.value)}
            disabled={type === "edit"} // disable input when editing
          />
        </div>
      )}

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
