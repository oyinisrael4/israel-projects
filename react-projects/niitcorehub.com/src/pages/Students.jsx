import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import StatusBadge from "../components/StatusBadge";
import SlideDrawer from "../components/SlideDrawer";
import RosterFilter from "../components/RosterFilter";
import FormField from "../components/FormField";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";

const PROGRAMMES = [
    "Hardware & Networking", "Desktop Publishing (MS Office Suite)", "MasterMind Series (MIS)",
    "CCNA / CCNP", "IT Essentials", "Diploma in .NET Technologies", "Diploma in Web Development",
    "Data Analysis", "Diploma in Java", "Diploma in Python", "Java with DevOps",
    "Graphics Design", "UI/UX Design", "Project Management (PMP)", "Multimedia",
    "Game Development", "CyberOps", "Certified Ethical Hacking",
];

const INITIAL_STUDENTS = [
    { sn: 1, img: student1, name: "Arlene McCoy", sid: "AD33578", prog: "Web Development", phone: "080 1234 5678", status: "Active", broughtBy: "Adebiyi Abasi", search: "arlene mccoy ad33578 web development adebiyi abasi" },
    { sn: 2, img: student2, name: "Wade Warren", sid: "AD45231", prog: "Data Analysis", phone: "081 2345 6789", status: "Active", broughtBy: "Adebiyi Abasi", search: "wade warren ad45231 data analysis adebiyi abasi" },
    { sn: 3, img: student3, name: "Brooklyn Simmons", sid: "AD67452", prog: "Cybersecurity", phone: "080 3456 7890", status: "Inactive", broughtBy: "Grace Okafor", search: "brooklyn simmons ad67452 cybersecurity grace okafor" },
    { sn: 4, img: student4, name: "Theresa Webb", sid: "AD76133", prog: "Software Engineering", phone: "081 4567 8901", status: "Active", broughtBy: "Grace Okafor", search: "theresa webb ad76133 software engineering grace okafor" },
    { sn: 5, img: student5, name: "Darlene Robertson", sid: "AD98214", prog: "Networking", phone: "080 5678 9012", status: "Active", broughtBy: "", search: "darlene robertson ad98214 networking" },
];

