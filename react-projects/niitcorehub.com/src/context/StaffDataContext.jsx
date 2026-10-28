import { createContext, useContext, useState } from "react";
import teacherAvatar from "../assets/icon-images/teacher-avatar.png";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import admin3 from "../assets/icon-images/admin-3.png";
import admin4 from "../assets/icon-images/admin-4.png";
import admin5 from "../assets/icon-images/admin-5.png";
import profile2 from "../assets/icon-images/profile-2.png";
import staff1 from "../assets/icon-images/staff-1.png";
import staff2 from "../assets/icon-images/staff-2.png";
import instructor4 from "../assets/icon-images/instructor-4.png";

const BAR_COLORS = ["var(--primary-color)", "var(--secondary-color)", "var(--footer-color)"];

// All staff members including admins and counselors — "category" determines which page they appear on
const INITIAL_STAFF = [
    // Teaching Staff
    { id: "staff-1", category: "staff", role: "Tutor", status: "Active", search: "courtney henry tutor web development", img: teacherAvatar, name: "Courtney Henry", roleLabel: "Tutor — Diploma in Web Development", phone: "080 3123 4567", tag: "TUTOR", bar: "var(--primary-color)", email: "courtneyhenry@niit.edu", lastLogin: "2026-08-30 09:12 AM", position: "Tutor — Web Development" },
    { id: "staff-2", category: "staff", role: "Tutor", status: "Inactive", search: "robert fox tutor cybersecurity", img: staff1, name: "Robert Fox", roleLabel: "Tutor — CyberOps & Certified Ethical Hacking", phone: "081 0345 6789", tag: "TUTOR", bar: "var(--footer-color)", email: "robertfox@niit.edu", lastLogin: "2026-08-20 08:03 AM", position: "Tutor — Cybersecurity" },
    { id: "staff-3", category: "staff", role: "Senior Lecturer", status: "Active", search: "eleanor pena senior lecturer data analysis", img: staff2, name: "Eleanor Pena", roleLabel: "Senior Lecturer — Data Analysis", phone: "081 3456 7890", tag: "SENIOR LECTURER", bar: "var(--secondary-color)", email: "eleanorpena@niit.edu", lastLogin: "2026-08-31 11:20 AM", position: "Senior Lecturer — Data Analysis" },
    { id: "staff-4", category: "staff", role: "Lecturer", status: "Active", search: "leslie alexander lecturer networking", img: instructor4, name: "Leslie Alexander", roleLabel: "Lecturer — CCNA / CCNP & IT Essentials", phone: "081 6567 8901", tag: "LECTURER", bar: "var(--primary-color)", email: "lesliealexander@niit.edu", lastLogin: "2026-09-01 01:40 PM", position: "Lecturer — Networking" },

    // Administrators
    { id: "STAFF20261012053631", category: "admin", role: "Super Admin", status: "Active", search: "isreal oyinlola super admin", img: adminAvatar, name: "Isreal Oyinlola", roleLabel: "Super Admin", phone: "090 3427 5446", tag: "SUPER ADMIN", bar: "var(--primary-color)", email: "oyinisrael3@gmail.com", lastLogin: "Just Now", position: "Super Administrator" },
    { id: "admin-2", category: "admin", role: "President", status: "Active", search: "oladele philip president admin", img: admin3, name: "Oladele Philip", roleLabel: "President", phone: "090 3427 5446", tag: "ADMIN", bar: "var(--secondary-color)", email: "oladelephilip@niit.edu", lastLogin: "2026-08-30 08:45 AM", position: "President" },
    { id: "admin-3", category: "admin", role: "Registrar", status: "Active", search: "kathryn murphy registrar admin", img: profile2, name: "Kathryn Murphy", roleLabel: "Registrar", phone: "080 9898 7876", tag: "ADMIN", bar: "var(--footer-color)", email: "kathrynmurphy@niit.edu", lastLogin: "2026-08-29 02:45 PM", position: "Registrar" },
    { id: "admin-4", category: "admin", role: "Technologist", status: "Active", search: "wade warren technologist admin", img: admin4, name: "Wade Warren", roleLabel: "Technologist", phone: "081 2345 6789", tag: "ADMIN", bar: "var(--primary-color)", email: "wadewarren@niit.edu", lastLogin: "2026-09-02 09:15 AM", position: "Technologist" },
    { id: "admin-5", category: "admin", role: "Registrar", status: "Inactive", search: "brooklyn simmons registrar admin", img: admin5, name: "Brooklyn Simmons", roleLabel: "Registrar", phone: "082 3456 7890", tag: "ADMIN", bar: "var(--secondary-color)", email: "brooklynsimmons@niit.edu", lastLogin: "2026-08-18 04:20 PM", position: "Registrar" },

    // Counselors
    { id: "counselor-1", category: "counselor", role: "Counselor", status: "Active", search: "adebiyi abasi counselor", img: admin4, name: "Adebiyi Abasi", roleLabel: "Student Counselor", phone: "080 6046 8880", tag: "COUNSELOR", bar: "var(--primary-color)", email: "adebiyiabasi@niit.edu", lastLogin: "2026-09-02 09:15 AM", position: "Student Counselor" },
    { id: "counselor-2", category: "counselor", role: "Counselor", status: "Inactive", search: "grace okafor counselor", img: admin5, name: "Grace Okafor", roleLabel: "Student Counselor", phone: "080 3709 5149", tag: "COUNSELOR", bar: "var(--secondary-color)", email: "graceokafor@niit.edu", lastLogin: "2026-08-18 04:20 PM", position: "Student Counselor" },
];

const StaffDataContext = createContext();

export const StaffDataProvider = ({ children }) => {
    const [allStaff, setAllStaff] = useState(() => {
        try {
            const saved = localStorage.getItem("niit_staff_data");
            if (saved) return JSON.parse(saved);
        } catch {
            // Ignore
        }
        return INITIAL_STAFF;
    });

    function saveStaff(updated) {
        setAllStaff(updated);
        try {
            localStorage.setItem("niit_staff_data", JSON.stringify(updated));
        } catch {
            // Ignore
        }
    }

    function addStaffMember(newMember) {
        const item = {
            ...newMember,
            id: newMember.id || "member-" + Date.now(),
            bar: newMember.bar || BAR_COLORS[allStaff.length % BAR_COLORS.length],
            search: `${newMember.name || ""} ${newMember.role || ""} ${newMember.position || ""}`.toLowerCase(),
        };
        const updated = [...allStaff, item];
        saveStaff(updated);
        return item;
    }

    function updateStaffMember(id, updates) {
        const updated = allStaff.map((s) =>
            s.id === id
                ? {
                      ...s,
                      ...updates,
                      search: `${updates.name || s.name} ${updates.role || s.role}`.toLowerCase(),
                  }
                : s
        );
        saveStaff(updated);
    }

    const staffMembers = allStaff.filter((s) => s.category === "staff");
    const adminMembers = allStaff.filter((s) => s.category === "admin");
    const counselorMembers = allStaff.filter((s) => s.category === "counselor");
    const counselorNames = counselorMembers
        .filter((c) => c.status === "Active")
        .map((c) => c.name);

    return (
        <StaffDataContext.Provider
            value={{
                allStaff,
                staffMembers,
                adminMembers,
                counselorMembers,
                counselorNames,
                addStaffMember,
                updateStaffMember,
            }}
        >
            {children}
        </StaffDataContext.Provider>
    );
};

export const useStaffData = () => useContext(StaffDataContext);
