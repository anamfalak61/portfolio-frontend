import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("Please fill all fields");
      setSuccess(false);
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address");
      setSuccess(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const recipientEmail = "anamfalak61@gmail.com";
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipientEmail
    )}&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");

    setLoading(false);
    setSuccess(true);
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#12121a] border border-gray-800 rounded-2xl p-6 space-y-4"
    >
      {error && (
        <p className="text-red-400 text-sm">
          {error}
        </p>
      )}

      {success && (
        <p className="text-emerald-400 text-sm">
          Gmail compose opened with your message.
        </p>
      )}

      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full bg-[#1e1e2a] border border-gray-700 rounded-lg px-4 py-3 text-white"
      />

      <input
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="w-full bg-[#1e1e2a] border border-gray-700 rounded-lg px-4 py-3 text-white"
      />

      <textarea
        placeholder="Your Message"
        rows="5"
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
        className="w-full bg-[#1e1e2a] border border-gray-700 rounded-lg px-4 py-3 text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-400 text-black font-semibold py-3 rounded-lg"
      >
        {loading ? "Sending..." : "Send Message"}

      </button>
    </form>
  );
}

export default Contact;