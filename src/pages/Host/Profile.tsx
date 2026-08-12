import { HostLayout } from "../../layouts/HostLayout";

export default function Profile() {
  return (
    <HostLayout>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 text-xs max-w-3xl mx-auto">
        <div>
          <h2 className="text-base font-bold text-gray-900">Host Profile</h2>
          <p className="text-gray-400">Manage your personal manager account details.</p>
        </div>
        <div className="flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Ahmed" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h3 className="font-bold text-sm text-gray-900">Ahmed Hassan</h3>
            <p className="text-gray-400">Hotel Manager • Faateh Bay Resort</p>
          </div>
        </div>
      </div>
    </HostLayout>
  );
}