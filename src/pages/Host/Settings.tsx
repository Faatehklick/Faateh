import { HostLayout } from "../../layouts/HostLayout";

export default function Settings() {
  return (
    <HostLayout>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 text-xs max-w-4xl mx-auto">
        <div>
          <h2 className="text-base font-bold text-gray-900">Settings</h2>
          <p className="text-gray-400">Manage your hotel settings and preferences.</p>
        </div>

        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Hotel Name</label>
            <input type="text" defaultValue="Faateh Bay Resort" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">City</label>
            <input type="text" defaultValue="Mogadishu" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600" />
          </div>
          <button className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl shadow hover:bg-blue-700 transition">Save Changes</button>
        </div>
      </div>
    </HostLayout>
  );
}