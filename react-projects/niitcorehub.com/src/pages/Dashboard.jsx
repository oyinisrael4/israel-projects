import Sidebar from "./Sidebar";
import teacherAvatar from "../assets/icon-images/teacher-avatar.png";
import profile1 from "../assets/icon-images/profile-1.png";
import profile2 from "../assets/icon-images/profile-2.png";
import profile3 from "../assets/icon-images/profile-3.png";
import profile4 from "../assets/icon-images/profile-4.png";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";


export default function Dashboard() {
    return (
        <div className="app-layout-container">
            <Sidebar activePage="dashboard" />

            <main className="main-content-wrapper">

                <header className="topbar-wrapper">
                    <div className="topbar-search-box">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Search" />
                    </div>
                    <div className="topbar-actions-wrapper">
                        <button className="topbar-icon-btn" title="Theme">
                            <i className="bi bi-sun-fill"></i>
                        </button>
                        <button className="topbar-icon-btn" title="Language">
                            <i className="bi bi-globe2"></i>
                        </button>
                        <button className="topbar-icon-btn topbar-notification-btn" title="Notifications">
                            <i className="bi bi-bell-fill"></i>
                            <span className="topbar-notification-dot"></span>
                        </button>
                    </div>
                </header>

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <div className="page-heading-wrapper">
                            <div className="page-heading-tag">
                                <i className="bi bi-grid-1x2-fill"></i>
                                <span>Dashboard</span>
                            </div>
                            <h1 className="page-heading-title">Admin Dashboard</h1>
                            <p className="page-heading-description">
                                Admin <i className="bi bi-arrow-right"></i> Manage staffs, students, programmes, and everything else happening across the institute from one place.
                            </p>
                        </div>

                        <div className="stats-row-container">
                            <div className="teacher-profile-card">
                                <div className="teacher-profile-card-image">
                                    <img src={teacherAvatar} alt="Courtney Henry" />
                                </div>
                                <h3 className="teacher-profile-card-name">Courtney Henry</h3>
                                <p className="teacher-profile-card-meta">Class: 1-A, V-B</p>
                                <p className="teacher-profile-card-meta">Physics</p>
                                <button className="btn teacher-profile-card-btn" title="Edit Profile">
                                    <span>Edit Profile</span>
                                </button>
                            </div>

                            <div className="stat-card-grid">
                                <div className="stat-card stat-card-primary">
                                    <div className="stat-card-icon"><i className="bi bi-person-fill"></i></div>
                                    <p className="stat-card-label">Total Students</p>
                                    <h3 className="stat-card-value">3,500</h3>
                                </div>
                                <div className="stat-card stat-card-secondary">
                                    <div className="stat-card-icon"><i className="bi bi-journal-check"></i></div>
                                    <p className="stat-card-label">Total Staffs</p>
                                    <h3 className="stat-card-value">3,500</h3>
                                </div>
                                <div className="stat-card stat-card-black">
                                    <div className="stat-card-icon"><i className="bi bi-mortarboard-fill"></i></div>
                                    <p className="stat-card-label">Total Programmes</p>
                                    <h3 className="stat-card-value">3,500</h3>
                                </div>
                                <div className="stat-card stat-card-footer">
                                    <div className="stat-card-icon"><i className="bi bi-wallet2"></i></div>
                                    <p className="stat-card-label">Total Students</p>
                                    <h3 className="stat-card-value">3,500</h3>
                                </div>
                            </div>

                            <div className="attendance-card">
                                <div className="attendance-card-header">
                                    <h3 className="attendance-card-title">Attendance</h3>
                                    <select className="attendance-card-select">
                                        <option>Yearly</option>
                                        <option>Monthly</option>
                                        <option>Weekly</option>
                                    </select>
                                </div>
                                <div className="attendance-card-body">
                                    <div className="attendance-legend-list">
                                        <div className="attendance-legend-item">
                                            <i className="bi bi-circle-fill attendance-legend-icon attendance-legend-icon-present"></i>
                                            <div className="attendance-legend-text">
                                                <h4>200</h4>
                                                <p>Present</p>
                                            </div>
                                        </div>
                                        <div className="attendance-legend-item">
                                            <i className="bi bi-circle-fill attendance-legend-icon attendance-legend-icon-half"></i>
                                            <div className="attendance-legend-text">
                                                <h4>300</h4>
                                                <p>Half Day</p>
                                            </div>
                                        </div>
                                        <div className="attendance-legend-item">
                                            <i className="bi bi-circle-fill attendance-legend-icon attendance-legend-icon-absent"></i>
                                            <div className="attendance-legend-text">
                                                <h4>100</h4>
                                                <p>Absent</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="attendance-donut-chart"></div>
                                </div>
                            </div>
                        </div>

                        <div className="panels-row-container">
                            <div className="notice-panel-card">
                                <div className="panel-card-header">
                                    <h3 className="panel-card-title">Notice Board</h3>
                                    <i className="bi bi-three-dots-vertical panel-card-menu-icon"></i>
                                </div>
                                <div className="notice-panel-list">
                                    {[
                                        { img: profile1, name: "Admin", text: "Lorem Ipsum is simply dummy text of the printing and typesetti" },
                                        { img: profile2, name: "Kathryn Murphy", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
                                        { img: profile3, name: "Admin", text: "Lorem Ipsum is simply dummy text of the printing and typesetti" },
                                        { img: profile4, name: "John Doe", text: "Lorem Ipsum dolor sit amet consectetur adipisicing elit." },
                                    ].map((item, i) => (
                                        <div className="notice-panel-item" key={i}>
                                            <div className="notice-panel-item-avatar">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="notice-panel-item-text">
                                                <h4>{item.name}</h4>
                                                <p>{item.text}</p>
                                                <span>25 Jan 2024</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="events-panel-card">
                                <div className="panel-card-header">
                                    <h3 className="panel-card-title">Upcoming Events</h3>
                                </div>
                                <div className="events-panel-list">
                                    {[
                                        { time: "09:00 - 09:45", ampm: "AM", title: "Marketing Strategy Kickoff", lead: "Robert Fox", cls: "events-panel-item-primary" },
                                        { time: "11:15 - 12:00", ampm: "AM", title: "Product Design Brainstorm", lead: "Leslie Alexander", cls: "events-panel-item-secondary" },
                                        { time: "02:00 - 03:00", ampm: "PM", title: "Client Feedback Review", lead: "Courtney Henry", cls: "events-panel-item-black" },
                                        { time: "04:15 - 05:00", ampm: "PM", title: "Sprint Planning & Task Allocation", lead: "Eleanor Pena", cls: "events-panel-item-primary" },
                                        { time: "01:15 - 02:00", ampm: "PM", title: "Client Feedback Review", lead: "John", cls: "events-panel-item-secondary" },
                                    ].map((ev, i) => (
                                        <div className={`events-panel-item ${ev.cls}`} key={i}>
                                            <div className="events-panel-item-text">
                                                <h4>{ev.time} <small>{ev.ampm}</small></h4>
                                                <p>{ev.title}</p>
                                                <span>Lead by <b>{ev.lead}</b></span>
                                            </div>
                                            <button className="btn events-panel-view-btn" title="View">
                                                <span>View</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="tables-row-container">
                            <div className="marks-panel-card">
                                <div className="panel-card-header">
                                    <h3 className="panel-card-title">Students</h3>
                                    <i className="bi bi-three-dots-vertical panel-card-menu-icon"></i>
                                </div>
                                <div className="marks-table-wrapper">
                                    <table className="marks-table">
                                        <thead>
                                            <tr>
                                                <th className="marks-table-admission-no">#</th>
                                                <th>Student</th>
                                                <th>Programme</th>
                                                <th>Phone</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { no: 1, img: student1, name: "Arlene McCoy", id: "AD33578", prog: "Web Development", phone: "0800 234 5678", status: "Active" },
                                                { no: 2, img: student2, name: "Wade Warren", id: "AD45231", prog: "Data Science", phone: "0802 345 6789", status: "Active" },
                                                { no: 3, img: student3, name: "Brooklyn Simmons", id: "AD67452", prog: "Cybersecurity", phone: "0810 345 6789", status: "Active" },
                                                { no: 4, img: student4, name: "Theresa Webb", id: "AD76133", prog: "Software Engineering", phone: "0813 456 7890", status: "Inactive" },
                                                { no: 5, img: student5, name: "Darlene Robertson", id: "AD98214", prog: "Networking", phone: "0816 567 8901", status: "Inactive" },
                                            ].map((s) => (
                                                <tr key={s.no}>
                                                    <td className="marks-table-admission-no">{s.no}</td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={s.img} alt={s.name} />
                                                            <div>
                                                                <h4>{s.name}</h4>
                                                                <p>Student ID: {s.id}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{s.prog}</td>
                                                    <td>{s.phone}</td>
                                                    <td><span className={`status-badge ${s.status === "Active" ? "status-badge-active" : "status-badge-inactive"}`}>{s.status}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="marks-table-footer">
                                    <p>Showing 1 to 5 of 5 entries</p>
                                    <div className="marks-table-pagination">
                                        <button className="marks-table-page-btn" title="First"><i className="bi bi-chevron-double-left"></i></button>
                                        <button className="marks-table-page-btn" title="Previous"><i className="bi bi-chevron-left"></i></button>
                                        <button className="marks-table-page-btn marks-table-page-btn-active">1</button>
                                        <button className="marks-table-page-btn" title="Next"><i className="bi bi-chevron-right"></i></button>
                                        <button className="marks-table-page-btn" title="Last"><i className="bi bi-chevron-double-right"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div className="leave-panel-card">
                                <div className="panel-card-header">
                                    <h3 className="panel-card-title">Leave Status</h3>
                                    <select className="attendance-card-select">
                                        <option>Yearly</option>
                                        <option>Monthly</option>
                                    </select>
                                </div>
                                <div className="leave-panel-list">
                                    {[
                                        { title: "Emergency Leave", status: "Pending" },
                                        { title: "Medical Leave", status: "Accepted" },
                                        { title: "Now Well", status: "Pending" },
                                        { title: "Medical Leave", status: "Accepted" },
                                        { title: "Emergency Leave", status: "Accepted" },
                                        { title: "Now Well", status: "Pending" },
                                        { title: "Medical Leave", status: "Accepted" },
                                    ].map((leave, i) => (
                                        <div className="leave-panel-item" key={i}>
                                            <div className="leave-panel-item-text">
                                                <h4>{leave.title}</h4>
                                                <p>Date: 10/10/24</p>
                                            </div>
                                            <span className={`status-badge ${leave.status === "Pending" ? "status-badge-pending" : "status-badge-accepted"}`}>{leave.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <footer className="dashboard-footer-wrapper">
                            <p>Ac 2026 Made With <i className="bi bi-heart-fill"></i> by NIIT.</p>
                        </footer>

                    </div>
                </div>

            </main>
        </div>
    );
}
