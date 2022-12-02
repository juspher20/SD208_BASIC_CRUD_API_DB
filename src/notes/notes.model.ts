import * as mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema({
  note_title: { type: String, required: true },
  description: { type: String, required: true },
});
export interface Note extends mongoose.Document {
  id: string;
  note_title: string;
  description: string;
}
