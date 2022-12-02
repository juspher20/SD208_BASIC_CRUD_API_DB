import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './notes.model';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

  async addNote(title: string, desc: string) {
    const newNotes = new this.noteModel({
      note_title: title,
      description: desc,
    });
    const result = await newNotes.save();
    return result.id as string;
  }

  async getNotes() {
    const notes = await this.noteModel.find().exec();
    return notes.map((n) => ({
      id: n.id,
      note_title: n.note_title,
      description: n.description,
    }));
  }

  async getSingleNote(noteId: string) {
    const note = await this.findNote(noteId);
    return {
      id: note.id,
      note_title: note.note_title,
      description: note.description,
    };
  }

  async updateNote(noteId: string, title: string, desc: string) {
    const updatedNote = await this.findNote(noteId);
    if (title) {
      updatedNote.note_title = title;
    }
    if (desc) {
      updatedNote.description = desc;
    }
    updatedNote.save();
  }

  async deleteNote(noteId: string) {
    const result = await this.noteModel.deleteOne({ _id: noteId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find note');
    }
  }

  private async findNote(id: string): Promise<Note> {
    let note;
    try {
      note = await this.noteModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find notes.');
    }
    if (!note) {
      throw new NotFoundException('Could not find notes.');
    }
    return note;
  }
}
