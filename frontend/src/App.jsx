import { useState } from "react";
import "./App.css";

import ReportIssue from "./components/ReportIssue";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/Register";
import CitizenLogin from "./components/CitizenLogin";
import TrackComplaint from "./components/TrackComplaint";

function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const [showCitizenLogin, setShowCitizenLogin] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const [showReportForm, setShowReportForm] = useState(false);
    const [showTrackComplaint, setShowTrackComplaint] = useState(false);

    /* =========================
       CITIZEN LOGIN
    ========================= */

    const handleCitizenLogin = (userData) => {
        setUser(userData);
        setShowCitizenLogin(false);
    };

    /* =========================
       ADMIN LOGIN
    ========================= */

    const handleAdminLogin = () => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        setShowAdminLogin(false);
    };

    /* =========================
       LOGOUT
    ========================= */

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

        setShowReportForm(false);
        setShowTrackComplaint(false);
        setShowCitizenLogin(false);
        setShowRegister(false);
        setShowAdminLogin(false);
    };

    /* =========================
       ADMIN DASHBOARD
    ========================= */

    if (user && user.role === "admin") {
        return (
            <div className="app">

                <AdminDashboard />

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        );
    }

    /* =========================
       CITIZEN HOMEPAGE
    ========================= */

    return (
        <div className="app">

            {/* =========================
               NAVBAR
            ========================= */}

            <nav className="navbar">

                <div className="logo">

                    <img
                        src="/logo.png"
                        alt="CivicFlow Logo"
                        className="logo-image"
                    />

                    <span>CivicFlow</span>

                </div>

                <div className="nav-actions">

                    {user && user.role === "citizen" ? (

                        <>
                            <span
                                style={{
                                    color: "#334155",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Hi, {user.name}
                            </span>

                            <button
                                className="login-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>

                    ) : (

                        <>
                           <button
    className="login-btn"
    onClick={() => {
        setShowRegister(false);
        setShowCitizenLogin(true);
    }}
>
    Login
</button>

<button
    className="signup-btn"
    onClick={() => {
        setShowCitizenLogin(false);
        setShowRegister(true);
    }}
>
    Get Started
</button>

<button
    className="login-btn"
    onClick={() => {
        setShowCitizenLogin(false);
        setShowRegister(false);
        setShowAdminLogin(true);
    }}
>
    Admin
</button>
                        </>

                    )}

                </div>

            </nav>


            {/* =========================
               HERO
            ========================= */}

            <main className="hero-section">

                <div className="hero-content">

                    <div className="badge">
                        ✦ Smart Civic Complaint Platform
                    </div>

                    <h1>
                        Report issues.
                        <br />
                        <span>Get them resolved.</span>
                    </h1>

                    <p className="hero-description">
                        CivicFlow helps citizens report civic issues,
                        track complaints in real time, and stay updated
                        until the problem is resolved.
                    </p>


                    {/* =========================
                       HERO BUTTONS
                    ========================= */}

                    <div className="hero-buttons">

                        {/* REPORT ISSUE */}

                        <button
                            className="primary-btn"
                            onClick={() => {

                                if (user) {

                                    setShowReportForm(true);

                                } else {

                                    setShowCitizenLogin(true);

                                }

                            }}
                        >
                            Report an Issue →
                        </button>


                        {/* TRACK COMPLAINT */}

                        <button
                            className="secondary-btn"
                            onClick={() => {

                                if (user) {

                                    setShowTrackComplaint(true);

                                } else {

                                    setShowCitizenLogin(true);

                                }

                            }}
                        >
                            Track Complaint
                        </button>

                    </div>


                    <div className="trust-text">
                        Simple · Fast · Transparent
                    </div>

                </div>


                {/* =========================
                   SAMPLE COMPLAINT CARD
                ========================= */}

                <div className="queue-card">

                    <div className="card-header">

                        <div>

                            <p className="small-label">
                                COMPLAINT STATUS
                            </p>

                            <h2>
                                Streetlight Not Working
                            </h2>

                        </div>

                        <span className="live-badge">
                            ● ACTIVE
                        </span>

                    </div>


                    <div className="queue-number">

                        <span>
                            Complaint ID
                        </span>

                        <strong>
                            #CF1024
                        </strong>

                    </div>


                    <div className="progress-container">

                        <div className="progress-bar"></div>

                    </div>


                    <div className="queue-info">

                        <div>

                            <span>
                                Status
                            </span>

                            <strong>
                                In Progress
                            </strong>

                        </div>


                        <div>

                            <span>
                                Reported
                            </span>

                            <strong>
                                Today
                            </strong>

                        </div>

                    </div>


                    <button
                        className="track-btn"
                        onClick={() => {

                            if (user) {

                                setShowTrackComplaint(true);

                            } else {

                                setShowCitizenLogin(true);

                            }

                        }}
                    >
                        Track Complaint
                    </button>

                </div>

            </main>


            {/* =========================
               FEATURES
            ========================= */}

            <section className="features">

                <div className="feature">

                    <div className="feature-icon">
                        📢
                    </div>

                    <h3>
                        Report Civic Issues
                    </h3>

                    <p>
                        Report problems like damaged roads,
                        garbage, streetlights, water issues,
                        and more.
                    </p>

                </div>


                <div className="feature">

                    <div className="feature-icon">
                        📍
                    </div>

                    <h3>
                        Track Your Complaint
                    </h3>

                    <p>
                        Track the status of your complaint
                        and know what is happening with
                        your report.
                    </p>

                </div>


                <div className="feature">

                    <div className="feature-icon">
                        🔔
                    </div>

                    <h3>
                        Stay Updated
                    </h3>

                    <p>
                        Get updates when your complaint is
                        received, assigned, being worked on,
                        or resolved.
                    </p>

                </div>

            </section>


            {/* =========================
               CITIZEN LOGIN MODAL
            ========================= */}

            {showCitizenLogin && (

                <div className="report-overlay">

                    <div className="report-modal">

                        <button
                            className="close-btn"
                            onClick={() =>
                                setShowCitizenLogin(false)
                            }
                        >
                            ×
                        </button>

                        <CitizenLogin
                            onLogin={handleCitizenLogin}

                            onRegister={() => {

                                setShowCitizenLogin(false);
                                setShowRegister(true);

                            }}
                        />

                    </div>

                </div>

            )}


            {/* =========================
               CITIZEN REGISTER MODAL
            ========================= */}

            {showRegister && (

                <div className="report-overlay">

                    <div className="report-modal">

                        <button
                            className="close-btn"
                            onClick={() =>
                                setShowRegister(false)
                            }
                        >
                            ×
                        </button>

                        <Register

                            onRegister={() => {

                                setShowRegister(false);
                                setShowCitizenLogin(true);

                            }}

                            onLogin={() => {

                                setShowRegister(false);
                                setShowCitizenLogin(true);

                            }}

                        />

                    </div>

                </div>

            )}


            {/* =========================
               ADMIN LOGIN MODAL
            ========================= */}

            {showAdminLogin && (

                <div className="report-overlay">

                    <div className="report-modal">

                        <button
                            className="close-btn"
                            onClick={() =>
                                setShowAdminLogin(false)
                            }
                        >
                            ×
                        </button>

                        <AdminLogin
                            onLogin={handleAdminLogin}
                        />

                    </div>

                </div>

            )}


            {/* =========================
               REPORT ISSUE MODAL
            ========================= */}

            {showReportForm && (

                <div className="report-overlay">

                    <div className="report-modal">

                        <button
                            className="close-btn"
                            onClick={() =>
                                setShowReportForm(false)
                            }
                        >
                            ×
                        </button>

                        <ReportIssue />

                    </div>

                </div>

            )}


            {/* =========================
               TRACK COMPLAINT MODAL
            ========================= */}

            {showTrackComplaint && (

                <div className="report-overlay">

                    <div className="track-modal">

                        <button
                            className="close-btn"
                            onClick={() =>
                                setShowTrackComplaint(false)
                            }
                        >
                            ×
                        </button>

                        <h2>
                            Track Your Complaint
                        </h2>

                        <p className="modal-description">
                            Enter your Complaint ID to check the latest status.
                        </p>

                        <TrackComplaint />

                    </div>

                </div>

            )}

        </div>
    );
}

export default App;