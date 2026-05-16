import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto p-10 bg-white rounded-xl shadow-md mt-10 text-gray-800">
      <h2 className="text-3xl font-bold text-[#0A2540] mb-4 uppercase">Contact Our Team</h2>
      <p className="mb-6 text-gray-600">Have suggestions, questions, or updates regarding our travel metrics? Shoot us a message!</p>
      <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert('Message queued!'); }}>
        <input type="text" placeholder="Your Name" className="border p-2 rounded bg-white" required />
        <input type="email" placeholder="Your Email Address" className="border p-2 rounded bg-white" required />
        <textarea placeholder="Write your inquiry here..." className="border p-2 rounded h-32 bg-white" required />
        <button type="submit" className="bg-[#0A2540] text-white font-bold py-2 rounded uppercase tracking-wider hover:opacity-90">
          Send Message
        </button>
      </form>
    </div>
  );
}