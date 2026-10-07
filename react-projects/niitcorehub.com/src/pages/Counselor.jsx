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
import admin4 from "../assets/icon-images/admin-4.png";
import admin5 from "../assets/icon-images/admin-5.png";
import adminAvatar from "../assets/icon-images/admin-avatar.png";

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

const INITIAL_COUNSELORS = [
    { id: "counselor-1", status: "Active", search: "adebiyi abasi counselor", img: admin4, name: "Adebiyi Abasi", phone: "080 6046 8880", bar: "var(--primary-color)", email: "adebiyiabasi@niit.edu", lastLogin: "2026-09-02 09:15 AM" },
    { id: "counselor-2", status: "Inactive", search: "grace okafor counselor", img: admin5, name: "Grace Okafor", phone: "080 3709 5149", bar: "var(--secondary-color)", email: "graceokafor@niit.edu", lastLogin: "2026-08-18 04:20 PM" },
];

export default function Counselor() {
    const [counselors, setCounselors] = useState(INITIAL_COUNSELORS);
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Drawer states
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const COUNSELOR_EDIT_FIELDS = [
        { key: "name", label: "Full Name", type: "text" },
        { key: "email", label: "Email Address", type: "email" },
        { key: "phone", label: "Phone Number", type: "tel" },
        { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
    ];

    // Profile modal state
    const [profileData, setProfileData] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Form state
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", status: "Active" });
    const [editForm, setEditForm] = useState({});

    // Filtered list
    const filteredCounselors = useMemo(() => {
        return counselors.filter((c) => {
            const matchesStatus = statusFilter === "all" || c.status === statusFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || c.search.includes(query);
            return matchesStatus && matchesSearch;
        });
    }, [counselors, statusFilter, searchValue]);

    function openProfile(counselor) {
        setProfileData(counselor);
        setEditForm({
            name: counselor.name,
            email: counselor.email,
            phone: counselor.phone,
            status: counselor.status,
        });
        setIsProfileOpen(true);
    }

    function handleAdd(e) {
        e.preventDefault();
        const { firstName, lastName, email, phone, status } = form;
        if (!firstName || !lastName || !email || !phone) {
            alert("Please fill in all required fields.");
            return;
        }
        const fullName = `${firstName} ${lastName}`;
        const newCounselor = {
            id: "counselor-new-" + Date.now(),
            status,
            search: `${fullName} counselor`.toLowerCase(),
            img: adminAvatar,
            name: fullName,
            phone, email,
            bar: "var(--primary-color)",
            lastLogin: "—",
        };
        setCounselors((prev) => [...prev, newCounselor]);
        setForm({ firstName: "", lastName: "", email: "", phone: "", status: "Active" });
        setIsDrawerOpen(false);
    }

    function handleSaveEdit(updatedForm) {
        setCounselors((prev) =>
            prev.map((c) =>
                c.id === profileData.id
                    ? {
                        ...c,
                        name: updatedForm.name,
                        email: updatedForm.email,
                        phone: updatedForm.phone,
                        status: updatedForm.status,
                        search: `${updatedForm.name} counselor`.toLowerCase(),
                    }
                    : c
            )
        );
        setProfileData((prev) => ({ ...prev, name: updatedForm.name, email: updatedForm.email, phone: updatedForm.phone, status: updatedForm.status }));
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
                    profileName="Jone Copper"
                    profileRole="Administrator"
                    navItems={ADMIN_NAV}
                    activePage="counselor"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-chat-heart-fill"
                            tag="Counselor"
                            description="Manage student counselors and track admissions brought through each counselor."
                        />

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
                                    addLabel="Create New Counselor"
                                    onAdd={() => setIsDrawerOpen(true)}
                                />

                                <div className="people-card-grid">
                                    {filteredCounselors.map((c) => (
                                        <PersonCard
                                            key={c.id}
                                            img={c.img}
                                            name={c.name}
                                            roleLabel="Student Counselor"
                                            phone={c.phone}
                                            tag="COUNSELOR"
                                            status={c.status}
                                            bar={c.bar}
                                            onClick={() => openProfile(c)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <PageFooter />
                    </div>
                </div>
            </main>

            {/* Create New Counselor — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isDrawerOpen}
                onClose={() => { setIsDrawerOpen(false); setForm({ firstName: "", lastName: "", email: "", phone: "", status: "Active" }); }}
                title="Create New Counselor"
                icon="bi-person-plus-fill"
                intro="Complete the form below to add a new counselor."
            >
                <form className="form-page-form" onSubmit={handleAdd}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Counselor Basic Info</span>
                        </div>
                        <FormInput
                            label="First Name"
                            id="counselorFirstName"
                            required
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />
                        <FormInput
                            label="Last Name"
                            id="counselorLastName"
                            required
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        />
                        <FormInput
                            label="Email Address"
                            id="counselorEmail"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <FormInput
                            label="Phone Number"
                            id="counselorPhone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <FormSelect
                            label="Status"
                            id="counselorStatus"
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

            {/* Counselor Profile — View/Edit Modal */}
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                title="Counselor Profile"
                icon="bi-chat-heart-fill"
                maxWidth="760px"
                data={profileData ? {
                    avatar: profileData.img,
                    fullName: profileData.name,
                    email: profileData.email,
                    position: "Student Counselor",
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
