import '../styles/Education.css'
import { useState } from 'react'



function Education() {
  const [entries, setEntries] = useState([
    {
      id: crypto.randomUUID(),
      school: 'The Odin Project',
      degree: 'Full Stack JavaScript',
      date: '2025-Ongoing',
      edit: false,
    },
  ]);
  function addEntry() {
    const newEntry = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      date: '',
      edit: true,
    };
    setEntries([...entries, newEntry]);
  }

  function handleSubmit(e, id) {
    e.preventDefault();
    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, edit: false };
      }
      return entry;
    });
    setEntries(updatedEntries);
  }

  function handleEdit(id) {
    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, edit: true };
      }
      return entry;
    });
    setEntries(updatedEntries);
  }

  function handleDelete(id) {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  }

  function handleChange(e, id) {
    const { name, value } = e.target;
    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, [name]: value };
      }
      return entry;
    });
    setEntries(updatedEntries);
  }

  return (
    <section className="cv-section">
      <h2>Education</h2>
      {entries.map((entry) =>
        entry.edit ? (
          <form key={entry.id} onSubmit={(e) => handleSubmit(e, entry.id)}>
            <div className="form-group">
              <label htmlFor={`school-${entry.id}`}>School</label>
              <input
                type="text"
                id={`school-${entry.id}`}
                name="school"
                value={entry.school}
                onChange={(e) => handleChange(e, entry.id)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`degree-${entry.id}`}>Degree</label>
              <input
                type="text"
                id={`degree-${entry.id}`}
                name="degree"
                value={entry.degree}
                onChange={(e) => handleChange(e, entry.id)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`date-${entry.id}`}>Date</label>
              <input
                type="text"
                id={`date-${entry.id}`}
                name="date"
                value={entry.date}
                onChange={(e) => handleChange(e, entry.id)}
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => handleDelete(entry.id)}>Delete</button>
          </form>
        ) : (
          <div key={entry.id}>
            <p><strong>School:</strong> {entry.school}</p>
            <p><strong>Degree:</strong> {entry.degree}</p>
            <p><strong>Date:</strong> {entry.date}</p>
            <button type="button" onClick={() => handleEdit(entry.id)}>Edit</button>
            <button type="button" onClick={() => handleDelete(entry.id)}>Delete</button>
          </div>
        )
      )}
      <button type="button" onClick={addEntry}>Add Entry</button>
    </section>
  )
}

export default Education
