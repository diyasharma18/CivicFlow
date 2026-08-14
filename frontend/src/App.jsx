import { useState } from "react";
import "./App.css";
import ReportIssue from "./components/ReportIssue";

function App() {
    const [showReportForm, setShowReportForm] = useState(false);
    const [showQueue, setShowQueue] = useState(false);

    return (
        <div className="app">

            {/* Navigation */}
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

                    <button
                        type="button"
                        className="login-btn"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className="signup-btn"
                    >
                        Get Started
                    </button>

                </div>

            </nav>

            {/* Hero Section */}
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

                    <div className="hero-buttons">

                        <button
                            type="button"
                            className="primary-btn"
                            onClick={() => setShowReportForm(true)}
                        >
                            Report an Issue →
                        </button>

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => setShowQueue(true)}
                        >
                            Track Complaint
                        </button>

                    </div>

                    <div className="trust-text">
                        Simple · Fast · Transparent
                    </div>

                </div>

                {/* Complaint Status Card */}
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
                            <span>Status</span>
                            <strong>In Progress</strong>
                        </div>

                        <div>
                            <span>Reported</span>
                            <strong>Today</strong>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="track-btn"
                        onClick={() => setShowQueue(true)}
                    >
                        Track Complaint
                    </button>

                    {showQueue && (
                        <p className="queue-status">
                            Your complaint has been assigned
                            and is currently being reviewed.
                        </p>
                    )}

                </div>

            </main>

            {/* Features */}
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

            {/* Report Issue Modal */}
            {showReportForm && (
                <div
                    className="report-overlay"
                    onClick={() => setShowReportForm(false)}
                >

                    <div
                        className="report-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            type="button"
                            className="close-btn"
                            onClick={() => setShowReportForm(false)}
                        >
                            ×
                        </button>

                        <ReportIssue />

                    </div>

                </div>
            )}

        </div>
    );
}

export default App;