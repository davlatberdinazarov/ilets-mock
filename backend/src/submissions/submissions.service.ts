import { Injectable, BadRequestException } from '@nestjs/common';
import { AnswerPayload, SubmissionResult } from '../common/types';
import { QuestionsService } from '../questions/questions.service';
import { randomUUID } from 'crypto';

@Injectable()
export class SubmissionsService {
  private results: SubmissionResult[] = [];
  constructor(private readonly questions: QuestionsService) {}

  submit(answers: AnswerPayload[]): SubmissionResult {
    const all = this.questions.findAll();
    if (!answers || answers.length === 0) throw new BadRequestException('answers required');

    const details = answers.map((a) => {
      const q = all.find((x) => x.id === a.questionId);
      if (!q) throw new BadRequestException(`Unknown questionId: ${a.questionId}`);
      const correct = q.correctAnswer === a.selectedIndex;
      return {
        questionId: a.questionId,
        correct,
        correctIndex: q.correctAnswer,
        selectedIndex: a.selectedIndex,
      };
    });

    const score = details.filter((d) => d.correct).length;
    const result: SubmissionResult = {
      submissionId: randomUUID(),
      score,
      total: all.length,
      details,
    };
    this.results.push(result);
    return result;
  }

  getOne(id: string) {
    return this.results.find((r) => r.submissionId === id) ?? null;
  }
}