import React, { useEffect, useMemo, useState } from 'react';
import { getQuestionsAdmin, createQuestion, updateQuestion, deleteQuestion } from '../api/questionsApi';

export default function AdminPage() {
  const empty = useMemo(() => ({ text: '', options: ['', '', '', ''], correctAnswer: 0 }), []);
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getQuestionsAdmin();
    setQuestions(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function onChangeOption(i, value) {
    setForm((s) => ({ ...s, options: s.options.map((o, idx) => (idx === i ? value : o)) }));
  }

  function startEdit(q) {
    setEditingId(q.id);
    setForm({ text: q.text, options: q.options, correctAnswer: q.correctAnswer });
  }

  function cancel() {
    setEditingId(null);
    setForm(empty);
  }

  async function save(e) {
    e.preventDefault();
    if (editingId) {
      await updateQuestion(editingId, form);
    } else {
      await createQuestion(form);
    }
    await load();
    cancel();
  }

  async function remove(id) {
    if (confirm('O\'chirishni tasdiqlaysizmi?')) {
      await deleteQuestion(id);
      await load();
    }
  }

  return (
    <div>
      <h3>Admin – Questions</h3>

      <form onSubmit={save} style={{ marginBottom: 16 }}>
        <input className="input" placeholder="Savol matni" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
        <div className="row">
          {form.options.map((opt, i) => (
            <input key={i} className="input" placeholder={`Variant ${i + 1}`} value={opt} onChange={(e) => onChangeOption(i, e.target.value)} />
          ))}
        </div>
        <select className="select" value={form.correctAnswer} onChange={(e) => setForm({ ...form, correctAnswer: Number(e.target.value) })}>
          {form.options.map((_, i) => (
            <option key={i} value={i}>To'g'ri javob: {i + 1}</option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" type="submit">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
          {editingId && <button type="button" className="btn secondary" onClick={cancel}>Bekor qilish</button>}
        </div>
      </form>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Savol</th>
              <th>Variantlar</th>
              <th>To'g'ri</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, i) => (
              <tr key={q.id}>
                <td>{i + 1}</td>
                <td>{q.text}</td>
                <td>{q.options.join(', ')}</td>
                <td>{String.fromCharCode(65 + q.correctAnswer)}</td>
                <td>
                  <button className="btn secondary" onClick={() => startEdit(q)} style={{ marginRight: 8 }}>Tahrirlash</button>
                  <button className="btn" style={{ background: '#ef4444' }} onClick={() => remove(q.id)}>O'chirish</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}