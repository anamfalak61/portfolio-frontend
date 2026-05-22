import { useState } from "react";

// Backend URL
const BACKEND_URL =
  "https://portfolio-backend-seven-amber.vercel.app/api/contact";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      console.error("Frontend Fetch Error:", err);
      setError("Network error. Please try again.");
    }

    setLoading(false);
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
          Message sent successfully!
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