import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import PersonCard from "../components/PersonCard";
import SlideDrawer from "../components/SlideDrawer";
import ProfileModal from "../components/ProfileModal";
import RosterFilter from "../components/RosterFilter";
import { FormInput, FormSelect } from "../components/FormField";
import teacherAvatar from "../assets/icon-images/teacher-avatar.png";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import staff1 from "../assets/icon-images/staff-1.png";
import staff2 from "../assets/icon-images/staff-2.png";
import instructor4 from "../assets/icon-images/instructor-4.png";

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

const INITIAL_STAFF = [
    { id: "staff-1", role: "Tutor", status: "Active", search: "courtney henry tutor web development", img: teacherAvatar, name: "Courtney Henry", roleLabel: "Tutor — Diploma in Web Development", phone: "080 3123 4567", tag: "TUTOR", bar: "var(--primary-color)", email: "courtneyhenry@niit.edu", lastLogin: "2026-08-30 09:12 AM", position: "Tutor — Web Development" },
    { id: "staff-2", role: "Tutor", status: "Inactive", search: "robert fox tutor cybersecurity", img: staff1, name: "Robert Fox", roleLabel: "Tutor — CyberOps & Certified Ethical Hacking", phone: "081 0345 6789", tag: "TUTOR", bar: "var(--footer-color)", email: "robertfox@niit.edu", lastLogin: "2026-08-20 08:03 AM", position: "Tutor — Cybersecurity" },
    { id: "staff-3", role: "Senior Lecturer", status: "Active", search: "eleanor pena senior lecturer data analysis", img: staff2, name: "Eleanor Pena", roleLabel: "Senior Lecturer — Data Analysis", phone: "081 3456 7890", tag: "SENIOR LECTURER", bar: "var(--secondary-color)", email: "eleanorpena@niit.edu", lastLogin: "2026-08-31 11:20 AM", position: "Senior Lecturer — Data Analysis" },
    { id: "staff-4", role: "Lecturer", status: "Active", search: "leslie alexander lecturer networking", img: instructor4, name: "Leslie Alexander", roleLabel: "Lecturer — CCNA / CCNP & IT Essentials", phone: "081 6567 8901", tag: "LECTURER", bar: "var(--primary-color)", email: "lesliealexander@niit.edu", lastLogin: "2026-09-01 01:40 PM", position: "Lecturer — Networking" },
];

const PROGRAMMES = [
    "Hardware & Networking", "Desktop Publishing (MS Office Suite)", "MasterMind Series (MIS)",
    "CCNA / CCNP", "IT Essentials", "Diploma in .NET Technologies", "Diploma in Web Development",
    "Data Analysis", "Diploma in Java", "Diploma in Python", "Java with DevOps",
    "Graphics Design", "UI/UX Design", "Project Management (PMP)", "Multimedia",
    "Game Development", "CyberOps", "Certified Ethical Hacking",
];

const BAR_COLORS = ["var(--primary-color)", "var(--secondary-color)", "var(--footer-color)"];

