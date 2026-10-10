import '../styles/GeneralInfo.css'
import { useState } from 'react'


function GeneralInfo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [edit, setEdit] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    setEdit(false);
  }

  if (edit) {
    return (
      <form onSubmit={handleSubmit}>
        <section className="cv-section">
          <h2>General information</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </section>
      </form>
    )
  }

  return (
    <section className="cv-section">
      <h2>General information</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <button onClick={() => setEdit(true)}>Edit</button>
    </section>
  )
}

export default GeneralInfo
