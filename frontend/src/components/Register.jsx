import { useState } from "react";

function Register({ onRegister, onLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://civicflow-production-8596.up.railway.app/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed."
                );
            }

            alert("Account created successfully!");

            if (onRegister) {
                onRegister(data.user);
            }

        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message || "Unable to register.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="report-form"
            onSubmit={handleRegister}
        >
            <h2>Create Citizen Account</h2>

            <p className="admin-login-subtitle">
                Create an account to report and track civic complaints.
            </p>

            <label>Name</label>

            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                }}
            />

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                }}
            />

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="primary-btn"
                disabled={loading}
            >
                {loading
                    ? "Creating Account..."
                    : "Create Account"}
            </button>

            <p
                style={{
                    marginTop: "15px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#64748b",
                }}
            >
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={onLogin}
                    style={{
                        border: "none",
                        background: "none",
                        color: "#2563eb",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    Login
                </button>
            </p>
        </form>
    );
}

export default Register;