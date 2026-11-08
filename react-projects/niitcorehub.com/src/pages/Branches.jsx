import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import StatusBadge from "../components/StatusBadge";
import SlideDrawer from "../components/SlideDrawer";
import BranchModal from "../components/BranchModal";
import AlertModal from "../components/AlertModal";
import RosterFilter from "../components/RosterFilter";
import { FormInput, FormSelect } from "../components/FormField";
import adminAvatar from "../assets/icon-images/admin-avatar.png";

const ADMIN_NAV = [
    { id: "branches", to: "/branches", icon: "bi-building-fill", label: "Branches" },
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

const INITIAL_BRANCHES = [
    {
        id: "branch-1",
        sn: 1,
        branchId: "BR-001",
        name: "NIIT Agbara Centre",
        phone: "0803 456 7890",
        email: "agbara@niitcorehub.com",
        location: "Agbara, Ogun State",
        state: "Ogun State",
        address: "Plot 12, Commercial Avenue, Agbara Estate, Ogun State",
        manager: "Engr. Femi Adeleke",
        capacity: 120,
        status: "Active",
        search: "niit agbara centre br-001 agbara ogun state 08034567890 femi adeleke",
    },
    {
        id: "branch-2",
        sn: 2,
        branchId: "BR-002",
        name: "NIIT Ikeja Centre",
        phone: "0802 345 6781",
        email: "ikeja@niitcorehub.com",
        location: "Ikeja, Lagos State",
        state: "Lagos State",
        address: "28 Allen Avenue, Ikeja, Lagos State",
        manager: "Mrs. Funke Balogun",
        capacity: 250,
        status: "Active",
        search: "niit ikeja centre br-002 ikeja lagos state 08023456781 funke balogun",
    },
    {
        id: "branch-3",
        sn: 3,
        branchId: "BR-003",
        name: "NIIT Victoria Island Centre",
        phone: "0809 123 4567",
        email: "vi@niitcorehub.com",
        location: "Victoria Island, Lagos State",
        state: "Lagos State",
        address: "14 Adeola Odeku Street, Victoria Island, Lagos State",
        manager: "Mr. Chidi Nwosu",
        capacity: 200,
        status: "Active",
        search: "niit victoria island centre br-003 victoria island lagos state 08091234567 chidi nwosu",
    },
    {
        id: "branch-4",
        sn: 4,
        branchId: "BR-004",
        name: "NIIT Surulere Centre",
        phone: "0818 765 4321",
        email: "surulere@niitcorehub.com",
        location: "Surulere, Lagos State",
        state: "Lagos State",
        address: "84 Bode Thomas Street, Surulere, Lagos State",
        manager: "Dr. Babatunde Ojo",
        capacity: 180,
        status: "Active",
        search: "niit surulere centre br-004 surulere lagos state 08187654321 babatunde ojo",
    },
    {
        id: "branch-5",
        sn: 5,
        branchId: "BR-005",
        name: "NIIT Abuja Centre",
        phone: "0805 987 6543",
        email: "abuja@niitcorehub.com",
        location: "Garki II, Abuja FCT",
        state: "Abuja FCT",
        address: "Plot 742, Aminu Kano Crescent, Wuse II / Garki, Abuja FCT",
        manager: "Hajiya Amina Bello",
        capacity: 220,
        status: "Active",
        search: "niit abuja centre br-005 garki abuja fct 08059876543 amina bello",
    },
    {
        id: "branch-6",
        sn: 6,
        branchId: "BR-006",
        name: "NIIT Port Harcourt Centre",
        phone: "0803 876 5432",
        email: "portharcourt@niitcorehub.com",
        location: "Port Harcourt, Rivers State",
        state: "Rivers State",
        address: "56 Aba Road, Garrison, Port Harcourt, Rivers State",
        manager: "Mr. Ken Saro",
        capacity: 160,
        status: "Active",
        search: "niit port harcourt centre br-006 port harcourt rivers state 08038765432 ken saro",
    },
    {
        id: "branch-7",
        sn: 7,
        branchId: "BR-007",
        name: "NIIT Ibadan Centre",
        phone: "0812 345 9876",
        email: "ibadan@niitcorehub.com",
        location: "Bodija, Ibadan, Oyo State",
        state: "Oyo State",
        address: "19 Awolowo Avenue, Old Bodija, Ibadan, Oyo State",
        manager: "Prof. Sola Adeyemi",
        capacity: 150,
        status: "Inactive",
        search: "niit ibadan centre br-007 bodija ibadan oyo state 08123459876 sola adeyemi",
    },
];

const NIGERIAN_STATES = [
    "Lagos State",
    "Ogun State",
    "Abuja FCT",
    "Rivers State",
    "Oyo State",
    "Kano State",
    "Kaduna State",
    "Delta State",
    "Enugu State",
    "Edo State",
];

export default function Branches() {
    const [branches, setBranches] = useState(() => {
        try {
            const saved = localStorage.getItem("niit_branches_data");
            if (saved) return JSON.parse(saved);
        } catch {
            // Ignore
        }
        return INITIAL_BRANCHES;
    });

    const [searchValue, setSearchValue] = useState("");
    const [stateFilter, setStateFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Drawer state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [createdAlert, setCreatedAlert] = useState(null);

    // Form state
    const [form, setForm] = useState({
        name: "",
        branchId: "",
        phone: "",
        email: "",
        state: "Lagos State",
        location: "",
        address: "",
        manager: "",
        capacity: "150",
        status: "Active",
    });

    // Modal state for view/edit
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Save branches to localStorage whenever updated
    function persistBranches(updated) {
        setBranches(updated);
        try {
            localStorage.setItem("niit_branches_data", JSON.stringify(updated));
        } catch {
            // Ignore
        }
    }

    // Dynamic states list for filter dropdown
    const availableStates = useMemo(() => {
        const set = new Set(branches.map((b) => b.state || b.location.split(",").pop().trim()));
        return ["all", ...set];
    }, [branches]);

    // Filtered branches list
    const filteredBranches = useMemo(() => {
        return branches.filter((b) => {
            const branchState = b.state || b.location.split(",").pop().trim();
            const matchesState = stateFilter === "all" || branchState === stateFilter;
            const matchesStatus = statusFilter === "all" || b.status === statusFilter;
            const query = searchValue.trim().toLowerCase();
            const searchHaystack = (b.search || `${b.name} ${b.branchId} ${b.phone} ${b.location} ${b.address}`).toLowerCase();
            const matchesSearch = !query || searchHaystack.includes(query);
            return matchesState && matchesStatus && matchesSearch;
        });
    }, [branches, stateFilter, statusFilter, searchValue]);

    function openBranchDetails(branch) {
        setSelectedBranch(branch);
        setIsModalOpen(true);
    }

    function handleSaveBranch(updatedBranch) {
        const updatedList = branches.map((b) => {
            if (b.id === updatedBranch.id) {
                return {
                    ...b,
                    ...updatedBranch,
                    search: `${updatedBranch.name} ${updatedBranch.branchId} ${updatedBranch.location} ${updatedBranch.phone} ${updatedBranch.manager || ""}`.toLowerCase(),
                };
            }
            return b;
        });
        persistBranches(updatedList);
        setSelectedBranch(updatedBranch);
    }

    function handleDeleteBranch(id) {
        const updatedList = branches.filter((b) => b.id !== id);
        // Re-number serial numbers
        const reindexed = updatedList.map((item, idx) => ({ ...item, sn: idx + 1 }));
        persistBranches(reindexed);
    }

    function handleAddBranch(e) {
        e.preventDefault();
        const { name, branchId, phone, email, state, location, address, manager, capacity, status } = form;

        if (!name || !phone || !location) {
            alert("Please fill in the required fields: Branch Name, Phone Number, and Location.");
            return;
        }

        const nextSn = branches.length + 1;
        const autoCode = branchId.trim() || `BR-${String(nextSn).padStart(3, "0")}`;
        const finalLocation = location.includes(",") ? location : `${location}, ${state}`;

        const newBranch = {
            id: "branch-" + Date.now(),
            sn: nextSn,
            branchId: autoCode,
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            state,
            location: finalLocation,
            address: address.trim(),
            manager: manager.trim(),
            capacity: Number(capacity) || 100,
            status,
            search: `${name} ${autoCode} ${finalLocation} ${phone} ${manager}`.toLowerCase(),
        };

        const updated = [...branches, newBranch];
        persistBranches(updated);

        setIsDrawerOpen(false);
        setForm({
            name: "",
            branchId: "",
            phone: "",
            email: "",
            state: "Lagos State",
            location: "",
            address: "",
            manager: "",
            capacity: "150",
            status: "Active",
        });

        setCreatedAlert({
            name: newBranch.name,
            code: newBranch.branchId,
            location: newBranch.location,
        });
    }

    const countText = `${filteredBranches.length} branch${filteredBranches.length !== 1 ? "es" : ""}`;

    return (
        <div className="app-layout-container">
            <Sidebar activePage="branches" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Branches Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={adminAvatar}
                    profileName="Israel Oyinlola"
                    profileRole="Super Admin"
                    navItems={ADMIN_NAV}
                    activePage="branches"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-building-fill"
                            title="NIIT Branches"
                            description="Manage all institute branch locations, regional training centres, phone lines, and operating status across Nigeria."
                            searchValue={searchValue}
                            onSearchChange={(e) => setSearchValue(e.target.value)}
                            searchPlaceholder="Search Branches Here..."
                            actionLabel="ADD NEW BRANCH"
                            actionIcon="bi-plus-square"
                            onAction={() => {
                                // Pre-fill with next recommended branch code
                                const nextNum = branches.length + 1;
                                setForm((prev) => ({
                                    ...prev,
                                    branchId: `BR-${String(nextNum).padStart(3, "0")}`,
                                }));
                                setIsDrawerOpen(true);
                            }}
                        />

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <RosterFilter
                                    heading="All Branches"
                                    countText={countText}
                                    filters={[
                                        {
                                            icon: "bi-geo-alt",
                                            value: stateFilter,
                                            onChange: (e) => setStateFilter(e.target.value),
                                            options: availableStates.map((s) => ({
                                                value: s,
                                                label: s === "all" ? "All Locations" : s,
                                            })),
                                            minWidth: "160px",
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
                                            minWidth: "140px",
                                        },
                                    ]}
                                />

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="branchesTable">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "60px" }}>SN <i className="bi bi-arrow-down-up"></i></th>
                                                <th style={{ width: "120px" }}>Branch ID <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Branch Name <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Branch Phone Number <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Branch Location <i className="bi bi-arrow-down-up"></i></th>
                                                <th style={{ width: "120px" }}>Status <i className="bi bi-arrow-down-up"></i></th>
                                                <th style={{ width: "100px" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredBranches.map((b) => (
                                                <tr key={b.id || b.branchId}>
                                                    <td className="marks-table-admission-no">{b.sn}</td>
                                                    <td>
                                                        <span className="branch-id-badge">{b.branchId}</span>
                                                    </td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <div className="branch-table-icon">
                                                                <i className="bi bi-buildings"></i>
                                                            </div>
                                                            <div>
                                                                <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "600" }}>{b.name}</h4>
                                                                <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                                                                    {b.manager ? `Head: ${b.manager}` : b.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a
                                                            href={`tel:${b.phone}`}
                                                            style={{ color: "var(--primary-color)", textDecoration: "none", fontWeight: "500" }}
                                                        >
                                                            {b.phone}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <div className="branch-table-location">
                                                            <i className="bi bi-geo-alt-fill"></i>
                                                            <span>{b.location}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <StatusBadge status={b.status} />
                                                    </td>
                                                    <td>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                            <button
                                                                className="table-view-btn"
                                                                type="button"
                                                                onClick={() => openBranchDetails(b)}
                                                                title="Quick preview or edit branch"
                                                            >
                                                                View
                                                            </button>
                                                            <Link
                                                                to={`/branches/${b.branchId || b.id}`}
                                                                style={{
                                                                    height: "32px",
                                                                    padding: "0 10px",
                                                                    borderRadius: "4px",
                                                                    border: "1px solid rgba(0, 52, 149, 0.25)",
                                                                    background: "rgba(0, 52, 149, 0.05)",
                                                                    color: "var(--primary-color)",
                                                                    fontSize: "12px",
                                                                    fontWeight: "600",
                                                                    textDecoration: "none",
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: "4px",
                                                                    transition: "all 0.2s ease",
                                                                }}
                                                                title="Open full branch operations and summary page"
                                                            >
                                                                <i className="bi bi-bar-chart-fill" style={{ fontSize: "11px" }}></i>
                                                                <span>Summary</span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredBranches.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="table-empty-message" style={{ textAlign: "center", padding: "40px 20px" }}>
                                                        <i className="bi bi-building-exclamation" style={{ fontSize: "28px", color: "#94a3b8", display: "block", marginBottom: "8px" }}></i>
                                                        <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                                                            No branches found matching your search or location filter.
                                                        </p>
                                                    </td>
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

            {/* Add New Branch — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Add New NIIT Branch"
                icon="bi-building-fill-add"
                intro="Enter the details below to add a new NIIT centre to the portal directory."
            >
                <form className="form-page-form" onSubmit={handleAddBranch}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-buildings-fill"></i>
                            <span>Branch Identity</span>
                        </div>
                        <FormInput
                            label="Branch Name"
                            id="branchName"
                            required
                            placeholder="e.g. NIIT Lekki Centre"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <FormInput
                            label="Branch ID / Code"
                            id="branchId"
                            required
                            placeholder="e.g. BR-008"
                            value={form.branchId}
                            onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                        />
                        <FormInput
                            label="Branch Phone Number"
                            id="branchPhone"
                            type="tel"
                            required
                            placeholder="e.g. 0803 123 4567"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <FormInput
                            label="Official Email Address"
                            id="branchEmail"
                            type="email"
                            placeholder="e.g. lekki@niitcorehub.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-geo-alt-fill"></i>
                            <span>Location & Operations</span>
                        </div>
                        <FormSelect
                            label="State / Region"
                            id="branchState"
                            required
                            value={form.state}
                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                            options={NIGERIAN_STATES}
                        />
                        <FormInput
                            label="City / Area"
                            id="branchLocation"
                            required
                            placeholder="e.g. Lekki Phase 1"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                        />
                        <FormInput
                            label="Full Street Address"
                            id="branchAddress"
                            placeholder="e.g. Plot 15, Admiralty Way, Lekki, Lagos"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                        <FormInput
                            label="Centre Manager / Lead"
                            id="branchManager"
                            placeholder="e.g. Engr. David Adeleke"
                            value={form.manager}
                            onChange={(e) => setForm({ ...form, manager: e.target.value })}
                        />
                        <FormInput
                            label="Student Capacity"
                            id="branchCapacity"
                            type="number"
                            placeholder="e.g. 150"
                            value={form.capacity}
                            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                        />
                        <FormSelect
                            label="Operating Status"
                            id="branchStatus"
                            required
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            options={["Active", "Inactive"]}
                        />
                    </div>

                    <button type="submit" className="form-page-submit-btn">
                        <i className="bi bi-check-lg"></i>
                        <span>Create Branch</span>
                    </button>
                </form>
            </SlideDrawer>

            {/* View / Edit Modal */}
            <BranchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                branch={selectedBranch}
                onSave={handleSaveBranch}
                onDelete={handleDeleteBranch}
            />

            {/* Success Alert Modal */}
            {createdAlert && (
                <AlertModal
                    message="New Branch Added Successfully!"
                    subMessage={`"${createdAlert.name}" with ID "${createdAlert.code}" located in ${createdAlert.location} has been registered and is now active across the portal.`}
                    onClose={() => setCreatedAlert(null)}
                />
            )}
        </div>
    );
}

