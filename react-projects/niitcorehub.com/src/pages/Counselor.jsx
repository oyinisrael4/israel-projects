import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import PersonCard from "../components/PersonCard";
import ProfileModal from "../components/ProfileModal";
import RosterFilter from "../components/RosterFilter";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import admin4 from "../assets/icon-images/admin-4.png";
import { useStaffData } from "../context/StaffDataContext";

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

const COUNSELOR_EDIT_FIELDS = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
    { key: "position", label: "Counseling Focus", type: "text" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
];

export default function Counselor() {
    const { counselorMembers, updateStaffMember } = useStaffData();
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Profile modal state
    const [profileData, setProfileData] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [editForm, setEditForm] = useState({});

    // Filtered list
    const filteredCounselors = useMemo(() => {
        return counselorMembers.filter((c) => {
            const matchesStatus = statusFilter === "all" || c.status === statusFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || (c.search && c.search.includes(query)) || (c.name && c.name.toLowerCase().includes(query));
            return matchesStatus && matchesSearch;
        });
    }, [counselorMembers, statusFilter, searchValue]);

    function openProfile(counselor) {
        setProfileData(counselor);
        setEditForm({
            name: counselor.name,
            email: counselor.email,
            phone: counselor.phone,
            position: counselor.position || "Student Counselor",
            status: counselor.status,
        });
        setIsProfileOpen(true);
    }

    function handleSaveEdit(updatedForm) {
        if (!profileData) return;
        updateStaffMember(profileData.id, {
            name: updatedForm.name,
            email: updatedForm.email,
            phone: updatedForm.phone,
            position: updatedForm.position,
            status: updatedForm.status,
        });
        setProfileData((prev) => ({ ...prev, ...updatedForm }));
    }

    const countText = `${filteredCounselors.length} counselor${filteredCounselors.length !== 1 ? "s" : ""}`;

    return (
        <div className="app-layout-container">
            <Sidebar activePage="counselor" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Counselor Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={adminAvatar}
                    profileName="Israel Oyinlola"
                    profileRole="Super Admin"
                    navItems={ADMIN_NAV}
                    activePage="counselor"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-chat-heart-fill"
                            tag="Counselor"
                            description="View and oversee student counselors across the institute. Counselors are registered from the Staff page by selecting the Counselor role."
                        />

                        <div className="admin-info-banner">
                            <i className="bi bi-info-circle-fill"></i>
                            <span>Counselors are registered from the <strong>Staff</strong> page. Select the Counselor role when creating a new staff member to automatically provision them here.</span>
                        </div>

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <RosterFilter
                                    heading="All Counselors"
                                    countText={countText}
                                    filters={[
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
                                    {filteredCounselors.map((c) => (
                                        <PersonCard
                                            key={c.id}
                                            img={c.img || admin4}
                                            name={c.name}
                                            roleLabel={c.position || "Student Counselor"}
                                            phone={c.phone}
                                            tag="COUNSELOR"
                                            status={c.status}
                                            bar={c.bar}
                                            onClick={() => openProfile(c)}
                                        />
                                    ))}
                                    {filteredCounselors.length === 0 && (
                                        <div className="staff-empty-state">
                                            <i className="bi bi-chat-heart"></i>
                                            <p>No counselors found matching the current filter.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <PageFooter />
                    </div>
                </div>
            </main>

            {/* Counselor Profile — View/Edit Modal */}
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                title="Counselor Profile"
                icon="bi-chat-heart-fill"
                maxWidth="760px"
                data={profileData ? {
                    avatar: profileData.img || admin4,
                    fullName: profileData.name,
                    email: profileData.email,
                    position: profileData.position || "Student Counselor",
                    phone: profileData.phone,
                    status: profileData.status,
                    lastLogin: profileData.lastLogin || "—",
                } : null}
                onEdit={() => {}}
                editForm={editForm}
                setEditForm={setEditForm}
                onSaveEdit={handleSaveEdit}
                editFields={COUNSELOR_EDIT_FIELDS}
            />
        </div>
    );
}
