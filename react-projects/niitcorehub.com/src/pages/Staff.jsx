import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import PersonCard from "../components/PersonCard";
import SlideDrawer from "../components/SlideDrawer";
import ProfileModal from "../components/ProfileModal";
import AlertModal from "../components/AlertModal";
import RosterFilter from "../components/RosterFilter";
import { FormInput, FormSelect } from "../components/FormField";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import teacherAvatar from "../assets/icon-images/teacher-avatar.png";
import { useStaffData } from "../context/StaffDataContext";
import { useAuth } from "../context/AuthContext";

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

// All role options including Admin & Counselor
const ALL_ROLES = [
    "Tutor", "Lecturer", "Senior Lecturer", "Technologist",
    "Admin", "Super Admin", "President", "Registrar",
    "Counselor",
];

// Roles that require a programme (teaching staff only)
const TEACHING_ROLES = ["Tutor", "Lecturer", "Senior Lecturer", "Technologist"];
const ADMIN_ROLES = ["Admin", "Super Admin", "President", "Registrar", "Technologist"];
const COUNSELOR_ROLES = ["Counselor"];

function getCategoryFromRole(role) {
    if (COUNSELOR_ROLES.includes(role)) return "counselor";
    if (ADMIN_ROLES.includes(role)) return "admin";
    return "staff";
}

