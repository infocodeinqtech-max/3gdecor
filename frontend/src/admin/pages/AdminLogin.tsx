import { useCallback, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../data/permissions";
import { emailKeyupHint, isValidEmail } from "../../utils/validation";
import logo from "../../assets/images/3GDecoLogo-2.png";

const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCaptcha(length = 5): string {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  }
  return out;
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailHint, setEmailHint] = useState<string | null>(null);
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const refreshCaptcha = useCallback(() => {
    setCaptchaCode(generateCaptcha());
    setCaptchaInput("");
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Enter a valid email address");
      return;
    }
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      toast.error("Captcha does not match. Please try again.");
      refreshCaptcha();
      return;
    }
    setSubmitting(true);
    const result = await login(email.trim(), password);
    setSubmitting(false);

    if (result.success) {
      const roleLabel =
        result.user?.role === ROLES.SUPERADMIN ? "Super Admin" : "Admin";
      toast.success(`Welcome, ${roleLabel}!`);
      navigate("/admin", { replace: true });
    } else {
      toast.error(result.error || "Could not sign in");
      refreshCaptcha();
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
            <label className="block text-sm mb-2 text-[#6E655C]">
              Email / User ID
            </label>
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl admin-input"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#8A8177] hover:text-[#C4973B] hover:bg-[#FAF7F2] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-[18px] h-[18px]" />
                ) : (
                  <Eye className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#6E655C]">Captcha</label>
            <div className="flex items-stretch gap-2 mb-2">
              <div
                className="flex-1 flex items-center justify-center select-none rounded-xl border border-[#E8DFD2] bg-[#FAF7F2] px-3 py-2.5 tracking-[0.35em] font-bold text-lg text-[#2A211C]"
                style={{
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: "0.35em",
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent, transparent 8px, rgba(212,166,75,0.08) 8px, rgba(212,166,75,0.08) 16px)",
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(196,151,59,0.35)",
                  fontStyle: "italic",
                }}
                aria-hidden
              >
                {captchaCode}
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="px-3 rounded-xl border border-[#E8DFD2] text-[#8A8177] hover:text-[#C4973B] hover:border-[#D4A64B]/50 hover:bg-[#FAF7F2] transition-colors"
                aria-label="Refresh captcha"
                title="Refresh captcha"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              required
              autoComplete="off"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-xl admin-input uppercase tracking-widest"
              placeholder="Enter captcha"
              maxLength={8}
              spellCheck={false}
            />
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
