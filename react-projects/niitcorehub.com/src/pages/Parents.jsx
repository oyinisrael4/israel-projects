import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import SlideDrawer from "../components/SlideDrawer";
import ProfileModal from "../components/ProfileModal";
import RosterFilter from "../components/RosterFilter";
import { FormInput, FormSelect } from "../components/FormField";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import admin3 from "../assets/icon-images/admin-3.png";
import admin4 from "../assets/icon-images/admin-4.png";
import admin5 from "../assets/icon-images/admin-5.png";
import profile2 from "../assets/icon-images/profile-2.png";
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

// Counselor-limited nav for when a counselor is logged in and adding a parent
const COUNSELOR_NAV = [
    { id: "students", to: "/students", icon: "bi-people-fill", label: "Students" },
    { id: "parents", to: "/parents", icon: "bi-house-heart-fill", label: "Parents" },
    { id: "referrals", to: "/referrals", icon: "bi-arrow-repeat", label: "Referrals" },
    { id: "logout", to: "/login", icon: "bi-power", label: "Log-Out" },
];

const INITIAL_PARENTS = [
    { id: "parent-1", sn: 1, img: admin3, name: "Mr James McCoy", relation: "Father", studentName: "Arlene McCoy", sid: "AD33578", sImg: student1, phone: "0812 345 6789", email: "james.mccoy@gmail.com", search: "james mccoy arlene ad33578 father", lastLogin: "—" },
    { id: "parent-2", sn: 2, img: profile2, name: "Mrs Patricia Warren", relation: "Mother", studentName: "Wade Warren", sid: "AD45231", sImg: student2, phone: "0803 456 7890", email: "pwarren@yahoo.com", search: "patricia warren wade ad45231 mother", lastLogin: "—" },
    { id: "parent-3", sn: 3, img: admin4, name: "Mr Charles Simmons", relation: "Guardian", studentName: "Brooklyn Simmons", sid: "AD67452", sImg: student3, phone: "0816 567 8901", email: "csimmons@outlook.com", search: "charles simmons brooklyn ad67452 guardian", lastLogin: "—" },
    { id: "parent-4", sn: 4, img: admin5, name: "Mr Henry Webb", relation: "Father", studentName: "Theresa Webb", sid: "AD76133", sImg: student4, phone: "0802 678 9012", email: "henrywebb@niit.ng", search: "henry webb theresa ad76133 father", lastLogin: "—" },
    { id: "parent-5", sn: 5, img: profile2, name: "Mrs Grace Robertson", relation: "Mother", studentName: "Darlene Robertson", sid: "AD98214", sImg: student5, phone: "0809 789 0123", email: "gracerobertson@gmail.com", search: "grace robertson darlene ad98214 mother", lastLogin: "—" },
];

const PARENT_EDIT_FIELDS = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "relation", label: "Relationship", type: "select", options: ["Father", "Mother", "Guardian"] },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
];

