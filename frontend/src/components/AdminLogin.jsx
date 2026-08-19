import { useState } from "react";

function AdminLogin({ onLogin }) {
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
                "http://localhost:5000/api/auth/login",
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

            if (data.user.role !== "admin") {
                throw new Error(
                    "Only administrators can access this dashboard."
                );
            }

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            onLogin();

        } catch (error) {
            console.error("Admin login error:", error);

            setError(
                error.message || "Unable to login."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-overlay">

            <form
                className="admin-login-form"
                onSubmit={handleLogin}
            >

                <h2>Admin Login</h2>

                <p className="admin-login-subtitle">
                    Login to access the CivicFlow admin dashboard.
                </p>

                <label>Email</label>

                <input
                    type="email"
                    placeholder="admin@civicflow.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter password"
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
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>

            </form>

        </div>
    );
}

export default AdminLogin;