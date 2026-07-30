import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Shield } from "lucide-react";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ASSIGNABLE_MENUS,
  HOME_PAGE_SECTION_GROUP,
  HOME_PAGE_SECTION_MENU_IDS,
  ROLES,
  STANDALONE_ASSIGNABLE_MENUS,
} from "../data/permissions";
import type { PublicAdminUser } from "../utils/adminStorage";
import { apiRequest } from "../../api/client";
import AdminTable from "../components/AdminTable";
import {
  emailKeyupHint,
  isIndianPhone,
  isValidEmail,
  phoneKeyupHint,
  sanitizePhoneInput,
} from "../../utils/validation";

export default function ManageAdmins() {
  const { isSuperAdmin } = useAuth();
  const [users, setUsers] = useState<PublicAdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [phoneHint, setPhoneHint] = useState<string | null>(null);
  const [emailHint, setEmailHint] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    permissions: ["dashboard", "projects"] as string[],
  });

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await apiRequest<{ data: PublicAdminUser[] }>("/admin/users");
      setUsers(res.data.filter((u) => u.role === ROLES.ADMIN));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuperAdmin) loadUsers();
  }, [isSuperAdmin]);

  if (!isSuperAdmin) return <Navigate to="/admin" replace />;

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "ENV_ADMIN_PASSWORD",
      permissions: ["dashboard", "projects"],
    });
    setModalOpen(true);
  };

  const openEdit = (row: PublicAdminUser) => {
    setEditing(row.id);
    setForm({
      name: row.name,
      email: row.email,
      phone: row.phone || "",
      password: "",
      permissions: row.permissions || [],
    });
    setModalOpen(true);
  };

  const togglePermission = (menuId: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(menuId)
        ? prev.permissions.filter((p) => p !== menuId)
        : [...prev.permissions, menuId],
    }));
  };

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(form.email)) {
      toast.error("Enter a valid email address");
      return;
    }
    if (
      form.phone.trim() &&
      !isIndianPhone(form.phone, { allowLandline: true })
    ) {
      toast.error("Enter a valid Indian mobile or landline number");
      return;
    }
    if (form.permissions.length === 0) {
      toast.error("Select at least one menu permission");
      return;
    }

    try {
      if (editing) {
        await apiRequest(`/admin/users/${editing}`, {
          method: "PUT",
          body: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            role: "admin",
            permissions: form.permissions,
            ...(form.password ? { password: form.password } : {}),
          },
        });
        toast.success("Admin updated");
      } else {
        await apiRequest("/admin/users", {
          method: "POST",
          body: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password || "ENV_ADMIN_PASSWORD",
            role: "admin",
            permissions: form.permissions,
          },
        });
        toast.success("Admin created");
      }
      setModalOpen(false);
      await loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
  };

  const handleDelete = async (row: PublicAdminUser) => {
    if (!confirm(`Delete admin ${row.email}?`)) return;
    try {
      await apiRequest(`/admin/users/${row.id}`, { method: "DELETE" });
      toast.success("Admin deleted");
      await loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  if (loading) return <p className="text-[#8A8177]">Loading admins...</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold admin-page-title flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#C4973B]" /> Admin Users
          </h1>
          <p className="text-sm admin-card-muted mt-1">
            Manage admin accounts and menu permissions (saved in database).
          </p>
        </div>
        <motion.button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl admin-btn-gold font-medium"
          whileHover={{ scale: 1.03 }}
        >
          <Plus className="w-4 h-4" /> Add Admin
        </motion.button>
      </div>

      <AdminTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          {
            key: "permissions",
            label: "Menus",
            render: (row) =>
              (row.permissions || []).filter((p) => p !== "*").join(", ") || "—",
          },
        ]}
        data={users}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg p-8 rounded-2xl admin-card my-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#2A211C]">
                  {editing ? "Edit Admin" : "Create Admin"}
                </h2>
                <button type="button" onClick={() => setModalOpen(false)}>
                  <X className="text-[#8A8177]" />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-[#6E655C]">Name</label>
                  <input
                    required
                    className="w-full px-4 py-2.5 rounded-lg admin-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-[#6E655C]">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg admin-input"
                    value={form.email}
                    onChange={(e) => {
                      const email = e.target.value;
                      setForm({ ...form, email });
                      setEmailHint(emailKeyupHint(email));
                    }}
                    onKeyUp={(e) =>
                      setEmailHint(
                        emailKeyupHint((e.target as HTMLInputElement).value),
                      )
                    }
                  />
                  <p
                    className={`mt-1 text-xs ${
                      emailHint ? "text-red-600" : "text-[#8A8177]"
                    }`}
                  >
                    {emailHint || "Valid format: name@domain.com"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-[#6E655C]">Phone</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    className="w-full px-4 py-2.5 rounded-lg admin-input"
                    value={form.phone}
                    onChange={(e) => {
                      const phone = sanitizePhoneInput(e.target.value);
                      setForm({ ...form, phone });
                      setPhoneHint(
                        phone ? phoneKeyupHint(phone, { allowLandline: true }) : null,
                      );
                    }}
                    onKeyUp={(e) =>
                      setPhoneHint(
                        phoneKeyupHint(
                          (e.target as HTMLInputElement).value,
                          { allowLandline: true },
                        ),
                      )
                    }
                  />
                  <p
                    className={`mt-1 text-xs ${
                      phoneHint ? "text-red-600" : "text-[#8A8177]"
                    }`}
                  >
                    {phoneHint ||
                      "Mobile 10 digits / landline 11 digits (0…). Digits only."}
                  </p>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-[#6E655C]">
                    Password {editing ? "(leave blank to keep)" : ""}
                  </label>
                  <input
                    type="password"
                    required={!editing}
                    className="w-full px-4 py-2.5 rounded-lg admin-input"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <p className="text-sm mb-2 text-[#6E655C]">Menu Permissions</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {STANDALONE_ASSIGNABLE_MENUS.map((m) => (
                        <label
                          key={m.id}
                          className="flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={form.permissions.includes(m.id)}
                            onChange={() => togglePermission(m.id)}
                            className="accent-amber-500"
                          />
                          {m.label}
                        </label>
                      ))}
                    </div>

                    <div className="rounded-xl border border-[#E8DFD2] bg-[#FAF7F2] p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#8A8177] mb-2">
                        {HOME_PAGE_SECTION_GROUP.label}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {ASSIGNABLE_MENUS.filter((m) =>
                          HOME_PAGE_SECTION_MENU_IDS.includes(m.id),
                        ).map((m) => (
                          <label
                            key={m.id}
                            className="flex items-center gap-2 text-sm cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={form.permissions.includes(m.id)}
                              onChange={() => togglePermission(m.id)}
                              className="accent-amber-500"
                            />
                            {m.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl admin-btn-gold font-medium"
                >
                  Save
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
