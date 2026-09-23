import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import StatusBadge from "../components/StatusBadge";
import admin4 from "../assets/icon-images/admin-4.png";
import admin5 from "../assets/icon-images/admin-5.png";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";

const REFERRALS = [
    {
        id: "ref-1",
        counselorName: "Adebiyi Abasi",
        counselorStaffId: "STF00124",
        counselorImg: admin4,
        studentName: "Arlene McCoy",
        studentId: "AD33578",
        studentImg: student1,
        dateRegistered: "2026-07-12",
        status: "Active",
    },
    {
        id: "ref-2",
        counselorName: "Adebiyi Abasi",
        counselorStaffId: "STF00124",
        counselorImg: admin4,
        studentName: "Wade Warren",
        studentId: "AD45231",
        studentImg: student2,
        dateRegistered: "2026-07-15",
        status: "Active",
    },
    {
        id: "ref-3",
        counselorName: "Grace Okafor",
        counselorStaffId: "STF00187",
        counselorImg: admin5,
        studentName: "Brooklyn Simmons",
        studentId: "AD67452",
        studentImg: student3,
        dateRegistered: "2026-07-20",
        status: "Inactive",
    },
    {
        id: "ref-4",
        counselorName: "Grace Okafor",
        counselorStaffId: "STF00187",
        counselorImg: admin5,
        studentName: "Theresa Webb",
        studentId: "AD76133",
        studentImg: student4,
        dateRegistered: "2026-08-05",
        status: "Pending",
    },
];

export default function Referrals() {
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filtered = useMemo(() => {
        return REFERRALS.filter((r) => {
            const matchesStatus = statusFilter === "all" || r.status === statusFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch =
                !query ||
                r.counselorName.toLowerCase().includes(query) ||
                r.studentName.toLowerCase().includes(query) ||
                r.counselorStaffId.toLowerCase().includes(query) ||
                r.studentId.toLowerCase().includes(query);
            return matchesStatus && matchesSearch;
        });
    }, [searchValue, statusFilter]);

    return (
        <div className="app-layout-container">
            <Sidebar activePage="referrals" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Referrals Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-arrow-repeat"
                            tag="Referrals"
                            description="View all student referrals made through counselors. Referrals are automatically recorded when a student registers via a counselor's payment link."
                        />

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <div className="roster-panel-header">
                                    <div className="roster-panel-heading">
                                        <h3>All Referrals</h3>
                                        <p className="roster-count-text">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</p>
                                    </div>
                                    <div className="roster-panel-actions panel-card-header-actions">
                                        <div className="roster-filter-wrapper">
                                            <i className="bi bi-toggle2-on"></i>
                                            <select
                                                className="roster-filter-select"
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                            >
                                                <option value="all">All Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                            <i className="bi bi-chevron-down roster-filter-chevron"></i>
                                        </div>
                                    </div>
                                </div>

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="referralsTable">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Counselor Name <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Student Name <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Date Registered <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Status <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((r, index) => (
                                                <tr key={r.id}>
                                                    <td className="marks-table-admission-no">{index + 1}</td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={r.counselorImg} alt={r.counselorName} />
                                                            <div>
                                                                <h4>{r.counselorName}</h4>
                                                                <p>Staff ID: {r.counselorStaffId}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={r.studentImg} alt={r.studentName} />
                                                            <div>
                                                                <h4>{r.studentName}</h4>
                                                                <p>Student ID: {r.studentId}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{r.dateRegistered}</td>
                                                    <td><StatusBadge status={r.status} /></td>
                                                    <td>
                                                        <button className="table-view-btn" type="button">View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filtered.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} style={{ textAlign: "center", padding: "24px", color: "var(--text-muted, #888)" }}>
                                                        No referrals found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <PageFooter />
                    </div>
                </div>
            </main>
        </div>
    );
}
