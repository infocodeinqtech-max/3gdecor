import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const { changePassword } = useAuth();
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [saving, setSaving] = useState(false);

  const reset = () => setForm({ current: "", next: "", confirm: "" });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.next !== form.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    setSaving(true);
    const result = await changePassword(form.current, form.next);
    setSaving(false);
    if (result.success) {
      toast.success("Password updated successfully");
      handleClose();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center admin-modal-overlay p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md p-8 rounded-2xl admin-card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#2A211C]">
                Change Password
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-[#8A8177] hover:text-[#332C26]"
              >
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-[#6E655C]">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={form.current}
                  onChange={(e) =>
                    setForm({ ...form, current: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg admin-input"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-[#6E655C]">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.next}
                  onChange={(e) => setForm({ ...form, next: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg admin-input"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-[#6E655C]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.confirm}
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg admin-input"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl admin-btn-gold font-medium disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update Password"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
