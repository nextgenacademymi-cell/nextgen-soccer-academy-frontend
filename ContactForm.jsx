import React, {useState} from 'react';
export default function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState(null);
  const change = (e)=> setForm(f=>({...f,[e.target.name]: e.target.value}));
  const submit = async (e)=> {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch((import.meta.env.VITE_API_BASE || 'http://localhost:5000') + '/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)
      });
      if(res.ok) setStatus('sent'); else setStatus('error');
    } catch(err){ setStatus('error') }
  };
  return (
    <form onSubmit={submit} className="max-w-lg">
      <div className="grid gap-3">
        <input name="name" required value={form.name} onChange={change} placeholder="Your name" className="p-3 border rounded" />
        <input name="email" required value={form.email} onChange={change} placeholder="Email" className="p-3 border rounded" />
        <textarea name="message" required value={form.message} onChange={change} placeholder="Message / Booking request" className="p-3 border rounded" rows={4}></textarea>
        <div><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button></div>
        <div className="text-sm mt-2">{status === 'sending' && 'Sending...'}{status === 'sent' && 'Message sent — we will contact you soon.'}{status === 'error' && 'Error sending message.'}</div>
      </div>
    </form>
  );
}