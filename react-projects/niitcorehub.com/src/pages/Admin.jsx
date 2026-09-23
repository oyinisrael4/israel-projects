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

export default function Admin() {
    const [admins, setAdmins] = useState(INITIAL_ADMINS);
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
    const [form, setForm] = useState({ title: "", firstName: "", lastName: "", email: "", phone: "", address: "", role: "", status: "Active" });
    const [editForm, setEditForm] = useState({});

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

    function openEditDrawer() {
        if (!profileData) return;
        setEditForm({
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            role: profileData.role,
            status: profileData.status,
        });
        setIsProfileOpen(false);
        setIsEditDrawerOpen(true);
    }

    function handleEdit(e) {
        e.preventDefault();
        setAdmins((prev) =>
            prev.map((a) =>
                a.id === profileData.id
                    ? {
                        ...a,
                        name: editForm.name,
                        email: editForm.email,
                        phone: editForm.phone,
                        role: editForm.role,
                        status: editForm.status,
                        tag: editForm.role.toUpperCase(),
                        search: `${editForm.name} ${editForm.role}`.toLowerCase(),
                    }
                    : a
            )
        );
        setProfileData((prev) => ({ ...prev, name: editForm.name, email: editForm.email, phone: editForm.phone, role: editForm.role, status: editForm.status }));
        setIsEditDrawerOpen(false);
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
                        <FormField label="Title" htmlFor="adminTitle">
                            <select id="adminTitle" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}>
                                <option value="">Select here</option>
                                <option>Mr</option><option>Mrs</option><option>Miss</option><option>Dr</option><option>Prof</option>
                            </select>
                        </FormField>
                        <FormField label="First Name" htmlFor="adminFirstName" required>
                            <input type="text" id="adminFirstName" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                        </FormField>
                        <FormField label="Last Name" htmlFor="adminLastName" required>
                            <input type="text" id="adminLastName" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                        </FormField>
                        <FormField label="Email Address" htmlFor="adminEmail" required>
                            <input type="email" id="adminEmail" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </FormField>
                        <FormField label="Phone Number" htmlFor="adminPhone" required>
                            <input type="tel" id="adminPhone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </FormField>
                        <FormField label="Home Address" htmlFor="adminAddress" required>
                            <input type="text" id="adminAddress" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                        </FormField>
                    </div>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-shield-lock-fill"></i>
                            <span>Administrative Info</span>
                        </div>
                        <FormField label="Select Role" htmlFor="adminRole" required>
                            <select id="adminRole" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                                <option value="" disabled>Select here</option>
                                <option>Super Admin</option><option>President</option><option>Registrar</option><option>Technologist</option>
                            </select>
                        </FormField>
                        <FormField label="Select Status" htmlFor="adminStatus" required>
                            <select id="adminStatus" required value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                                <option>Active</option><option>Inactive</option>
                            </select>
                        </FormField>
                    </div>
                    <button type="submit" className="form-page-submit-btn">
                        <i className="bi bi-check-lg"></i>
                        <span>Submit</span>
                    </button>
                </form>
            </SlideDrawer>

            {/* Edit Admin Info — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
                title="Edit Admin Info"
                icon="bi-pencil-square"
                intro="Update the administrator's information below."
            >
                <form className="form-page-form" onSubmit={handleEdit}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Admin Basic Info</span>
                        </div>
                        <FormField label="Full Name" htmlFor="editAdminName" required>
                            <input type="text" id="editAdminName" required value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                        </FormField>
                        <FormField label="Email Address" htmlFor="editAdminEmail" required>
                            <input type="email" id="editAdminEmail" required value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                        </FormField>
                        <FormField label="Phone Number" htmlFor="editAdminPhone" required>
                            <input type="tel" id="editAdminPhone" required value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                        </FormField>
                    </div>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-shield-lock-fill"></i>
                            <span>Administrative Info</span>
                        </div>
                        <FormField label="Select Role" htmlFor="editAdminRole" required>
                            <select id="editAdminRole" required value={editForm.role || ""} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}>
                                <option value="" disabled>Select here</option>
                                <option>Super Admin</option><option>President</option><option>Registrar</option><option>Technologist</option>
                            </select>
                        </FormField>
                        <FormField label="Select Status" htmlFor="editAdminStatus" required>
                            <select id="editAdminStatus" required value={editForm.status || "Active"} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
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

            {/* Administrative Profile — View Modal */}
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
                onEdit={openEditDrawer}
            />
        </div>
    );
}
