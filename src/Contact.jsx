import { useState } from "react";

function Contact({ API_URL }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Success message handle karne k liye

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
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        alert(data.message || "Message sent successfully!");
        
        // Form khali karne ke liye
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setError(data.message || "Failed to send message");
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
        <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>
      )}
      
      {success && (
        <p className="text-emerald-400 text-sm bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
          Message sent successfully & Email triggered!
        </p>
      )}

      {/* Name */}
      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full bg-[#1e1e2a] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="w-full bg-[#1e1e2a] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
      />

      {/* Message */}
      <textarea
        placeholder="Your Message"
        rows="5"
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
        className="w-full bg-[#1e1e2a] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 resize-none"
      />

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-400 text-[#0a0a0f] font-semibold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default Contact;