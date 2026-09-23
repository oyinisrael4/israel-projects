import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import PersonCard from "../components/PersonCard";
import SlideDrawer from "../components/SlideDrawer";
import ProfileModal from "../components/ProfileModal";
import RosterFilter from "../components/RosterFilter";
import FormField from "../components/FormField";
import teacherAvatar from "../assets/icon-images/teacher-avatar.png";
import staff1 from "../assets/icon-images/staff-1.png";
import staff2 from "../assets/icon-images/staff-2.png";
import instructor4 from "../assets/icon-images/instructor-4.png";

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
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

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

    function openEditDrawer() {
        if (!profileData) return;
        setEditForm({
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            role: profileData.role,
            status: profileData.status,
            position: profileData.position,
        });
        setIsProfileOpen(false);
        setIsEditDrawerOpen(true);
    }

    function handleEdit(e) {
        e.preventDefault();
        setStaff((prev) =>
            prev.map((s) =>
                s.id === profileData.id
                    ? {
                        ...s,
                        name: editForm.name,
                        email: editForm.email,
                        phone: editForm.phone,
                        role: editForm.role,
                        status: editForm.status,
                        tag: editForm.role.toUpperCase(),
                        position: editForm.position,
                        search: `${editForm.name} ${editForm.role}`.toLowerCase(),
                    }
                    : s
            )
        );
        setProfileData((prev) => ({ ...prev, name: editForm.name, email: editForm.email, phone: editForm.phone, role: editForm.role, status: editForm.status, position: editForm.position }));
        setIsEditDrawerOpen(false);
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
                        <FormField label="Select Title" htmlFor="staffTitle" required>
                            <select id="staffTitle" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}>
                                <option value="" disabled>Select here</option>
                                <option>Mr</option><option>Mrs</option><option>Miss</option><option>Dr</option>
                            </select>
                        </FormField>
                        <FormField label="First Name" htmlFor="staffFirstName" required>
                            <input type="text" id="staffFirstName" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                        </FormField>
                        <FormField label="Last Name" htmlFor="staffLastName" required>
                            <input type="text" id="staffLastName" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                        </FormField>
                        <FormField label="Email Address" htmlFor="staffEmail" required>
                            <input type="email" id="staffEmail" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </FormField>
                        <FormField label="Phone Number" htmlFor="staffPhone" required>
                            <input type="tel" id="staffPhone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </FormField>
                        <FormField label="Home Address" htmlFor="staffAddress" required>
                            <input type="text" id="staffAddress" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                        </FormField>
                    </div>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-mortarboard-fill"></i>
                            <span>Teaching Info</span>
                        </div>
                        <FormField label="Select Role" htmlFor="staffRole" required>
                            <select id="staffRole" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                                <option value="" disabled>Select here</option>
                                <option>Tutor</option><option>Lecturer</option><option>Senior Lecturer</option><option>Technologist</option>
                            </select>
                        </FormField>
                        <FormField label="Select Programme" htmlFor="staffProgramme" required>
                            <select id="staffProgramme" required value={form.programme} onChange={(e) => setForm({ ...form, programme: e.target.value })}>
                                <option value="" disabled>Select here</option>
                                {PROGRAMMES.map((p) => <option key={p}>{p}</option>)}
                            </select>
                        </FormField>
                        <FormField label="Select Status" htmlFor="staffStatus" required>
                            <select id="staffStatus" required value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </FormField>
                    </div>
                    <button type="submit" className="form-page-submit-btn">
                        <i className="bi bi-check-lg"></i>
                        <span>Submit</span>
                    </button>
                </form>
            </SlideDrawer>

            {/* Edit Staff Info — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
                title="Edit Staff Info"
                icon="bi-pencil-square"
                intro="Update the staff member's information below."
            >
                <form className="form-page-form" onSubmit={handleEdit}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Staff Basic Info</span>
                        </div>
                        <FormField label="Full Name" htmlFor="editStaffName" required>
                            <input type="text" id="editStaffName" required value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                        </FormField>
                        <FormField label="Email Address" htmlFor="editStaffEmail" required>
                            <input type="email" id="editStaffEmail" required value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                        </FormField>
                        <FormField label="Phone Number" htmlFor="editStaffPhone" required>
                            <input type="tel" id="editStaffPhone" required value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                        </FormField>
                        <FormField label="Position" htmlFor="editStaffPosition" required>
                            <input type="text" id="editStaffPosition" required value={editForm.position || ""} onChange={(e) => setEditForm({ ...editForm, position: e.target.value })} />
                        </FormField>
                    </div>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-mortarboard-fill"></i>
                            <span>Teaching Info</span>
                        </div>
                        <FormField label="Select Role" htmlFor="editStaffRole" required>
                            <select id="editStaffRole" required value={editForm.role || ""} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}>
                                <option value="" disabled>Select here</option>
                                <option>Tutor</option><option>Lecturer</option><option>Senior Lecturer</option><option>Technologist</option>
                            </select>
                        </FormField>
                        <FormField label="Select Status" htmlFor="editStaffStatus" required>
                            <select id="editStaffStatus" required value={editForm.status || "Active"} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                                <option>Active</option><option>Inactive</option>
                            </select>
                        </FormField>
                    </div>
                    <button type="submit" className="form-page-submit-btn">
                        <i className="bi bi-check-lg"></i>
                        <span>Save Changes</span>
                    </button>
                </form>
            </SlideDrawer>

            {/* Staff Profile — View Modal */}
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
                onEdit={openEditDrawer}
            />
        </div>
    );
}
