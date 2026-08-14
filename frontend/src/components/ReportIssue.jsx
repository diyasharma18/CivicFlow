import { useState } from "react";

function ReportIssue() {
    const [submitted, setSubmitted] = useState(false);
    const [complaintId, setComplaintId] = useState("");

    const [issueType, setIssueType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [photo, setPhoto] = useState(null);

    const [error, setError] = useState("");

    const handleSubmit = () => {

        if (!issueType || !description.trim() || !location.trim()) {
            setError("Please fill in all required fields.");
            return;
        }

        setError("");

        const newComplaintId =
            "CF" + Math.floor(1000 + Math.random() * 9000);

        setComplaintId(newComplaintId);
        setSubmitted(true);
    };

    const handleLocation = () => {

        if (!navigator.geolocation) {
            setError(
                "Location access is not supported by your browser."
            );
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {

                const latitude =
                    position.coords.latitude.toFixed(6);

                const longitude =
                    position.coords.longitude.toFixed(6);

                setLocation(`${latitude}, ${longitude}`);
                setError("");
            },

            () => {
                setError(
                    "Unable to access your location. Please allow location access."
                );
            }
        );
    };

    return (
        <div className="report-form">

            <h2>Report a Civic Issue</h2>

            {/* Issue Type */}
            <label>Issue Type</label>

            <select
                value={issueType}
                onChange={(e) => {
                    setIssueType(e.target.value);
                    setError("");
                }}
            >
                <option value="">
                    Select an issue
                </option>

                <option value="Road Damage">
                    Road Damage
                </option>

                <option value="Garbage">
                    Garbage
                </option>

                <option value="Streetlight">
                    Streetlight
                </option>

                <option value="Water Supply">
                    Water Supply
                </option>

                <option value="Drainage">
                    Drainage
                </option>

                <option value="Other">
                    Other
                </option>
            </select>

            {/* Description */}
            <label>Description</label>

            <textarea
                placeholder="Describe the issue..."
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                    setError("");
                }}
            />

            {/* Location */}
            <label>Location</label>

            <div className="location-input">

                <input
                    type="text"
                    placeholder="Enter the location"
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                        setError("");
                    }}
                />

                <button
                    type="button"
                    className="location-btn"
                    title="Use current location"
                    onClick={handleLocation}
                >
                    📍
                </button>

            </div>

            {/* Photo */}
            <label>Photo</label>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setPhoto(e.target.files[0]);
                    setError("");
                }}
            />

            {/* Error */}
            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            {/* Submit */}
            <button
                type="button"
                className="primary-btn"
                onClick={handleSubmit}
            >
                Submit Complaint
            </button>

            {/* Success */}
            {submitted && (
                <div className="success-message">

                    <p>
                        Complaint submitted successfully!
                    </p>

                    <strong>
                        Complaint ID: {complaintId}
                    </strong>

                </div>
            )}

        </div>
    );
}

export default ReportIssue;