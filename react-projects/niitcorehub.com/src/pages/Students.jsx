import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import StatusBadge from "../components/StatusBadge";
import SlideDrawer from "../components/SlideDrawer";
import StudentModal from "../components/StudentModal";
import RosterFilter from "../components/RosterFilter";
import { FormInput, FormSelect } from "../components/FormField";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";

const ADMIN_NAV = [
    { id: "dashboard", to: "/dashboard", icon: "bi-grid-1x2-fill", label: "Dashboard" },
    { id: "admin", to: "/admin", icon: "bi-person-badge-fill", label: "Admin" },
    { id: "counselor", to: "/counselor", icon: "bi-chat-heart-fill", label: "Counselor" },
    { id: "staff", to: "/staff", icon: "bi-easel2-fill", label: "Staff" },
    { id: "students", to: "/students", icon: "bi-people-fill", label: "Students" },
    { id: "parents", to: "/parents", icon: "bi-house-heart-fill", label: "Parents" },
    { id: "programme", to: "/programme", icon: "bi-list-ul", label: "Programme" },
    { id: "referrals", to: "/referrals", icon: "bi-arrow-repeat", label: "Referrals" },
    { id: "payments", to: "/payments", icon: "bi-cash-coin", label: "Payments" },
    { id: "logout", to: "/login", icon: "bi-power", label: "Log-Out" },
];

const PROGRAMMES = [
    "Hardware & Networking", "Desktop Publishing (MS Office Suite)", "MasterMind Series (MIS)",
    "CCNA / CCNP", "IT Essentials", "Diploma in .NET Technologies", "Diploma in Web Development",
    "Data Analysis", "Diploma in Java", "Diploma in Python", "Java with DevOps",
    "Graphics Design", "UI/UX Design", "Project Management (PMP)", "Multimedia",
    "Game Development", "CyberOps", "Certified Ethical Hacking",
];

const INITIAL_STUDENTS = [
    { sn: 1, id: "student-1", img: student1, name: "Arlene McCoy", sid: "AD33578", prog: "Web Development", email: "arlene.mccoy@niit.edu", phone: "080 1234 5678", status: "Active", broughtBy: "Adebiyi Abasi", search: "arlene mccoy ad33578 web development adebiyi abasi", lastLogin: "2026-09-28 10:20 AM" },
    { sn: 2, id: "student-2", img: student2, name: "Wade Warren", sid: "AD45231", prog: "Data Analysis", email: "wade.warren@niit.edu", phone: "081 2345 6789", status: "Active", broughtBy: "Adebiyi Abasi", search: "wade warren ad45231 data analysis adebiyi abasi", lastLogin: "2026-09-29 02:15 PM" },
    { sn: 3, id: "student-3", img: student3, name: "Brooklyn Simmons", sid: "AD67452", prog: "CyberOps", email: "brooklyn.simmons@niit.edu", phone: "080 3456 7890", status: "Inactive", broughtBy: "Grace Okafor", search: "brooklyn simmons ad67452 cyberops grace okafor", lastLogin: "2026-08-15 11:30 AM" },
    { sn: 4, id: "student-4", img: student4, name: "Theresa Webb", sid: "AD76133", prog: "Diploma in Python", email: "theresa.webb@niit.edu", phone: "081 4567 8901", status: "Active", broughtBy: "Grace Okafor", search: "theresa webb ad76133 diploma in python grace okafor", lastLogin: "2026-09-25 09:10 AM" },
    { sn: 5, id: "student-5", img: student5, name: "Darlene Robertson", sid: "AD98214", prog: "Hardware & Networking", email: "darlene.robertson@niit.edu", phone: "080 5678 9012", status: "Active", broughtBy: "", search: "darlene robertson ad98214 hardware & networking", lastLogin: "2026-09-20 04:45 PM" },
];

const STUDENT_EDIT_FIELDS = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "prog", label: "Programme", type: "select", options: PROGRAMMES },
    { key: "phone", label: "Phone Number", type: "tel" },
    { key: "status", label: "Select Status", type: "select", options: ["Active", "Inactive"] },
];

