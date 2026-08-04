import { useEffect, useState } from "react";
import { FiMail, FiTrash2, FiEye, FiClock, FiRefreshCw } from "react-icons/fi";

import {
  getAllMessages,
  markMessageRead,
  deleteMessage,
} from "../../api/adminApi";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setLoading(true);

      const res = await getAllMessages();

      setMessages(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleRead = async (id) => {
    try {
      await markMessageRead(id);

      loadMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await deleteMessage(id);

      loadMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Contact Messages
          </h1>

          <p className="text-slate-500">Messages submitted from Contact page</p>
        </div>

        <button
          onClick={loadMessages}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="rounded-xl bg-white p-12 text-center shadow">
          Loading...
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow">
          <FiMail className="mx-auto mb-4 text-5xl text-slate-400" />

          <h2 className="text-xl font-semibold">No Messages Found</h2>
        </div>
      ) : (
        <div className="space-y-5">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`rounded-xl border bg-white p-6 shadow transition ${
                message.status === "UNREAD"
                  ? "border-blue-500"
                  : "border-slate-200"
              }`}
            >
              {/* Header */}

              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-800">
                      {message.fullName}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        message.status === "UNREAD"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {message.status}
                    </span>
                  </div>

                  <p className="mt-1 text-slate-600">{message.email}</p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <FiClock />

                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  {message.status === "UNREAD" && (
                    <button
                      onClick={() => handleRead(message._id)}
                      className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      <FiEye />
                      Mark Read
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(message._id)}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>

              {/* Subject */}

              <div className="mt-6">
                <h3 className="font-semibold text-slate-700">Subject</h3>

                <p className="mt-2 rounded-lg bg-slate-100 p-3 text-slate-700">
                  {message.subject}
                </p>
              </div>

              {/* Message */}

              <div className="mt-6">
                <h3 className="font-semibold text-slate-700">Message</h3>

                <div className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 leading-7 text-slate-700">
                  {message.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