export default function Staff() {
    const { user } = useAuth();
    const isCounselor =
        (user?.roleName || "").toLowerCase().includes("counselor") ||
        (user?.role || "").toLowerCase().includes("counselor");

    const { allStaff, addStaffMember, updateStaffMember } = useStaffData();
    const [searchValue, setSearchValue] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Drawer states
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Profile modal state
    const [profileData, setProfileData] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [createdStaffModal, setCreatedStaffModal] = useState(null);

    const STAFF_EDIT_FIELDS = [
        { key: "name", label: "Full Name", type: "text" },
        { key: "email", label: "Email Address", type: "email" },
        { key: "phone", label: "Phone Number", type: "tel" },
        { key: "position", label: "Position", type: "text" },
        { key: "role", label: "Select Role", type: "select", options: ALL_ROLES },
        { key: "status", label: "Select Status", type: "select", options: ["Active", "Inactive"] },
    ];

    // Form state
    const [form, setForm] = useState({
        title: "", firstName: "", lastName: "", email: "", phone: "", address: "",
        role: "", programme: "", status: "Active",
    });
    const [editForm, setEditForm] = useState({});

    // Determine if the selected role needs a programme field
    const roleNeedsProgramme = TEACHING_ROLES.includes(form.role);

    // Derive unique roles for filter from all staff
    const allRoles = useMemo(() => {
        const roles = new Set(allStaff.map((s) => s.role));
        return ["all", ...roles];
    }, [allStaff]);

    // Filtered list — shows ALL staff/admin/counselor members
    const filteredStaff = useMemo(() => {
        return allStaff.filter((s) => {
            const matchesRole = roleFilter === "all" || s.role === roleFilter;
            const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;
            const matchesStatus = statusFilter === "all" || s.status === statusFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || s.search.includes(query);
            return matchesRole && matchesCategory && matchesStatus && matchesSearch;
        });
    }, [allStaff, roleFilter, categoryFilter, statusFilter, searchValue]);

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
        const needsProgramme = TEACHING_ROLES.includes(role);
        if (!firstName || !lastName || !email || !phone || !role) {
            alert("Please fill in all required fields.");
            return;
        }
        if (needsProgramme && !programme) {
            alert("Please select a programme for this staff role.");
            return;
        }
        const fullName = `${title ? title + " " : ""}${firstName} ${lastName}`;
        const category = getCategoryFromRole(role);
        const position = needsProgramme ? `${role} — ${programme}` : role;
        const cleanEmail = email.trim().toLowerCase();
        const newMember = {
            category,
            role,
            status,
            search: `${fullName} ${role} ${programme || ""}`.toLowerCase(),
            img: category === "counselor" ? adminAvatar : teacherAvatar,
            name: fullName,
            roleLabel: category === "counselor" ? "Student Counselor" : position,
            phone,
            email: cleanEmail,
            tag: role.toUpperCase(),
            lastLogin: "—",
            position,
        };

        const addedItem = addStaffMember(newMember);

        // Provision their account with a temporary random password
        try {
            const tempPassword = Math.random().toString(36).slice(-8);
            const staffAccount = {
                id: addedItem?.id || "STF" + Date.now().toString().slice(-6),
                name: fullName,
                firstName,
                lastName,
                email: cleanEmail,
                phone: phone.trim(),
                role,
                roleName: role,
                category,
                password: tempPassword,
                temporaryPassword: tempPassword,
                requiresReset: true,
                createdAt: new Date().toISOString(),
            };
            const existing = JSON.parse(localStorage.getItem("niit_registered_staff") || "[]");
            const filtered = existing.filter((acc) => acc.email !== cleanEmail);
            filtered.push(staffAccount);
            localStorage.setItem("niit_registered_staff", JSON.stringify(filtered));
        } catch {
            // Ignore
        }

        setForm({ title: "", firstName: "", lastName: "", email: "", phone: "", address: "", role: "", programme: "", status: "Active" });
        setIsDrawerOpen(false);
        setCreatedStaffModal({ fullName, role, email: cleanEmail });
    }

    function handleSaveEdit(updatedForm) {
        if (!profileData) return;
        const newCategory = getCategoryFromRole(updatedForm.role);
        updateStaffMember(profileData.id, {
            name: updatedForm.name,
            email: updatedForm.email,
            phone: updatedForm.phone,
            role: updatedForm.role,
            status: updatedForm.status,
            tag: updatedForm.role.toUpperCase(),
            position: updatedForm.position || updatedForm.role,
            category: newCategory,
        });
        setProfileData((prev) => ({ ...prev, ...updatedForm, category: newCategory }));
    }

    const countText = `${filteredStaff.length} member${filteredStaff.length !== 1 ? "s" : ""}`;

    // Category badge helper
    const categoryLabel = { staff: "Staff", admin: "Admin", counselor: "Counselor" };

    return (
        <div className="app-layout-container">
            <Sidebar activePage="staff" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search All Staff Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={adminAvatar}
                    profileName="Israel Oyinlola"
                    profileRole="Super Admin"
                    navItems={ADMIN_NAV}
                    activePage="staff"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-easel2-fill"
                            tag="Staff"
                            description="Manage all staff members including tutors, lecturers, administrators, and counselors."
                        />

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <RosterFilter
                                    heading="All Staff Members"
                                    countText={countText}
                                    filters={[
                                        {
                                            icon: "bi-layers",
                                            value: categoryFilter,
                                            onChange: (e) => setCategoryFilter(e.target.value),
                                            options: [
                                                { value: "all", label: "All Categories" },
                                                { value: "staff", label: "Teaching Staff" },
                                                { value: "admin", label: "Administrators" },
                                                { value: "counselor", label: "Counselors" },
                                            ],
                                        },
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
                                    {filteredStaff.length === 0 && (
                                        <div className="staff-empty-state">
                                            <i className="bi bi-people"></i>
                                            <p>No staff members found matching the current filter.</p>
                                        </div>
                                    )}
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
                onClose={() => {
                    setIsDrawerOpen(false);
                    setForm({ title: "", firstName: "", lastName: "", email: "", phone: "", address: "", role: "", programme: "", status: "Active" });
                }}
                title="Create New Staff"
                icon="bi-person-plus-fill"
                intro="Complete the form below to add a new staff member. Choose their role — Admins and Counselors will appear on their respective pages as well."
            >
                <form className="form-page-form" onSubmit={handleAdd}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Basic Info</span>
                        </div>
                        <FormSelect
                            label="Select Title"
                            id="staffTitle"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Select here"
                            options={["Mr", "Mrs", "Miss", "Dr", "Prof"]}
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
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                    </div>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-mortarboard-fill"></i>
                            <span>Role & Assignment</span>
                        </div>
                        <FormSelect
                            label="Select Role"
                            id="staffRole"
                            required
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value, programme: "" })}
                            placeholder="Select here"
                            options={ALL_ROLES}
                        />
                        {form.role && (
                            <div className="staff-role-hint">
                                <i className={`bi ${getCategoryFromRole(form.role) === "admin" ? "bi-person-badge-fill" : getCategoryFromRole(form.role) === "counselor" ? "bi-chat-heart-fill" : "bi-easel2-fill"}`}></i>
                                <span>
                                    This member will appear under{" "}
                                    <strong>{categoryLabel[getCategoryFromRole(form.role)] || "Staff"}</strong>
                                </span>
                            </div>
                        )}
                        {roleNeedsProgramme && (
                            <FormSelect
                                label="Select Programme"
                                id="staffProgramme"
                                required
                                value={form.programme}
                                onChange={(e) => setForm({ ...form, programme: e.target.value })}
                                placeholder="Select here"
                                options={PROGRAMMES}
                            />
                        )}
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

            {createdStaffModal && (
                <AlertModal
                    message="Staff Account Created Successfully!"
                    subMessage={`An account has been created for ${createdStaffModal.fullName} with the role of "${createdStaffModal.role}". They can now access the staff portal by navigating to the login page and clicking "Forgot Password" with their email address (${createdStaffModal.email}) to set their own secure password.`}
                    onClose={() => setCreatedStaffModal(null)}
                />
            )}
        </div>
    );
}
