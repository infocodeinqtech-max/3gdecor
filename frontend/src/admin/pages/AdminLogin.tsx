import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Shield, UserCog } from "lucide-react";
import { toast } from "sonner";
import { useAuth, type LoginRole } from "../../context/AuthContext";
import { ROLES } from "../data/permissions";
import { emailKeyupHint, isValidEmail } from "../../utils/validation";
import logo from "../../assets/images/3GDecoLogo-2.png";

const ROLE_OPTIONS: {
  role: LoginRole;
  label: string;
  description: string;
  icon: typeof Shield;
}[] = [
  {
    role: ROLES.SUPERADMIN,
    label: "Super Admin",
    description: "Full access — manage admins, all sections & settings",
    icon: Shield,
  },
  {
    role: ROLES.ADMIN,
    label: "Admin",
    description: "Limited access — assigned sections only",
    icon: UserCog,
  },
];

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<LoginRole>(ROLES.ADMIN);
  const [submitting, setSubmitting] = useState(false);
  const [emailHint, setEmailHint] = useState<string | null>(null);
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Prefill demo credentials by role (seeded DB users)
    if (selectedRole === ROLES.SUPERADMIN) {
      setEmail("super@3gdeco.com");
      setPassword("Super@123");
    } else {
      setEmail("admin@3gdeco.com");
      setPassword("Admin@123");
    }
  }, [selectedRole]);

  const selectRole = (role: LoginRole) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Enter a valid email address");
      return;
    }
    setSubmitting(true);
    const result = await login(email.trim(), password, selectedRole);
    setSubmitting(false);

    if (result.success) {
      toast.success(
        selectedRole === ROLES.SUPERADMIN
          ? "Welcome, Super Admin!"
          : "Welcome, Admin!",
      );
      navigate("/admin", { replace: true });
    } else {
      toast.error(result.error || "Could not sign in");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center admin-login-shell">
        <p className="text-[#8A8177]">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center admin-login-shell relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(212,166,75,0.18), transparent 55%)",
        }}
      />

      <Link
        to="/"
        className="absolute top-6 left-6 text-sm text-[#8A8177] hover:text-[#C4973B] transition-colors"
      >
        ← Back to Website
      </Link>

      <motion.div
        className="relative w-full max-w-md mx-4 p-8 rounded-2xl admin-login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img
          src={logo}
          alt="3G Decorative Group"
          className="h-24 w-auto max-w-[220px] mx-auto mb-4 object-contain"
        />
        <h1
          className="text-2xl font-bold text-center mb-1 text-[#2A211C]"
          style={{ fontFamily: "'Parkinsans', sans-serif" }}
        >
          Admin Login
        </h1>
        <p className="text-center text-[#8A8177] text-sm mb-8">
          Sign in to manage your website
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-2 text-[#6E655C]">Email / User ID</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailHint(emailKeyupHint(e.target.value));
              }}
              onKeyUp={(e) =>
                setEmailHint(
                  emailKeyupHint((e.target as HTMLInputElement).value),
                )
              }
              className="w-full px-4 py-3 rounded-xl admin-input"
              placeholder="admin@3gdeco.com"
            />
            {emailHint && (
              <p className="mt-1.5 text-[11px] text-red-600">{emailHint}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#6E655C]">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl admin-input"
              placeholder="Password"
            />
            <p className="mt-1.5 text-[11px] text-[#8A8177]">
              Demo: Super Admin → Super@123 · Admin → Admin@123
            </p>
          </div>

          <div>
            <p className="block text-sm mb-2 text-[#6E655C]">Login as</p>
            <div className="space-y-2">
              {ROLE_OPTIONS.map((option) => {
                const Icon = option.icon;
                const active = selectedRole === option.role;
                return (
                  <button
                    key={option.role}
                    type="button"
                    onClick={() => selectRole(option.role)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      active
                        ? "border-[#D4A64B] bg-amber-50/80 shadow-sm"
                        : "border-[#E8DFD2] hover:border-[#D4A64B]/40 hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          active
                            ? "bg-[#D4A64B]/20 text-[#8a5a12]"
                            : "bg-[#F5F1EA] text-[#8A8177]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#2A211C]">{option.label}</p>
                        <p className="text-xs text-[#8A8177]">{option.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl admin-btn-gold font-semibold tracking-wide disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
