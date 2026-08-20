import { useState } from "react";

function CitizenLogin({ onLogin, onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://civicflow-production-8596.up.railway.app/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed."
                );
            }

            if (data.user.role !== "citizen") {
                throw new Error(
                    "Please use the admin login for administrator accounts."
                );
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            onLogin(data.user);

        } catch (error) {
            console.error("Citizen login error:", error);
            setError(error.message || "Unable to login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="admin-login-form"
            onSubmit={handleLogin}
        >
            <h2>Citizen Login</h2>

            <p className="admin-login-subtitle">
                Login to report and track your civic complaints.
            </p>

            <label>Email</label>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                }}
            />

            <label>Password</label>

            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                }}
            />

            {error && (
                <p className="admin-login-error">
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="primary-btn"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <p
                style={{
                    marginTop: "18px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#64748b",
                }}
            >
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={onRegister}
                    style={{
                        border: "none",
                        background: "none",
                        color: "#2563eb",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Create one
                </button>
            </p>
        </form>
    );
}

export default CitizenLogin;