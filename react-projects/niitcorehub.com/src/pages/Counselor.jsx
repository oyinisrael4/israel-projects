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
import admin4 from "../assets/icon-images/admin-4.png";
import admin5 from "../assets/icon-images/admin-5.png";
import adminAvatar from "../assets/icon-images/admin-avatar.png";

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
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

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

    function openEditDrawer() {
        if (!profileData) return;
        setEditForm({
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            status: profileData.status,
        });
        setIsProfileOpen(false);
        setIsEditDrawerOpen(true);
    }

    function handleEdit(e) {
        e.preventDefault();
        setCounselors((prev) =>
            prev.map((c) =>
                c.id === profileData.id
                    ? {
                        ...c,
                        name: editForm.name,
                        email: editForm.email,
                        phone: editForm.phone,
                        status: editForm.status,
                        search: `${editForm.name} counselor`.toLowerCase(),
                    }
                    : c
            )
        );
        setProfileData((prev) => ({ ...prev, name: editForm.name, email: editForm.email, phone: editForm.phone, status: editForm.status }));
        setIsEditDrawerOpen(false);
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
                        <FormField label="First Name" htmlFor="counselorFirstName" required>
                            <input type="text" id="counselorFirstName" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                        </FormField>
                        <FormField label="Last Name" htmlFor="counselorLastName" required>
                            <input type="text" id="counselorLastName" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                        </FormField>
                        <FormField label="Email Address" htmlFor="counselorEmail" required>
                            <input type="email" id="counselorEmail" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </FormField>
                        <FormField label="Phone Number" htmlFor="counselorPhone" required>
                            <input type="tel" id="counselorPhone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </FormField>
                        <FormField label="Status" htmlFor="counselorStatus" required>
                            <select id="counselorStatus" required value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
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

            {/* Edit Counselor Info — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
                title="Edit Counselor Info"
                icon="bi-pencil-square"
                intro="Update the counselor's information below."
            >
                <form className="form-page-form" onSubmit={handleEdit}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Counselor Basic Info</span>
                        </div>
                        <FormField label="Full Name" htmlFor="editCounselorName" required>
                            <input type="text" id="editCounselorName" required value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                        </FormField>
                        <FormField label="Email Address" htmlFor="editCounselorEmail" required>
                            <input type="email" id="editCounselorEmail" required value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                        </FormField>
                        <FormField label="Phone Number" htmlFor="editCounselorPhone" required>
                            <input type="tel" id="editCounselorPhone" required value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                        </FormField>
                        <FormField label="Status" htmlFor="editCounselorStatus" required>
                            <select id="editCounselorStatus" required value={editForm.status || "Active"} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
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

            {/* Counselor Profile — View Modal */}
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
                onEdit={openEditDrawer}
            />
        </div>
    );
}
