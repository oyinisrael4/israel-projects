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
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import admin3 from "../assets/icon-images/admin-3.png";
import admin4 from "../assets/icon-images/admin-4.png";
import admin5 from "../assets/icon-images/admin-5.png";
import profile2 from "../assets/icon-images/profile-2.png";
import profile3 from "../assets/icon-images/profile-3.png";

const INITIAL_ADMINS = [
    { id: "admin-1", role: "Super Admin", status: "Active", search: "jone copper super admin", img: adminAvatar, name: "Jone Copper", phone: "090 3427 5446", tag: "SUPER ADMIN", bar: "var(--primary-color)", email: "jonecopper@niit.edu", lastLogin: "2026-09-01 10:00 AM" },
    { id: "admin-2", role: "President", status: "Active", search: "oladele philip president", img: admin3, name: "Oladele Philip", phone: "090 3427 5446", tag: "ADMIN", bar: "var(--secondary-color)", email: "oladelephilip@niit.edu", lastLogin: "2026-08-30 08:45 AM" },
    { id: "admin-3", role: "Registrar", status: "Active", search: "kathryn murphy registrar", img: profile2, name: "Kathryn Murphy", phone: "080 9898 7876", tag: "ADMIN", bar: "var(--footer-color)", email: "kathrynmurphy@niit.edu", lastLogin: "2026-08-29 02:45 PM" },
    { id: "admin-4", role: "Technologist", status: "Active", search: "wade warren technologist", img: admin4, name: "Wade Warren", phone: "081 2345 6789", tag: "ADMIN", bar: "var(--primary-color)", email: "wadewarren@niit.edu", lastLogin: "2026-09-02 09:15 AM" },
    { id: "admin-5", role: "Registrar", status: "Inactive", search: "brooklyn simmons registrar", img: admin5, name: "Brooklyn Simmons", phone: "082 3456 7890", tag: "ADMIN", bar: "var(--secondary-color)", email: "brooklynsimmons@niit.edu", lastLogin: "2026-08-18 04:20 PM" },
];

const BAR_COLORS = ["var(--primary-color)", "var(--secondary-color)", "var(--footer-color)"];

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