export default function Parents() {
    const [parents, setParents] = useState(() => {
        try {
            const saved = localStorage.getItem("niit_parents_data");
            if (saved) return JSON.parse(saved);
        } catch {
            // Ignore
        }
        return INITIAL_PARENTS;
    });
    const [searchValue, setSearchValue] = useState("");
    const [relationFilter, setRelationFilter] = useState("all");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [form, setForm] = useState({ title: "", firstName: "", lastName: "", relation: "", phone: "", email: "", address: "" });
    const [editForm, setEditForm] = useState({});
    const [createdParentModal, setCreatedParentModal] = useState(null);
    const [copied, setCopied] = useState(false);

    const filtered = useMemo(() => {
        return parents.filter((p) => {
            const matchesRelation = relationFilter === "all" || p.relation === relationFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || p.search.includes(query);
            return matchesRelation && matchesSearch;
        });
    }, [parents, relationFilter, searchValue]);

    function openProfile(parent) {
        setProfileData(parent);
        setEditForm({
            name: parent.name,
            relation: parent.relation,
            email: parent.email,
            phone: parent.phone,
        });
        setIsProfileOpen(true);
    }

    function handleSaveEdit(updatedForm) {
        setParents((prev) => {
            const updated = prev.map((p) =>
                p.id === profileData.id
                    ? {
                          ...p,
                          name: updatedForm.name,
                          relation: updatedForm.relation,
                          email: updatedForm.email,
                          phone: updatedForm.phone,
                          search: `${updatedForm.name} ${p.studentName} ${p.sid} ${updatedForm.relation}`.toLowerCase(),
                      }
                    : p
            );
            try {
                localStorage.setItem("niit_parents_data", JSON.stringify(updated));
            } catch {
                // Ignore
            }
            return updated;
        });
        setProfileData((prev) => ({
            ...prev,
            name: updatedForm.name,
            relation: updatedForm.relation,
            email: updatedForm.email,
            phone: updatedForm.phone,
        }));
    }

    function handleAdd(e) {
        e.preventDefault();
        const { title, firstName, lastName, relation, phone, email } = form;
        if (!firstName || !lastName || !relation || !phone || !email) {
            alert("Please fill in all required fields.");
            return;
        }
        const fullName = `${title ? title + " " : ""}${firstName} ${lastName}`;
        const newParent = {
            id: "parent-new-" + Date.now(),
            sn: parents.length + 1,
            img: admin3,
            name: fullName,
            relation,
            studentName: "—",
            sid: "—",
            sImg: student1,
            phone,
            email,
            search: `${fullName} ${relation}`.toLowerCase(),
            lastLogin: "—",
        };
        setParents((prev) => {
            const updated = [...prev, newParent];
            try {
                localStorage.setItem("niit_parents_data", JSON.stringify(updated));
            } catch {
                // Ignore
            }
            return updated;
        });

        // Save parent account for Parent Portal authentication
        try {
            const cleanEmail = email.trim().toLowerCase();
            const tempPassword = Math.random().toString(36).slice(-8);
            const parentAccount = {
                id: newParent.id,
                name: fullName,
                email: cleanEmail,
                phone: phone.trim(),
                relation,
                password: tempPassword,
                temporaryPassword: tempPassword,
                requiresReset: true,
            };
            const existing = JSON.parse(localStorage.getItem("niit_registered_parents") || "[]");
            const filtered = existing.filter((p) => p.email !== cleanEmail);
            filtered.push(parentAccount);
            localStorage.setItem("niit_registered_parents", JSON.stringify(filtered));
        } catch {
            // Ignore
        }

        setForm({ title: "", firstName: "", lastName: "", relation: "", phone: "", email: "", address: "" });
        setIsDrawerOpen(false);
        setCreatedParentModal({ fullName, email });
    }

    function copyPortalLink() {
        const portalUrl = `${window.location.origin}/parent-portal/login`;
        navigator.clipboard.writeText(portalUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    }

    const countText = `${filtered.length} record${filtered.length !== 1 ? "s" : ""}`;

    return (
        <div className="app-layout-container">
            <Sidebar activePage="parents" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Parents Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={adminAvatar}
                    profileName="Israel Oyinlola"
                    profileRole="Super Admin"
                    navItems={ADMIN_NAV}
                    activePage="parents"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-house-heart-fill"
                            tag="Parents"
                            description="Manage parent and guardian contacts. The parent will receive their portal login via email and can add their children themselves."
                        />

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <RosterFilter
                                    heading="All Parents & Guardians"
                                    countText={countText}
                                    filters={[
                                        {
                                            icon: "bi-funnel",
                                            value: relationFilter,
                                            onChange: (e) => setRelationFilter(e.target.value),
                                            options: [
                                                { value: "all", label: "All Relationships" },
                                                { value: "Father", label: "Father" },
                                                { value: "Mother", label: "Mother" },
                                                { value: "Guardian", label: "Guardian" },
                                            ],
                                        },
                                    ]}
                                    addLabel="Add Parent"
                                    onAdd={() => setIsDrawerOpen(true)}
                                />

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="parentTable">
                                        <thead>
                                            <tr>
                                                <th>SN <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Parent / Guardian <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Relationship <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Student Name <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Phone Number <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Email Address <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((p) => (
                                                <tr key={p.id}>
                                                    <td className="marks-table-admission-no">{p.sn}</td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={p.img} alt={p.name} />
                                                            <div>
                                                                <h4>{p.name}</h4>
                                                                <p>{p.relation}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span className="person-card-role-tag">{p.relation.toUpperCase()}</span></td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={p.sImg} alt={p.studentName} />
                                                            <div>
                                                                <h4>{p.studentName}</h4>
                                                                <p>{p.sid}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{p.phone}</td>
                                                    <td>{p.email}</td>
                                                    <td>
                                                        <button className="table-view-btn" type="button" onClick={() => openProfile(p)}>View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filtered.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="table-empty-cell">No parents found matching the filter.</td>
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

            {/* Add Parent — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isDrawerOpen}
                onClose={() => {
                    setIsDrawerOpen(false);
                    setForm({ title: "", firstName: "", lastName: "", relation: "", phone: "", email: "", address: "" });
                }}
                title="Add Parent / Guardian"
                icon="bi-person-plus-fill"
                intro="Enter the parent's details and email. They will receive their parent portal login and can add their children themselves after resetting their password."
            >
                <form className="form-page-form" onSubmit={handleAdd}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Parent / Guardian Info</span>
                        </div>
                        <FormSelect
                            label="Select Title"
                            id="parentTitle"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Select here"
                            options={["Mr", "Mrs", "Miss", "Dr"]}
                        />
                        <FormInput
                            label="First Name"
                            id="parentFirstName"
                            required
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />
                        <FormInput
                            label="Last Name"
                            id="parentLastName"
                            required
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        />
                        <FormSelect
                            label="Relationship"
                            id="parentRelationship"
                            required
                            value={form.relation}
                            onChange={(e) => setForm({ ...form, relation: e.target.value })}
                            placeholder="Select here"
                            options={["Father", "Mother", "Guardian"]}
                        />
                        <FormInput
                            label="Phone Number"
                            id="parentPhone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <FormInput
                            label="Email Address"
                            id="parentEmail"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <FormInput
                            label="Home Address"
                            id="parentAddress"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                    </div>
                    <div className="parent-portal-notice">
                        <i className="bi bi-envelope-fill"></i>
                        <div>
                            <strong>Portal Login Info</strong>
                            <p>After adding this parent, share the parent portal link with them. They should reset their password using their email address before logging in.</p>
                        </div>
                    </div>
                    <button type="submit" className="form-page-submit-btn">
                        <i className="bi bi-check-lg"></i>
                        <span>Add Parent</span>
                    </button>
                </form>
            </SlideDrawer>

            {/* Parent / Guardian Profile View / Inline Edit Modal */}
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                title="Parent / Guardian Profile"
                icon="bi-house-heart-fill"
                maxWidth="760px"
                data={profileData ? {
                    avatar: profileData.img,
                    fullName: profileData.name,
                    email: profileData.email,
                    position: profileData.relation,
                    phone: profileData.phone,
                    status: "Active",
                    lastLogin: profileData.lastLogin || "—",
                } : null}
                onEdit={() => {}}
                editForm={editForm}
                setEditForm={setEditForm}
                onSaveEdit={handleSaveEdit}
                editFields={PARENT_EDIT_FIELDS}
                extraSection={profileData && (
                    <div>
                        <p className="profile-modal-section-title">Linked Student</p>
                        <div className="profile-students-brought">
                            <div className="profile-student-chip">
                                <img src={profileData.sImg} alt={profileData.studentName} />
                                <div className="profile-student-chip-text">
                                    <h5>{profileData.studentName}</h5>
                                    <p>Student ID: {profileData.sid}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            />

            {/* Created Parent Portal Instruction Modal */}
            {createdParentModal && (
                <div className="inpage-modal-overlay">
                    <div className="inpage-modal parent-modal-card">
                        <div className="inpage-modal-header">
                            <div className="inpage-modal-title">
                                <i className="bi bi-send-check-fill parent-modal-success-icon"></i>
                                <span>Parent Account Created</span>
                            </div>
                            <button
                                type="button"
                                className="inpage-modal-close-btn"
                                onClick={() => setCreatedParentModal(null)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="inpage-modal-body">
                            <div className="parent-modal-hero">
                                <div className="parent-modal-badge">
                                    <i className="bi bi-check2"></i>
                                </div>
                                <h4 className="parent-modal-name">{createdParentModal.fullName} Added!</h4>
                                <p className="parent-modal-email">
                                    Registered email: <strong>{createdParentModal.email}</strong>
                                </p>
                            </div>

                            <div className="parent-portal-notice">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <strong>Next Step: Inform Parent</strong>
                                    <p>Share the parent portal link below. Instruct the parent to visit the portal, click <strong>"Forgot Password"</strong>, enter their email address ({createdParentModal.email}), and set their secure password.</p>
                                </div>
                            </div>

                            <div className="parent-portal-link-box">
                                <code className="parent-portal-link-code">
                                    {window.location.origin}/parent-portal/login
                                </code>
                                <button
                                    type="button"
                                    className="btn btn-outline parent-portal-copy-btn"
                                    onClick={copyPortalLink}
                                >
                                    <i className={`bi ${copied ? "bi-check2" : "bi-clipboard"}`}></i>
                                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                                </button>
                            </div>

                            <button
                                type="button"
                                className="form-page-submit-btn"
                                onClick={() => setCreatedParentModal(null)}
                            >
                                <i className="bi bi-check-lg"></i>
                                <span>Done</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
