import { useEffect, useState } from "react";

function AdminDashboard() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/complaints"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch complaints."
                    );
                }

                setComplaints(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    const handleStatusChange = async (complaintId, newStatus) => {
    try {
        const token = localStorage.getItem("token");

const response = await fetch(
    `http://localhost:5000/api/complaints/${complaintId}/status`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            status: newStatus,
        }),
    }
);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update status");
        }

        // Update the complaint in the UI
        setComplaints((prevComplaints) =>
            prevComplaints.map((complaint) =>
                complaint.complaintId === complaintId
                    ? { ...complaint, status: newStatus }
                    : complaint
            )
        );
    } catch (error) {
        console.error("Status update error:", error);
        alert("Failed to update complaint status");
    }
};

    if (loading) {
        return <p>Loading complaints...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    
    
    return (
        <div className="admin-dashboard">

            <h1>CivicFlow Admin Dashboard</h1>

            <p className="admin-subtitle">
                Manage and monitor citizen complaints.
            </p>

            <div className="admin-summary">

                <div className="admin-stat">
                    <span>Total Complaints</span>
                    <strong>{complaints.length}</strong>
                </div>

                <div className="admin-stat">
                    <span>Submitted</span>
                    <strong>
                        {
                            complaints.filter(
                                (complaint) =>
                                    complaint.status === "Submitted"
                            ).length
                        }
                    </strong>
                </div>

                <div className="admin-stat">
                    <span>Working</span>
                    <strong>
                        {
                            complaints.filter(
                                (complaint) =>
                                    complaint.status === "Working"
                            ).length
                        }
                    </strong>
                </div>

                <div className="admin-stat">
                    <span>Resolved</span>
                    <strong>
                        {
                            complaints.filter(
                                (complaint) =>
                                    complaint.status === "Resolved"
                            ).length
                        }
                    </strong>
                </div>

            </div>

            <div className="admin-complaints">

                <h2>Complaints</h2>

                {complaints.length === 0 ? (

                    <p>No complaints found.</p>

                ) : (

                    complaints.map((complaint) => (

                        <div
                            className="admin-complaint-card"
                            key={complaint._id}
                        >

                            <div className="admin-complaint-header">

                                <div>

                                    <span className="small-label">
                                        COMPLAINT
                                    </span>

                                    <h3>
                                        #{complaint.complaintId}
                                    </h3>

                                </div>

                               <select
    className="admin-status-select"
    value={complaint.status}
    onChange={(e) =>
        handleStatusChange(
            complaint.complaintId,
            e.target.value
        )
    }
>
    <option value="Submitted">Submitted</option>
    <option value="Verified">Verified</option>
    <option value="Checking">Checking</option>
    <option value="Working">Working</option>
    <option value="Resolved">Resolved</option>
</select>
                            </div>

                            <p>
                                <strong>Issue:</strong>{" "}
                                {complaint.issueType}
                            </p>

                            <p>
                                <strong>Location:</strong>{" "}
                                {complaint.location}
                            </p>

                            <p>
                                <strong>Description:</strong>{" "}
                                {complaint.description}
                            </p>

                            {complaint.photo && (
    <div className="admin-complaint-photo">
        <strong>Photo:</strong>

        <a
    href={`http://localhost:5000${complaint.photo}`}
    target="_blank"
    rel="noopener noreferrer"
>
    <img
        src={`http://localhost:5000${complaint.photo}`}
        alt={`Complaint ${complaint.complaintId}`}
    />
</a>

    </div>
)}

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default AdminDashboard;