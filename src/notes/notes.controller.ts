import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async addNote(
    @Body('note_title') noteTitle: string,
    @Body('description') noteDesc: string,
  ) {
    const generatedId = await this.notesService.addNote(noteTitle, noteDesc);
    return { id: generatedId };
  }

  @Get()
  async getAllNotes() {
    const products = await this.notesService.getNotes();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') noteId: string) {
    return this.notesService.getSingleNote(noteId);
  }

  @Patch(':id')
  async updateNote(
    @Param('id') noteId: string,
    @Body('note_title') noteTitle: string,
    @Body('description') noteDesc: string,
  ) {
    await this.notesService.updateNote(noteId, noteTitle, noteDesc);
    return null;
  }

  @Delete(':id')
  async removeNote(@Param('id') noteId: string) {
    await this.notesService.deleteNote(noteId);
    return null;
  }
}
