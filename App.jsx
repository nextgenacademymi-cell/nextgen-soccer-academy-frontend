import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm.jsx';
export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold">NextGen Soccer Academy</h1>
            <p className="text-sm text-gray-600">Loveless Built. Next Generation Made.</p>
          </div>
          <nav className="flex gap-4">
            <Link to="/schedule" className="text-sm">Schedule</Link>
            <a href="#contact" className="text-sm">Contact</a>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6">
        <section className="py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Build confidence. Master the ball. Own the game.</h2>
            <p className="mt-4 text-gray-700">NextGen Soccer Academy offers focused training for ages 3-18. Small groups, private lessons, and goalkeeper training.</p>
            <div className="mt-6">
              <a href="/schedule" className="px-5 py-3 bg-blue-600 text-white rounded-lg">Request Session</a>
            </div>
          </div>
          <div>
            <img src="/hero-soccer.jpg" alt="training" className="w-full h-64 object-cover rounded-lg shadow" />
          </div>
        </section>
        <section id="contact" className="py-10">
          <h3 className="text-2xl font-bold">Contact & Bookings</h3>
          <p className="text-gray-600 mt-2">Have questions or want to request a session? Use the form below.</p>
          <div className="mt-6">
            <ContactForm/>
          </div>
        </section>
      </main>
    </div>
  );
}