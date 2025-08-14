import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [QuestionsModule, SubmissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
