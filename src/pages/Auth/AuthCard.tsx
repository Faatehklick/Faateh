import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../componens/common/Button";
import Input from "../../componens/common/Input";

import { getApiErrorMessage } from "../../api/client";
import { useAuth } from "../../hooks/useAuth";
import {
  isValidEmail,
  isValidPassword,
  passwordProblems,
} from "../../utils/validators";

interface AuthCardProps {
  mode: "signin" | "register";
}

const AuthCard = ({ mode }: AuthCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated } = useAuth();

  const [active, setActive] = useState(mode === "register");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Where to land after a successful sign-in. Set by ProtectedRoute when it
  // bounces someone away from a page that needs auth.
  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? "/";

  // login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // register fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setActive(mode === "register"), 30);
    return () => clearTimeout(timer);
  }, [mode]);

  // Already signed in? Don't show the form at all.
  useEffect(() => {
    if (isAuthenticated) navigate(redirectTo, { replace: true });
  }, [isAuthenticated, navigate, redirectTo]);

  const goTo = (path: string, nextActive: boolean) => {
    setActive(nextActive);
    setTimeout(() => navigate(path), 350);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await login(email.trim(), password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);

      // Admins and hosts go straight to their dashboards unless they were
      // deep-linked somewhere specific.
      if (redirectTo !== "/") navigate(redirectTo, { replace: true });
      else if (user.role === "ADMIN") navigate("/admin", { replace: true });
      else if (user.role === "HOST") navigate("/host/dashboard", { replace: true });
      else navigate("/", { replace: true });
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Invalid email or password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fullName = `${firstName} ${lastName}`.trim();
    if (!fullName) {
      toast.error("Please enter your name.");
      return;
    }
    if (!isValidEmail(regEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!isValidPassword(regPassword)) {
      toast.error(`Password needs: ${passwordProblems(regPassword).join(", ")}`);
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await register({
        name: fullName,
        email: regEmail.trim(),
        password: regPassword,
        phone: phone.trim() || undefined,
      });

      if (user) {
        // Backend auto-issued a token — the user is already signed in.
        toast.success("Account created. You're signed in!");
        navigate(redirectTo, { replace: true });
      } else {
        toast.success("Account created. Please sign in.");
        navigate("/login", { state: { from: redirectTo } });
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not create your account."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-20 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.35), transparent 45%), radial-gradient(circle at 80% 75%, rgba(37,99,235,0.25), transparent 45%)",
        backgroundColor: "#0c1c30",
      }}
    >
      <div className="relative w-full max-w-4xl min-h-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 mt-16 mb-16">
        {/* LOGIN */}
        <div className="flex flex-col justify-center px-8 sm:px-12 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-8">Welcome back to Faateh.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="border border-gray-200 rounded-lg">
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="border border-gray-200 rounded-lg">
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6 md:hidden">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => goTo("/register", true)}
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </button>
          </p>
        </div>

        {/* REGISTER */}
        <div className="flex flex-col justify-center px-8 sm:px-12 py-10 overflow-y-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Register</h2>
          <p className="text-sm text-gray-500 mb-6">Start booking with Faateh.</p>

          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                <div className="border border-gray-200 rounded-lg">
                  <Input
                    type="text"
                    autoComplete="given-name"
                    placeholder="Amina"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                <div className="border border-gray-200 rounded-lg">
                  <Input
                    type="text"
                    autoComplete="family-name"
                    placeholder="Hassan"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="border border-gray-200 rounded-lg">
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
              <div className="border border-gray-200 rounded-lg">
                <Input
                  type="tel"
                  autoComplete="tel"
                  placeholder="+252 123 456 789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="border border-gray-200 rounded-lg">
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="********"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Password requires: 8 characters, uppercase, lowercase, number, and a special character.
            </p>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account…" : "Register"}
            </Button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6 md:hidden">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => goTo("/login", false)}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* SLIDER PANEL */}
        <div
          className={`hidden md:flex absolute top-0 h-full w-1/2 flex-col items-center justify-center text-center px-10 text-slate-800 transition-transform duration-500 ease-in-out bg-gradient-to-br from-blue-200 to-blue-400 ${
            active ? "translate-x-full rounded-l-[80px]" : "translate-x-0 rounded-r-[80px]"
          }`}
        >
          {active ? (
            <>
              <h3 className="text-2xl font-bold mb-3">Welcome Back!</h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-8">
                Sign in to manage your bookings and continue exploring stays across Somalia.
              </p>
              <button
                type="button"
                onClick={() => goTo("/login", false)}
                className="border border-blue-700 text-blue-800 rounded-lg px-8 py-2.5 text-sm font-semibold hover:bg-blue-700 hover:text-white transition-colors"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-3">New Here?</h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-8">
                Create an account to start booking hotels and houses across Somalia in minutes.
              </p>
              <button
                type="button"
                onClick={() => goTo("/register", true)}
                className="border border-blue-700 text-blue-800 rounded-lg px-8 py-2.5 text-sm font-semibold hover:bg-blue-700 hover:text-white transition-colors"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
