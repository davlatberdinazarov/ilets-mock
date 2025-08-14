import { api } from './axiosClient';

export async function submitAnswers(answers) {
  // answers: [{questionId, selectedIndex}]
  const { data } = await api.post('/submissions', { answers });
  return data; // { submissionId, score, total, details }
}