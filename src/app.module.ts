import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    NotesModule,
    MongooseModule.forRoot(
      'mongodb+srv://codewithjuspher:Y4FJLnOEXwXSbJz3@cluster0.whwvrpc.mongodb.net/nestjsdb?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
