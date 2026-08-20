import { useState } from "react";

function TrackComplaint() {
    const [complaintId, setComplaintId] = useState("");
    const [complaint, setComplaint] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();

        if (!complaintId.trim()) {
            setError("Please enter a complaint ID.");
            setComplaint(null);
            return;
        }

        setLoading(true);
        setError("");
        setComplaint(null);

        try {
            const cleanId = complaintId.trim().toUpperCase();

            const response = await fetch(
                `https://civicflow-production-8596.up.railway.app/api/complaints/${cleanId}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Complaint not found."
                );
            }

            setComplaint(data);

        } catch (error) {
            console.error("Track complaint error:", error);
            setError(error.message || "Failed to track complaint.");
        } finally {
            setLoading(false);
        }
    };

    const statuses = [
        "Submitted",
        "Verified",
        "Checking",
        "Working",
        "Resolved"
    ];

    const currentStatus = complaint?.status || "Submitted";

    const currentIndex = statuses.indexOf(currentStatus);

    return (
        <div className="track-modal">

            <h2>Track Your Complaint</h2>

            <p className="modal-description">
                Enter your complaint ID to check the current status.
            </p>

            <form
                className="track-input-container"
                onSubmit={handleTrack}
            >
                <input
                    type="text"
                    placeholder="Enter Complaint ID (e.g. CF8708)"
                    value={complaintId}
                    onChange={(e) => {
                        setComplaintId(e.target.value);
                        setError("");
                    }}
                />

                <button
                    type="submit"
                    className="primary-btn"
                    disabled={loading}
                >
                    {loading ? "Checking..." : "Track"}
                </button>
            </form>

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            {complaint && (
                <div className="track-result">

                    <div className="track-result-header">

                        <div>
                            <span className="small-label">
                                COMPLAINT
                            </span>

                            <h3>
                                #{complaint.complaintId}
                            </h3>
                        </div>

                        <strong>
                            {complaint.status}
                        </strong>

                    </div>

                    <p className="complaint-description">
                        <strong>Issue:</strong>{" "}
                        {complaint.issueType}
                    </p>

                    <p className="complaint-description">
                        <strong>Description:</strong>{" "}
                        {complaint.description}
                    </p>

                    <p className="complaint-location">
                        <strong>Location:</strong>{" "}
                        {complaint.location}
                    </p>

                    <div className="status-timeline">

                        {statuses.map((status, index) => {

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

                                    <span
                                        className={`status-label ${
                                            completed
                                                ? "completed-label"
                                                : ""
                                        }`}
                                    >
                                        {status}
                                    </span>

                                </div>
                            );
                        })}

                    </div>

                </div>
            )}

        </div>
    );
}

export default TrackComplaint;