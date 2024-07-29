const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
  userId: { type: String, required: true },
  noteType: { type: String, enum: ["notes", "finance"], required: true },
  expense: {
    type: Number,
    required: function () {
      return this.noteType === "finance";
    },
  },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);
