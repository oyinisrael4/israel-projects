import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import PersonCard from "../components/PersonCard";
import ProfileModal from "../components/ProfileModal";
import RosterFilter from "../components/RosterFilter";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
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

const ADMIN_EDIT_FIELDS = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
    { key: "role", label: "Select Role", type: "select", options: ["Super Admin", "President", "Registrar", "Technologist"] },
    { key: "status", label: "Select Status", type: "select", options: ["Active", "Inactive"] },
];

export default function Admin() {
    const { user } = useAuth();
    const isCounselor =
        (user?.roleName || "").toLowerCase().includes("counselor") ||
        (user?.role || "").toLowerCase().includes("counselor");

    const { adminMembers, updateStaffMember } = useStaffData();
    const [searchValue, setSearchValue] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Profile modal state
    const [profileData, setProfileData] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [editForm, setEditForm] = useState({});

    // Derive unique roles for filter
    const allRoles = useMemo(() => {
        const roles = new Set(adminMembers.map((a) => a.role));
        return ["all", ...roles];
    }, [adminMembers]);

    // Filtered list
    const filteredAdmins = useMemo(() => {
        return adminMembers.filter((a) => {
            const matchesRole = roleFilter === "all" || a.role === roleFilter;
            const matchesStatus = statusFilter === "all" || a.status === statusFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || a.search.includes(query);
            return matchesRole && matchesStatus && matchesSearch;
        });
    }, [adminMembers, roleFilter, statusFilter, searchValue]);

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

    function handleSaveEdit(updatedForm) {
        if (!profileData) return;
        updateStaffMember(profileData.id, {
            name: updatedForm.name,
            email: updatedForm.email,
            phone: updatedForm.phone,
            role: updatedForm.role,
            status: updatedForm.status,
            tag: updatedForm.role.toUpperCase(),
        });
        setProfileData((prev) => ({ ...prev, ...updatedForm }));
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
                    profileName="Isreal Oyinlola"
                    profileRole="Super Admin"
                    navItems={ADMIN_NAV}
                    activePage="admin"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-person-badge-fill"
                            tag="Admin"
                            description="View and manage administrator accounts, roles, and access across the institute. To add new admins, go to the Staff page and select an Admin role."
                        />

                        <div className="admin-info-banner">
                            <i className="bi bi-info-circle-fill"></i>
                            <span>Administrators are managed from the <strong>Staff</strong> page. Select an Admin role when creating a new staff member to add them here.</span>
                        </div>

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
                                    {filteredAdmins.length === 0 && (
                                        <div className="staff-empty-state">
                                            <i className="bi bi-person-badge"></i>
                                            <p>No administrators found matching the current filter.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <PageFooter />
                    </div>
                </div>
            </main>

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
