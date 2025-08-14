import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestionsForTest } from '../api/questionsApi';
import { submitAnswers } from '../api/submissionsApi';
import QuestionCard from '../components/QuestionCard.jsx';

export default function TestPage() {
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { [qId]: index }
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestionsForTest().then((qs) => { setQuestions(qs); setLoading(false); });
  }, []);

  const onSelect = (qId, idx) => setAnswers((s) => ({ ...s, [qId]: idx }));

  const payload = useMemo(() => Object.entries(answers).map(([questionId, selectedIndex]) => ({ questionId, selectedIndex })), [answers]);

  const submit = useCallback(async () => {
    try {
      const result = await submitAnswers(payload);
      nav('/result', { state: result });
    } catch (e) {
      alert('Submit error');
    }
  }, [payload, nav]);

  if (loading) return <div>Loading…</div>;
  if (!questions.length) return <div>No questions found.</div>;

  const q = questions[active];
  const selected = answers[q.id];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>IELTS Mini Test</h3>
        <div style={{ fontWeight: 600 }}>Questions: {active + 1} / {questions.length}</div>
      </div>

      <div className="nav">
        {questions.map((_, i) => (
          <button key={i} className={i === active ? 'active' : ''} onClick={() => setActive(i)}>
            {i + 1}
          </button>
        ))}
      </div>

      <QuestionCard question={q} selected={selected} onSelect={(idx) => onSelect(q.id, idx)} />

      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn secondary" onClick={() => setActive((a) => Math.max(0, a - 1))}>Prev</button>
        <button className="btn secondary" onClick={() => setActive((a) => Math.min(questions.length - 1, a + 1))}>Next</button>
        <button className="btn" onClick={submit}>Submit</button>
      </div>
    </div>
  );
}