import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from '../common/types';
import { randomUUID } from 'crypto';
import { seedQuestions } from './seed';

@Injectable()
export class QuestionsService {
  private questions: Question[] = seedQuestions();

  findAll(): Question[] {
    return this.questions;
  }

  findOne(id: string): Question {
    const q = this.questions.find((x) => String(x.id) === id);
    if (!q) throw new NotFoundException('Question not found');
    return q;
  }

  create(dto: CreateQuestionDto): Question {
    const q: Question = { id: randomUUID(), ...dto };
    this.questions.push(q);
    return q;
  }

  update(id: string, dto: UpdateQuestionDto): Question {
    const idx = this.questions.findIndex((x) => x.id === id);
    if (idx === -1) throw new NotFoundException('Question not found');
    this.questions[idx] = { ...this.questions[idx], ...dto };
    return this.questions[idx];
  }

  remove(id: string): void {
    const before = this.questions.length;
    this.questions = this.questions.filter((x) => x.id !== id);
    if (this.questions.length === before) throw new NotFoundException('Question not found');
  }
}