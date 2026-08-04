import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { useState } from "react";
import { sendContactMessage } from "../../api/contactApi";

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContactMessage(form);

      alert("Message sent successfully!");

      setForm({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send");
    }
  };
  return (
    <div>
      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Contact Us
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-slate-900">
            We'd Love to
            <span className="text-blue-600"> Hear From You</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Whether you have a question, need support, or want to partner with
            Sagau, our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          {/* Contact Info */}

          <div>
            <h2 className="text-3xl font-bold text-slate-900">Get In Touch</h2>

            <p className="mt-4 leading-8 text-slate-600">
              We're always happy to answer your questions and help you get the
              most out of Sagau.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="rounded-xl bg-blue-100 p-3">
                  <FiMail className="text-2xl text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">Email</h3>
                  <p className="mt-1 text-slate-600">support@sagau.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="rounded-xl bg-blue-100 p-3">
                  <FiPhone className="text-2xl text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">Phone</h3>
                  <p className="mt-1 text-slate-600">+977 98XXXXXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="rounded-xl bg-blue-100 p-3">
                  <FiMapPin className="text-2xl text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">Location</h3>
                  <p className="mt-1 text-slate-600">Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="rounded-xl bg-blue-100 p-3">
                  <FiClock className="text-2xl text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Support Hours
                  </h3>
                  <p className="mt-1 text-slate-600">Sunday – Friday</p>
                  <p className="text-slate-600">9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-slate-900">
              Send a Message
            </h2>

            <p className="mt-3 text-slate-600">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Message
                </label>

                <textarea
                  rows="6"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Join Sagau today and connect with trusted professionals or find your
            next opportunity.
          </p>

          <Link
            to="/auth/register"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:-translate-y-1"
          >
            Create Free Account
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