export default function Staff() {
    const [staff, setStaff] = useState(INITIAL_STAFF);
    const [searchValue, setSearchValue] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Drawer states
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const STAFF_EDIT_FIELDS = [
        { key: "name", label: "Full Name", type: "text" },
        { key: "email", label: "Email Address", type: "email" },
        { key: "phone", label: "Phone Number", type: "tel" },
        { key: "position", label: "Position", type: "text" },
        { key: "role", label: "Select Role", type: "select", options: ["Tutor", "Lecturer", "Senior Lecturer", "Technologist"] },
        { key: "status", label: "Select Status", type: "select", options: ["Active", "Inactive"] },
    ];

    // Profile modal state
    const [profileData, setProfileData] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Form state
    const [form, setForm] = useState({ title: "", firstName: "", lastName: "", email: "", phone: "", address: "", role: "", programme: "", status: "Active" });
    const [editForm, setEditForm] = useState({});

    // Derive unique roles for filter
    const allRoles = useMemo(() => {
        const roles = new Set(staff.map((s) => s.role));
        return ["all", ...roles];
    }, [staff]);

    // Filtered list
    const filteredStaff = useMemo(() => {
        return staff.filter((s) => {
            const matchesRole = roleFilter === "all" || s.role === roleFilter;
            const matchesStatus = statusFilter === "all" || s.status === statusFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || s.search.includes(query);
            return matchesRole && matchesStatus && matchesSearch;
        });
    }, [staff, roleFilter, statusFilter, searchValue]);

    function openProfile(member) {
        setProfileData(member);
        setEditForm({
            name: member.name,
            email: member.email,
            phone: member.phone,
            role: member.role,
            status: member.status,
            position: member.position,
        });
        setIsProfileOpen(true);
    }

    function handleAdd(e) {
        e.preventDefault();
        const { title, firstName, lastName, email, phone, role, programme, status } = form;
        if (!firstName || !lastName || !email || !phone || !role || !programme) {
            alert("Please fill in all required fields.");
            return;
        }
        const fullName = `${title ? title + " " : ""}${firstName} ${lastName}`;
        const position = `${role} — ${programme}`;
        const newMember = {
            id: "staff-new-" + Date.now(),
            role, status,
            search: `${fullName} ${role} ${programme}`.toLowerCase(),
            img: teacherAvatar,
            name: fullName,
            roleLabel: position,
            phone, email,
            tag: role.toUpperCase(),
            bar: BAR_COLORS[staff.length % BAR_COLORS.length],
            lastLogin: "—",
            position,
        };
        setStaff((prev) => [...prev, newMember]);
        setForm({ title: "", firstName: "", lastName: "", email: "", phone: "", address: "", role: "", programme: "", status: "Active" });
        setIsDrawerOpen(false);
    }

    function handleSaveEdit(updatedForm) {
        setStaff((prev) =>
            prev.map((s) =>
                s.id === profileData.id
                    ? {
                        ...s,
                        name: updatedForm.name,
                        email: updatedForm.email,
                        phone: updatedForm.phone,
                        role: updatedForm.role,
                        status: updatedForm.status,
                        tag: updatedForm.role.toUpperCase(),
                        position: updatedForm.position,
                        search: `${updatedForm.name} ${updatedForm.role}`.toLowerCase(),
                    }
                    : s
            )
        );
        setProfileData((prev) => ({ ...prev, name: updatedForm.name, email: updatedForm.email, phone: updatedForm.phone, role: updatedForm.role, status: updatedForm.status, position: updatedForm.position }));
    }

    const countText = `${filteredStaff.length} staff member${filteredStaff.length !== 1 ? "s" : ""}`;

    return (
        <div className="app-layout-container">
            <Sidebar activePage="staff" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Staff Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={adminAvatar}
                    profileName="Jone Copper"
                    profileRole="Administrator"
                    navItems={ADMIN_NAV}
                    activePage="staff"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-easel2-fill"
                            tag="Staff"
                            description="Manage tutors and lecturers, their programmes, and access across the institute."
                        />

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <RosterFilter
                                    heading="All Staff"
                                    countText={countText}
                                    filters={[
                                        {
                                            icon: "bi-funnel",
                                            value: roleFilter,
                                            onChange: (e) => setRoleFilter(e.target.value),
                                            options: allRoles.map((r) => ({ value: r, label: r === "all" ? "All Roles" : r })),
                                        },
                                        {
                                            icon: "bi-toggle2-on",
                                            value: statusFilter,
                                            onChange: (e) => setStatusFilter(e.target.value),
                                            options: [
                                                { value: "all", label: "All Status" },
                                                { value: "Active", label: "Active" },
                                                { value: "Inactive", label: "Inactive" },
                                            ],
                                        },
                                    ]}
                                    addLabel="Create New Staff"
                                    onAdd={() => setIsDrawerOpen(true)}
                                />

                                <div className="people-card-grid">
                                    {filteredStaff.map((s) => (
                                        <PersonCard
                                            key={s.id}
                                            img={s.img}
                                            name={s.name}
                                            roleLabel={s.roleLabel}
                                            phone={s.phone}
                                            tag={s.tag}
                                            status={s.status}
                                            bar={s.bar}
                                            onClick={() => openProfile(s)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <PageFooter />
                    </div>
                </div>
            </main>

            {/* Create New Staff — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isDrawerOpen}
                onClose={() => { setIsDrawerOpen(false); setForm({ title: "", firstName: "", lastName: "", email: "", phone: "", address: "", role: "", programme: "", status: "Active" }); }}
                title="Create New Staff"
                icon="bi-person-plus-fill"
                intro="Complete the form below to add a new staff member."
            >
                <form className="form-page-form" onSubmit={handleAdd}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Staff Basic Info</span>
                        </div>
                        <FormSelect
                            label="Select Title"
                            id="staffTitle"
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Select here"
                            options={["Mr", "Mrs", "Miss", "Dr"]}
                        />
                        <FormInput
                            label="First Name"
                            id="staffFirstName"
                            required
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />
                        <FormInput
                            label="Last Name"
                            id="staffLastName"
                            required
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        />
                        <FormInput
                            label="Email Address"
                            id="staffEmail"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <FormInput
                            label="Phone Number"
                            id="staffPhone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <FormInput
                            label="Home Address"
                            id="staffAddress"
                            required
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                    </div>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-mortarboard-fill"></i>
                            <span>Teaching Info</span>
                        </div>
                        <FormSelect
                            label="Select Role"
                            id="staffRole"
                            required
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            placeholder="Select here"
                            options={["Tutor", "Lecturer", "Senior Lecturer", "Technologist"]}
                        />
                        <FormSelect
                            label="Select Programme"
                            id="staffProgramme"
                            required
                            value={form.programme}
                            onChange={(e) => setForm({ ...form, programme: e.target.value })}
                            placeholder="Select here"
                            options={PROGRAMMES}
                        />
                        <FormSelect
                            label="Select Status"
                            id="staffStatus"
                            required
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            options={["Active", "Inactive"]}
                        />
                    </div>
                    <button type="submit" className="form-page-submit-btn">
                        <i className="bi bi-check-lg"></i>
                        <span>Submit</span>
                    </button>
                </form>
            </SlideDrawer>

            {/* Staff Profile — View/Edit Modal */}
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                title="Staff Profile"
                icon="bi-easel2-fill"
                maxWidth="760px"
                data={profileData ? {
                    avatar: profileData.img,
                    fullName: profileData.name,
                    email: profileData.email,
                    position: profileData.position,
                    phone: profileData.phone,
                    status: profileData.status,
                    lastLogin: profileData.lastLogin || "—",
                } : null}
                onEdit={() => {}}
                editForm={editForm}
                setEditForm={setEditForm}
                onSaveEdit={handleSaveEdit}
                editFields={STAFF_EDIT_FIELDS}
            />
        </div>
    );
}
