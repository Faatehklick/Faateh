import { useState } from "react";
import toast from "react-hot-toast";
import { HostLayout } from "../../layouts/HostLayout";
import { useHost } from "../../hooks/useHost";
import { getApiErrorMessage } from "../../api/client";
import { firstImage } from "../../utils/helpers";
import type { RoomStatus } from "../../types/room";
import { Plus, Lock, Trash2 } from "lucide-react";

const STATUS_OPTIONS: RoomStatus[] = [
  "AVAILABLE",
  "OCCUPIED",
  "MAINTENANCE",
  "UNAVAILABLE",
];

const STATUS_LABELS: Record<RoomStatus, string> = {
  AVAILABLE: "Available",
  OCCUPIED: "Occupied",
  MAINTENANCE: "Maintenance",
  UNAVAILABLE: "Unavailable",
};

const STATUS_STYLES: Record<RoomStatus, string> = {
  AVAILABLE: "bg-emerald-500 text-white",
  OCCUPIED: "bg-blue-500 text-white",
  MAINTENANCE: "bg-amber-500 text-white",
  UNAVAILABLE: "bg-gray-400 text-white",
};

interface RoomDraft {
  roomNumber: string;
  type: string;
  price: string;
  capacity: string;
  status: RoomStatus;
  imageUrl: string;
}

const emptyDraft = (defaultType: string): RoomDraft => ({
  roomNumber: "",
  type: defaultType,
  price: "",
  capacity: "2",
  status: "AVAILABLE",
  imageUrl: "",
});

export default function Rooms() {
  const { activeHotel, rooms, isVerified, addRoom, removeRoom } = useHost();
  const roomTypes = activeHotel?.roomTypes ?? [];

  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draft, setDraft] = useState<RoomDraft>(emptyDraft(roomTypes[0] ?? ""));

  const locked = !isVerified;

  const handleAdd = async () => {
    if (!draft.roomNumber.trim() || !draft.price.trim()) {
      toast.error("Room number and price are required.");
      return;
    }

    const price = Number(draft.price);
    const capacity = Number(draft.capacity);
    if (Number.isNaN(price) || price <= 0) {
      toast.error("Enter a valid price.");
      return;
    }
    if (Number.isNaN(capacity) || capacity <= 0) {
      toast.error("Enter a valid capacity.");
      return;
    }

    setIsSaving(true);
    try {
      await addRoom({
        roomNumber: draft.roomNumber.trim(),
        type: draft.type,
        price,
        capacity,
        status: draft.status,
        // NOTE: the API expects uploaded File objects for room photos, not a
        // pasted URL. This "Photo URL" field is a placeholder until the form
        // is switched to a real <input type="file"> like Step2Photos uses.
      });
      toast.success("Room published.");
      setDraft(emptyDraft(roomTypes[0] ?? ""));
      setShowForm(false);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not add the room."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async (roomId: string) => {
    try {
      await removeRoom(roomId);
      toast.success("Room removed.");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not remove the room."));
    }
  };

  return (
    <HostLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-gray-900">Rooms</h2>
            <p className="text-xs text-gray-400">Manage your hotel rooms and pricing.</p>
          </div>
          <button
            onClick={() => !locked && setShowForm(true)}
            disabled={locked}
            title={locked ? "Available once your hotel is approved by an admin" : ""}
            className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl text-xs shadow transition ${
              locked ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {locked ? <Lock size={14} /> : <Plus size={16} />} Add New Room
          </button>
        </div>

        {locked && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-xs">
            Room creation unlocks once an admin approves{" "}
            <strong>{activeHotel?.name || "your hotel"}</strong>.
          </div>
        )}

        {!locked && rooms.length === 0 && !showForm && (
          <div className="border border-dashed border-gray-300 rounded-2xl p-10 text-center text-xs text-gray-400">
            No rooms yet. Click "Add New Room" to publish your first room.
          </div>
        )}

        {rooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => {
              const image = firstImage(room.images);
              return (
                <div key={room.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="h-36 w-full relative bg-gray-100">
                    {image && (
                      <img src={image} alt={room.type} className="w-full h-full object-cover" />
                    )}
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLES[room.status]}`}
                    >
                      {STATUS_LABELS[room.status]}
                    </span>
                    <button
                      onClick={() => handleRemove(room.id)}
                      className="absolute top-3 left-3 bg-white/90 p-1.5 rounded-lg text-red-500 hover:bg-white"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="p-4 space-y-2 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-gray-900">{room.type}</span>
                      <span className="text-blue-600 font-mono">{room.roomNumber}</span>
                    </div>
                    <p className="text-gray-400 text-[11px]">
                      {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
                    </p>
                    <p className="text-sm font-extrabold text-gray-900">
                      ${room.price}
                      <span className="text-xs font-normal text-gray-400"> / night</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showForm && !locked && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-gray-900 text-sm">Add a room</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-600 mb-1">Room number</label>
                <input
                  className="w-full border border-gray-200 rounded-lg p-2.5"
                  placeholder="DR-101"
                  value={draft.roomNumber}
                  onChange={(e) => setDraft((d) => ({ ...d, roomNumber: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Room type</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2.5"
                  value={draft.type}
                  onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value }))}
                >
                  {roomTypes.length === 0 && <option value="">No room types declared</option>}
                  {roomTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Price / night ($)</label>
                <input
                  type="number"
                  min="0"
                  className="w-full border border-gray-200 rounded-lg p-2.5"
                  value={draft.price}
                  onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Capacity (guests)</label>
                <input
                  type="number"
                  min="1"
                  className="w-full border border-gray-200 rounded-lg p-2.5"
                  value={draft.capacity}
                  onChange={(e) => setDraft((d) => ({ ...d, capacity: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Status</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2.5"
                  value={draft.status}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, status: e.target.value as RoomStatus }))
                  }
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Photo URL</label>
                <input
                  className="w-full border border-gray-200 rounded-lg p-2.5"
                  value={draft.imageUrl}
                  onChange={(e) => setDraft((d) => ({ ...d, imageUrl: e.target.value }))}
                  placeholder="Not uploaded yet — see note in code"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowForm(false)}
                disabled={isSaving}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={isSaving}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold disabled:opacity-60"
              >
                {isSaving ? "Publishing…" : "Publish room"}
              </button>
            </div>
          </div>
        )}
      </div>
    </HostLayout>
  );
}