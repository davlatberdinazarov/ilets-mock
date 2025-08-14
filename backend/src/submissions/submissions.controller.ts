import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { AnswerPayload } from '../common/types';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly service: SubmissionsService) {}

  @Post()
  submit(@Body('answers') answers: AnswerPayload[]) {
    return this.service.submit(answers);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    console.log(id);
    return this.service.getOne(id);
  }
}