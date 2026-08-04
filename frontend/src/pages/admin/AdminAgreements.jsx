import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FiSearch, FiEye, FiTrash2, FiFileText } from "react-icons/fi";

import { getAllAgreements, deleteAgreementByAdmin } from "../../api/adminApi";

const AdminAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadAgreements = async () => {
    try {
      setLoading(true);

      const res = await getAllAgreements();
      const agreementsData = res.data || [];

      setAgreements(agreementsData);
      setFiltered(agreementsData);
    } catch (err) {
      console.error(err);
      alert("Unable to load agreements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgreements();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      agreements.filter((agreement) => {
        const client =
          agreement.client?.fullName || agreement.client?.user?.fullName || "";

        const worker =
          agreement.worker?.user?.fullName || agreement.worker?.fullName || "";

        return (
          client.toLowerCase().includes(keyword) ||
          worker.toLowerCase().includes(keyword) ||
          agreement.status.toLowerCase().includes(keyword)
        );
      }),
    );
  }, [search, agreements]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this agreement?")) return;

    try {
      await deleteAgreementByAdmin(id);

      loadAgreements();
    } catch (err) {
      console.error(err);

      alert("Delete failed.");
    }
  };

  const badge = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-blue-100 text-blue-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-bold">Loading Agreements...</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Agreements</h1>

          <p className="text-slate-500">Manage all agreements.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow">
        <div className="relative">
          <FiSearch className="absolute left-4 top-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Client</th>

              <th className="px-6 py-4 text-left">Worker</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Created</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  No agreements found.
                </td>
              </tr>
            )}

            {filtered.map((agreement) => (
              <tr key={agreement._id} className="border-t hover:bg-slate-50">
                <td className="px-6 py-5 font-medium">
                  {agreement.client?.fullName ||
                    agreement.client?.user?.fullName}
                </td>

                <td className="px-6 py-5">
                  {agreement.worker?.user?.fullName ||
                    agreement.worker?.fullName}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${badge(agreement.status)}`}
                  >
                    {agreement.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {new Date(agreement.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/admin/agreements/${agreement._id}`}
                      className="rounded-xl bg-blue-100 p-3 text-blue-700 hover:bg-blue-200"
                    >
                      <FiEye />
                    </Link>

                    <button
                      onClick={() => handleDelete(agreement._id)}
                      className="rounded-xl bg-red-100 p-3 text-red-600 hover:bg-red-200"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAgreements;