export default function Admin() {
    const [admins, setAdmins] = useState(INITIAL_ADMINS);
    const [searchValue, setSearchValue] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Drawer states
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Profile modal state
    const [profileData, setProfileData] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Form state
    const [form, setForm] = useState({ title: "", firstName: "", lastName: "", email: "", phone: "", address: "", role: "", status: "Active" });
    const [editForm, setEditForm] = useState({});

    const ADMIN_EDIT_FIELDS = [
        { key: "name", label: "Full Name", type: "text" },
        { key: "email", label: "Email Address", type: "email" },
        { key: "phone", label: "Phone Number", type: "tel" },
        { key: "role", label: "Select Role", type: "select", options: ["Super Admin", "President", "Registrar", "Technologist"] },
        { key: "status", label: "Select Status", type: "select", options: ["Active", "Inactive"] },
    ];

    // Derive unique roles for filter
    const allRoles = useMemo(() => {
        const roles = new Set(admins.map((a) => a.role));
        return ["all", ...roles];
    }, [admins]);

    // Filtered list
    const filteredAdmins = useMemo(() => {
        return admins.filter((a) => {
            const matchesRole = roleFilter === "all" || a.role === roleFilter;
            const matchesStatus = statusFilter === "all" || a.status === statusFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || a.search.includes(query);
            return matchesRole && matchesStatus && matchesSearch;
        });
    }, [admins, roleFilter, statusFilter, searchValue]);

    function openProfile(admin) {
        setProfileData(admin);
        setEditForm({
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            role: admin.role,
            status: admin.status,
        });
        setIsProfileOpen(true);
    }

    function handleAdd(e) {
        e.preventDefault();
        const { title, firstName, lastName, email, phone, role, status } = form;
        if (!firstName || !lastName || !email || !phone || !role) {
            alert("Please fill in all required fields.");
            return;
        }
        const fullName = `${title ? title + " " : ""}${firstName} ${lastName}`;
        const newAdmin = {
            id: "admin-new-" + Date.now(),
            role, status,
            search: `${fullName} ${role}`.toLowerCase(),
            img: adminAvatar,
            name: fullName,
            phone, email,
            tag: role.toUpperCase(),
            bar: BAR_COLORS[admins.length % BAR_COLORS.length],
            lastLogin: "—",
        };
        setAdmins((prev) => [...prev, newAdmin]);
        setForm({ title: "", firstName: "", lastName: "", email: "", phone: "", address: "", role: "", status: "Active" });
        setIsDrawerOpen(false);
    }

    function handleSaveEdit(updatedForm) {
        setAdmins((prev) =>
            prev.map((a) =>
                a.id === profileData.id
                    ? {
                        ...a,
                        name: updatedForm.name,
                        email: updatedForm.email,
                        phone: updatedForm.phone,
                        role: updatedForm.role,
                        status: updatedForm.status,
                        tag: updatedForm.role.toUpperCase(),
                        search: `${updatedForm.name} ${updatedForm.role}`.toLowerCase(),
                    }
                    : a
            )
        );
        setProfileData((prev) => ({ ...prev, name: updatedForm.name, email: updatedForm.email, phone: updatedForm.phone, role: updatedForm.role, status: updatedForm.status }));
    }

    const countText = `${filteredAdmins.length} administrator${filteredAdmins.length !== 1 ? "s" : ""}`;

    return (
        <div className="app-layout-container">
            <Sidebar activePage="admin" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Admin Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={adminAvatar}
                    profileName="Jone Copper"
                    profileRole="Administrator"
                    navItems={ADMIN_NAV}
                    activePage="admin"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-person-badge-fill"
                            tag="Admin"
                            description="Manage administrator accounts, roles, and access across the institute."
                        />

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <RosterFilter
                                    heading="All Administrators"
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
                                    addLabel="Create New Admin"
                                    onAdd={() => setIsDrawerOpen(true)}
                                />

                                <div className="people-card-grid">
                                    {filteredAdmins.map((a) => (
                                        <PersonCard
                                            key={a.id}
                                            img={a.img}
                                            name={a.name}
                                            roleLabel={a.role}
                                            phone={a.phone}
                                            tag={a.tag}
                                            status={a.status}
                                            bar={a.bar}
                                            onClick={() => openProfile(a)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <PageFooter />
                    </div>
                </div>
            </main>

            {/* Create New Admin — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isDrawerOpen}
                onClose={() => { setIsDrawerOpen(false); setForm({ title: "", firstName: "", lastName: "", email: "", phone: "", address: "", role: "", status: "Active" }); }}
                title="Create New Admin"
                icon="bi-person-plus-fill"
                intro="You are about to create a new admin. Please complete the form below with accurate details."
            >
                <form className="form-page-form" onSubmit={handleAdd}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Admin Basic Info</span>
                        </div>
                        <FormSelect
                            label="Title"
                            id="adminTitle"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Select here"
                            options={["Mr", "Mrs", "Miss", "Dr", "Prof"]}
                        />
                        <FormInput
                            label="First Name"
                            id="adminFirstName"
                            required
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />
                        <FormInput
                            label="Last Name"
                            id="adminLastName"
                            required
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        />
                        <FormInput
                            label="Email Address"
                            id="adminEmail"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <FormInput
                            label="Phone Number"
                            id="adminPhone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <FormInput
                            label="Home Address"
                            id="adminAddress"
                            required
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                    </div>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-shield-lock-fill"></i>
                            <span>Administrative Info</span>
                        </div>
                        <FormSelect
                            label="Select Role"
                            id="adminRole"
                            required
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            placeholder="Select here"
                            options={["Super Admin", "President", "Registrar", "Technologist"]}
                        />
                        <FormSelect
                            label="Select Status"
                            id="adminStatus"
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

            {/* Administrative Profile — View/Edit Modal */}
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                title="Administrative Profile"
                icon="bi-person-badge-fill"
                maxWidth="760px"
                data={profileData ? {
                    avatar: profileData.img,
                    fullName: profileData.name,
                    email: profileData.email,
                    position: profileData.role,
                    phone: profileData.phone,
                    status: profileData.status,
                    lastLogin: profileData.lastLogin || "—",
                } : null}
                onEdit={() => {}}
                editForm={editForm}
                setEditForm={setEditForm}
                onSaveEdit={handleSaveEdit}
                editFields={ADMIN_EDIT_FIELDS}
            />
        </div>
    );
}
