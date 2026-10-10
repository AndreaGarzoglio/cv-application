import '../styles/Experience.css'
import { useState } from 'react'

function Experience() {
  const [entries, setEntries] = useState([
    {
      id: crypto.randomUUID(),
      company: 'Acme Corp',
      position: 'Junior Developer',
      responsibilities: 'Built and maintained web features.',
      dateFrom: '2022-01',
      dateUntil: '2023-06',
      edit: false,
    },
  ]);

  function addEntry() {
    const newEntry = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      responsibilities: '',
      dateFrom: '',
      dateUntil: '',
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
      <h2>Practical experience</h2>
      {entries.map((entry) =>
        entry.edit ? (
          <form key={entry.id} onSubmit={(e) => handleSubmit(e, entry.id)}>
            <div className="form-group">
              <label htmlFor={`company-${entry.id}`}>Company</label>
              <input
                type="text"
                id={`company-${entry.id}`}
                name="company"
                value={entry.company}
                onChange={(e) => handleChange(e, entry.id)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`position-${entry.id}`}>Position</label>
              <input
                type="text"
                id={`position-${entry.id}`}
                name="position"
                value={entry.position}
                onChange={(e) => handleChange(e, entry.id)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`responsibilities-${entry.id}`}>Main responsibilities</label>
              <textarea
                id={`responsibilities-${entry.id}`}
                name="responsibilities"
                value={entry.responsibilities}
                onChange={(e) => handleChange(e, entry.id)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`dateFrom-${entry.id}`}>From</label>
              <input
                type="text"
                id={`dateFrom-${entry.id}`}
                name="dateFrom"
                value={entry.dateFrom}
                onChange={(e) => handleChange(e, entry.id)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`dateUntil-${entry.id}`}>Until</label>
              <input
                type="text"
                id={`dateUntil-${entry.id}`}
                name="dateUntil"
                value={entry.dateUntil}
                onChange={(e) => handleChange(e, entry.id)}
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => handleDelete(entry.id)}>Delete</button>
          </form>
        ) : (
          <div key={entry.id}>
            <p><strong>Company:</strong> {entry.company}</p>
            <p><strong>Position:</strong> {entry.position}</p>
            <p><strong>Responsibilities:</strong> {entry.responsibilities}</p>
            <p><strong>From:</strong> {entry.dateFrom}</p>
            <p><strong>Until:</strong> {entry.dateUntil}</p>
            <button type="button" onClick={() => handleEdit(entry.id)}>Edit</button>
            <button type="button" onClick={() => handleDelete(entry.id)}>Delete</button>
          </div>
        )
      )}
      <button type="button" onClick={addEntry}>Add Entry</button>
    </section>
  )
}

export default Experience