export default function Students() {
    const [students, setStudents] = useState(INITIAL_STUDENTS);
    const [searchValue, setSearchValue] = useState("");
    const [programmeFilter, setProgrammeFilter] = useState("all");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", programme: "", status: "Active", broughtBy: "" });

    const allProgrammes = useMemo(() => {
        const progs = new Set(students.map((s) => s.prog));
        return ["all", ...progs];
    }, [students]);

    const filtered = useMemo(() => {
        return students.filter((s) => {
            const matchesProg = programmeFilter === "all" || s.prog === programmeFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || s.search.includes(query);
            return matchesProg && matchesSearch;
        });
    }, [students, programmeFilter, searchValue]);

    function handleAdd(e) {
        e.preventDefault();
        const { firstName, lastName, email, phone, programme, status, broughtBy } = form;
        if (!firstName || !lastName || !email || !phone || !programme) {
            alert("Please fill in all required fields.");
            return;
        }
        const fullName = `${firstName} ${lastName}`;
        const newSn = students.length + 1;
        const newSid = "AD" + (10000 + newSn);
        const newStudent = {
            sn: newSn, img: student1,
            name: fullName, sid: newSid,
            prog: programme, phone, status, broughtBy,
            search: `${fullName} ${newSid} ${programme} ${broughtBy}`.toLowerCase(),
        };
        setStudents((prev) => [...prev, newStudent]);
        setForm({ firstName: "", lastName: "", email: "", phone: "", address: "", programme: "", status: "Active", broughtBy: "" });
        setIsDrawerOpen(false);
    }

    const countText = `${filtered.length} student${filtered.length !== 1 ? "s" : ""}`;

    return (
        <div className="app-layout-container">
            <Sidebar activePage="students" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Student Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-people-fill"
                            tag="Students"
                            description="Manage student admissions, programmes, and contact details across the institute."
                        />

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <RosterFilter
                                    heading="All Students"
                                    countText={countText}
                                    filters={[
                                        {
                                            icon: "bi-funnel",
                                            value: programmeFilter,
                                            onChange: (e) => setProgrammeFilter(e.target.value),
                                            options: allProgrammes.map((p) => ({ value: p, label: p === "all" ? "All Programmes" : p })),
                                        },
                                    ]}
                                    addLabel="Create New Student"
                                    onAdd={() => setIsDrawerOpen(true)}
                                />

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="studentTable">
                                        <thead>
                                            <tr>
                                                <th>SN <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Student Name <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Programme <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Phone Number <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Status <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((s) => (
                                                <tr key={s.sn}>
                                                    <td className="marks-table-admission-no">{s.sn}</td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={s.img} alt={s.name} />
                                                            <div>
                                                                <h4>{s.name}</h4>
                                                                <p>Student ID: {s.sid}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{s.prog}</td>
                                                    <td>{s.phone}</td>
                                                    <td><StatusBadge status={s.status} /></td>
                                                    <td>
                                                        <button className="table-view-btn" type="button">View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <PageFooter />
                    </div>
                </div>
            </main>

            {/* Add Student — Slide-Over Drawer */}
            <SlideDrawer
                isOpen={isDrawerOpen}
                onClose={() => { setIsDrawerOpen(false); setForm({ firstName: "", lastName: "", email: "", phone: "", address: "", programme: "", status: "Active", broughtBy: "" }); }}
                title="Create New Student"
                icon="bi-person-plus-fill"
                intro="Complete the form below to create a new student record."
            >
                <form className="form-page-form" onSubmit={handleAdd}>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-person-vcard"></i>
                            <span>Student Basic Info</span>
                        </div>
                        <FormField label="First Name" htmlFor="studentFirstName" required>
                            <input type="text" id="studentFirstName" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                        </FormField>
                        <FormField label="Last Name" htmlFor="studentLastName" required>
                            <input type="text" id="studentLastName" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                        </FormField>
                        <FormField label="Email Address" htmlFor="studentEmail" required>
                            <input type="email" id="studentEmail" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </FormField>
                        <FormField label="Phone Number" htmlFor="studentPhone" required>
                            <input type="tel" id="studentPhone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </FormField>
                        <FormField label="Home Address" htmlFor="studentAddress" required>
                            <input type="text" id="studentAddress" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                        </FormField>
                    </div>
                    <div className="form-section">
                        <div className="form-section-title">
                            <i className="bi bi-mortarboard-fill"></i>
                            <span>Academic Info</span>
                        </div>
                        <FormField label="Select Programme" htmlFor="studentProgramme" required>
                            <select id="studentProgramme" required value={form.programme} onChange={(e) => setForm({ ...form, programme: e.target.value })}>
                                <option value="" disabled>Select here</option>
                                {PROGRAMMES.map((p) => <option key={p}>{p}</option>)}
                            </select>
                        </FormField>
                        <FormField label="Select Status" htmlFor="studentStatus" required>
                            <select id="studentStatus" required value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </FormField>
                        <FormField label="Brought By (Counselor)" htmlFor="studentBroughtBy">
                            <select id="studentBroughtBy" value={form.broughtBy} onChange={(e) => setForm({ ...form, broughtBy: e.target.value })}>
                                <option value="">None</option>
                                <option>Adebiyi Abasi</option>
                                <option>Grace Okafor</option>
                            </select>
                        </FormField>
                    </div>
                    <button type="submit" className="form-page-submit-btn">
                        <i className="bi bi-check-lg"></i>
                        <span>Submit</span>
                    </button>
                </form>
            </SlideDrawer>
        </div>
    );
}