export default function Students() {
    const [students, setStudents] = useState(INITIAL_STUDENTS);
    const [searchValue, setSearchValue] = useState("");
    const [programmeFilter, setProgrammeFilter] = useState("all");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", programme: "", status: "Active", broughtBy: "" });

    // Profile Modal State
    const [profileData, setProfileData] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [editForm, setEditForm] = useState({});

    const allProgrammes = useMemo(() => {
        const progs = new Set(students.map((s) => s.prog));
        return ["all", ...progs];
    }, [students]);

    const filtered = useMemo(() => {
        return students.filter((s) => {
            const matchesProg = programmeFilter === "all" || s.prog === programmeFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || s.search.includes(query);
            return matchesProg && matchesSearch;
        });
    }, [students, programmeFilter, searchValue]);

    function openProfile(student) {
        setProfileData(student);
        setEditForm({
            name: student.name,
            email: student.email,
            phone: student.phone,
            prog: student.prog,
            status: student.status,
        });
        setIsProfileOpen(true);
    }

    function handleSaveEdit(updatedForm) {
        setStudents((prev) =>
            prev.map((s) =>
                s.sid === profileData.sid
                    ? {
                        ...s,
                        name: updatedForm.name,
                        email: updatedForm.email,
                        phone: updatedForm.phone,
                        prog: updatedForm.prog,
                        status: updatedForm.status,
                        search: `${updatedForm.name} ${s.sid} ${updatedForm.prog} ${s.broughtBy || ""}`.toLowerCase(),
                    }
                    : s
            )
        );
        setProfileData((prev) => ({
            ...prev,
            name: updatedForm.name,
            email: updatedForm.email,
            phone: updatedForm.phone,
            prog: updatedForm.prog,
            status: updatedForm.status,
        }));
    }

    function handleAdd(e) {
        e.preventDefault();
        const { firstName, lastName, email, phone, programme, status, broughtBy } = form;
        if (!firstName || !lastName || !email || !phone || !programme) {
            alert("Please fill in all required fields.");
            return;
        }
        const fullName = `${firstName} ${lastName}`;
        const newSn = students.length + 1;
        const newSid = "AD" + (10000 + newSn);
        const newStudent = {
            sn: newSn,
            id: "student-" + Date.now(),
            img: student1,
            name: fullName,
            sid: newSid,
            prog: programme,
            email,
            phone,
            status,
            broughtBy,
            search: `${fullName} ${newSid} ${programme} ${broughtBy}`.toLowerCase(),
            lastLogin: "—",
        };
        setStudents((prev) => [...prev, newStudent]);
        setForm({ firstName: "", lastName: "", email: "", phone: "", address: "", programme: "", status: "Active", broughtBy: "" });
        setIsDrawerOpen(false);
    }

    const countText = `${filtered.length} student${filtered.length !== 1 ? "s" : ""}`;

    return (
        <div className="app-layout-container">
            <Sidebar activePage="students" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Student Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={adminAvatar}
                    profileName="Jone Copper"
                    profileRole="Administrator"
                    navItems={ADMIN_NAV}
                    activePage="students"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-people-fill"
                            tag="Students"
                            description="Manage student admissions, programmes, and contact details across the institute."
                        />

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <RosterFilter
                                    heading="All Students"
                                    countText={countText}
                                    filters={[
                                        {
                                            icon: "bi-funnel",
                                            value: programmeFilter,
                                            onChange: (e) => setProgrammeFilter(e.target.value),
                                            options: allProgrammes.map((p) => ({ value: p, label: p === "all" ? "All Programmes" : p })),
                                        },
                                    ]}
                                    addLabel="Create New Student"
                                    onAdd={() => setIsDrawerOpen(true)}
                                />

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="studentTable">
                                        <thead>
                                            <tr>
                                                <th>SN <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Student Name <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Programme <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Phone Number <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Status <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((s) => (
                                                <tr key={s.sid}>
                                                    <td className="marks-table-admission-no">{s.sn}</td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={s.img} alt={s.name} />
                                                            <div>
                                                                <h4>{s.name}</h4>
                                                                <p>Student ID: {s.sid}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{s.prog}</td>
                                                    <td>{s.phone}</td>
                                                    <td><StatusBadge status={s.status} /></td>
                                                    <td>
                                                        <button className="table-view-btn" type="button" onClick={() => openProfile(s)}>View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filtered.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="table-empty-message">No students found matching the filter.</td>
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

            {/* Add Student — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isDrawerOpen}
                onClose={() => { setIsDrawerOpen(false); setForm({ firstName: "", lastName: "", email: "", phone: "", address: "", programme: "", status: "Active", broughtBy: "" }); }}
                title="Create New Student"
                icon="bi-person-plus-fill"
                intro="Complete the form below to create a new student record."
            >
                <form className="form-page-form" onSubmit={handleAdd}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Student Basic Info</span>
                        </div>
                        <FormInput
                            label="First Name"
                            id="studentFirstName"
                            required
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />
                        <FormInput
                            label="Last Name"
                            id="studentLastName"
                            required
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        />
                        <FormInput
                            label="Email Address"
                            id="studentEmail"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <FormInput
                            label="Phone Number"
                            id="studentPhone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <FormInput
                            label="Home Address"
                            id="studentAddress"
                            required
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                    </div>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-mortarboard-fill"></i>
                            <span>Academic Info</span>
                        </div>
                        <FormSelect
                            label="Select Programme"
                            id="studentProgramme"
                            required
                            value={form.programme}
                            onChange={(e) => setForm({ ...form, programme: e.target.value })}
                            placeholder="Select here"
                            options={PROGRAMMES}
                        />
                        <FormSelect
                            label="Select Status"
                            id="studentStatus"
                            required
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            options={["Active", "Inactive"]}
                        />
                        <FormSelect
                            label="Brought By (Counselor)"
                            id="studentBroughtBy"
                            value={form.broughtBy}
                            onChange={(e) => setForm({ ...form, broughtBy: e.target.value })}
                            placeholder="Select counselor (optional)"
                            options={["Adebiyi Abasi", "Grace Okafor"]}
                        />
                    </div>
                    <button type="submit" className="form-page-submit-btn">
                        <i className="bi bi-check-lg"></i>
                        <span>Submit</span>
                    </button>
                </form>
            </SlideDrawer>

            {/* Student Profile — View/Edit Modal */}
            <StudentModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                student={profileData}
                onSave={handleSaveEdit}
                editFields={STUDENT_EDIT_FIELDS}
                editForm={editForm}
                setEditForm={setEditForm}
            />
        </div>
    );
}
