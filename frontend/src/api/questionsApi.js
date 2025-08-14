import { api } from './axiosClient';

// Admin: get full questions including correctAnswer
export async function getQuestionsAdmin() {
  const { data } = await api.get('/questions');
  return data;
}

export async function createQuestion(payload) {
  const { data } = await api.post('/questions', payload);
  return data;
}

export async function updateQuestion(id, payload) {
  const { data } = await api.patch(`/questions/${id}`, payload);
  return data;
}

export async function deleteQuestion(id) {
  await api.delete(`/questions/${id}`);
}

// Test UI: strip correctAnswer
export async function getQuestionsForTest() {
  const { data } = await api.get('/questions');
  return data.map(({ correctAnswer, ...rest }) => rest);
}