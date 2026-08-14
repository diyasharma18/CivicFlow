import { useState } from "react";
import "./App.css";
import ReportIssue from "./components/ReportIssue";

const statuses = [
    "Submitted",
    "Verified",
    "Checking",
    "Working",
    "Resolved"
];

function App() {
    const [showReportForm, setShowReportForm] = useState(false);
    const [showQueue, setShowQueue] = useState(false);

    const [complaintId, setComplaintId] = useState("");
    const [complaint, setComplaint] = useState(null);
    const [trackError, setTrackError] = useState("");
    const [loading, setLoading] = useState(false);

    const getStatusIndex = (status) => {
        return statuses.indexOf(status);
    };

    const handleTrackComplaint = async () => {
        if (!complaintId.trim()) {
            setTrackError("Please enter a complaint ID.");
            return;
        }

        try {
            setLoading(true);
            setTrackError("");
            setComplaint(null);

            const response = await fetch(
                `http://localhost:5000/api/complaints/${complaintId.trim()}`
            );

            const data = await response.json();

            if (!response.ok) {
                setTrackError(data.message || "Complaint not found.");
                return;
            }

            setComplaint(data);

        } catch (error) {
            setTrackError(
                "Unable to connect to CivicFlow server."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">

            {/* NAVBAR */}

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


            {/* HERO */}

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


                {/* COMPLAINT CARD */}

                <div className="queue-card">

                    <div className="card-header">

                        <div>

                            <p className="small-label">
                                COMPLAINT STATUS
                            </p>

                            <h2>
                                {complaint
                                    ? complaint.issueType
                                    : "Track your complaint"}
                            </h2>

                        </div>

                        {complaint && (
                            <span className="live-badge">
                                ● {complaint.status.toUpperCase()}
                            </span>
                        )}

                    </div>


                    {/* COMPLAINT ID */}

                    {complaint && (

                        <div className="queue-number">

                            <span>
                                Complaint ID
                            </span>

                            <strong>
                                #{complaint.complaintId}
                            </strong>

                        </div>

                    )}


                    {/* PROGRESS TIMELINE */}

                    {complaint && (

                        <div className="status-timeline">

                            {statuses.map((status, index) => {

                                const currentIndex =
                                    getStatusIndex(complaint.status);

                                const completed =
                                    index <= currentIndex;

                                return (
                                    <div
                                        className="status-step"
                                        key={status}
                                    >

                                        <div
                                            className={`status-circle ${
                                                completed
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        >
                                            {completed ? "✓" : ""}
                                        </div>

                                        <span
                                            className={
                                                completed
                                                    ? "status-label completed-label"
                                                    : "status-label"
                                            }
                                        >
                                            {status}
                                        </span>

                                        {index < statuses.length - 1 && (
                                            <div
                                                className={`status-line ${
                                                    index < currentIndex
                                                        ? "completed-line"
                                                        : ""
                                                }`}
                                            />
                                        )}

                                    </div>
                                );
                            })}

                        </div>

                    )}


                    {/* DEFAULT CARD */}

                    {!complaint && (

                        <p className="track-description">
                            Enter your complaint ID to see the
                            current progress of your complaint.
                        </p>

                    )}


                    {/* TRACK BUTTON */}

                    <button
                        type="button"
                        className="track-btn"
                        onClick={() => setShowQueue(true)}
                    >
                        Track Complaint
                    </button>

                </div>

            </main>


            {/* FEATURES */}

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


            {/* REPORT ISSUE MODAL */}

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


            {/* TRACK COMPLAINT MODAL */}

            {showQueue && (

                <div
                    className="report-overlay"
                    onClick={() => setShowQueue(false)}
                >

                    <div
                        className="track-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            type="button"
                            className="close-btn"
                            onClick={() => setShowQueue(false)}
                        >
                            ×
                        </button>

                        <h2>
                            Track Your Complaint
                        </h2>

                        <p className="modal-description">
                            Enter your complaint ID to check
                            the current status.
                        </p>

                        <div className="track-input-container">

                            <input
                                type="text"
                                placeholder="Example: CF8708"
                                value={complaintId}
                                onChange={(e) =>
                                    setComplaintId(
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="primary-btn"
                                onClick={handleTrackComplaint}
                            >
                                {loading
                                    ? "Checking..."
                                    : "Track"}
                            </button>

                        </div>

                        {trackError && (
                            <p className="form-error">
                                {trackError}
                            </p>
                        )}

                        {complaint && (

                            <div className="track-result">

                                <div className="track-result-header">

                                    <div>

                                        <p className="small-label">
                                            COMPLAINT
                                        </p>

                                        <h3>
                                            {complaint.issueType}
                                        </h3>

                                    </div>

                                    <strong>
                                        #{complaint.complaintId}
                                    </strong>

                                </div>


                                <p className="complaint-description">
                                    {complaint.description}
                                </p>


                                <p className="complaint-location">
                                    📍 {complaint.location}
                                </p>


                                {/* TIMELINE */}

                                <div className="status-timeline">

                                    {statuses.map((status, index) => {

                                        const currentIndex =
                                            getStatusIndex(
                                                complaint.status
                                            );

                                        const completed =
                                            index <= currentIndex;

                                        return (
                                            <div
                                                className="status-step"
                                                key={status}
                                            >

                                                <div
                                                    className={`status-circle ${
                                                        completed
                                                            ? "completed"
                                                            : ""
                                                    }`}
                                                >
                                                    {completed
                                                        ? "✓"
                                                        : ""}
                                                </div>

                                                <span
                                                    className={
                                                        completed
                                                            ? "status-label completed-label"
                                                            : "status-label"
                                                    }
                                                >
                                                    {status}
                                                </span>

                                                {index <
                                                    statuses.length - 1 && (
                                                    <div
                                                        className={`status-line ${
                                                            index <
                                                            currentIndex
                                                                ? "completed-line"
                                                                : ""
                                                        }`}
                                                    />
                                                )}

                                            </div>
                                        );

                                    })}

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
}

export default App;