/**
 * BACKEND ARCHITECTURE & DATA MAPPING GUIDE
 * 
 * Target Backend: https://hostelhub.niitwebdev.com.ng/hotelhub-api/admin
 * Original Domain: Hospital / Clinical Management System
 * New Domain: NIIT Core Hub (Educational Institute & Student Management System)
 * 
 * This module defines the exact mapping between the hospital backend database
 * tables/fields and NIIT Core Hub's frontend entities, plus data adapter transformers.
 */

export const ENTITY_MAPPINGS = {
    // 1. HOSPITAL PATIENTS -> NIIT STUDENTS
    patients: {
        targetEntity: "Students",
        description: "Hospital patient records map directly to Institute Student records.",
        table: "tbl_patients / patients",
        fieldMapping: {
            patient_id: "student_id (e.g. AD33578)",
            first_name: "firstName",
            last_name: "lastName",
            email: "email",
            phone: "phone",
            dob: "dateOfBirth",
            gender: "gender",
            address: "address",
            blood_group: "bloodGroup (or unused)",
            emergency_contact: "parentPhone",
            guardian_name: "parentName",
            status: "status ('Active' | 'Inactive')",
            created_at: "admissionDate / registrationDate",
            department_id: "programme_id",
        },
    },

    // 2. HOSPITAL DOCTORS / CLINICIANS -> NIIT TUTORS & LECTURERS
    doctors: {
        targetEntity: "Teaching Staff (Tutors / Lecturers)",
        description: "Medical doctors/specialists map to course tutors and senior lecturers.",
        table: "tbl_doctors / doctors",
        fieldMapping: {
            doctor_id: "staffId",
            first_name: "firstName",
            last_name: "lastName",
            specialization: "programme (e.g. 'Diploma in Web Development')",
            email: "email",
            phone: "phone",
            department_id: "programme_id",
            qualification: "position ('Senior Lecturer' | 'Tutor')",
            status: "status ('Active' | 'Inactive')",
        },
    },

    // 3. HOSPITAL STAFF / USERS -> NIIT INSTITUTE STAFF, ADMINS & COUNSELORS
    staff: {
        targetEntity: "All Staff (Admins, Counselors, Academic Staff)",
        description: "Hospital administrative and support staff map to institute personnel with category & role.",
        table: "tbl_staff / staff_users",
        fieldMapping: {
            staff_id: "id / staffId",
            first_name: "firstName",
            last_name: "lastName",
            email: "email",
            role_id: "role (Admin: 1, Counselor: 2, Tutor: 3, SuperAdmin: 4)",
            role_name: "roleName ('Super Admin' | 'Counselor' | 'Tutor' | 'Registrar')",
            status: "status ('Active' | 'Inactive')",
            last_login: "lastLogin",
        },
    },

    // 4. HOSPITAL DEPARTMENTS -> NIIT PROGRAMMES
    departments: {
        targetEntity: "Programmes / Courses",
        description: "Hospital departments (Cardiology, Pediatrics, etc.) map to NIIT academic programmes.",
        table: "tbl_departments / departments",
        fieldMapping: {
            department_id: "programmeId",
            department_name: "programmeName (e.g. 'Web Development', 'CyberOps')",
            description: "courseDescription",
            head_of_department: "courseCoordinator / leadLecturer",
            status: "status",
        },
    },

    // 5. HOSPITAL BILLING / INVOICES -> NIIT TUITION FEES & PAYMENTS
    invoices: {
        targetEntity: "Payments & Tuition Receipts",
        description: "Hospital consultation and treatment bills map to student tuition and registration fees.",
        table: "tbl_bills / invoices / payments",
        fieldMapping: {
            invoice_id: "paymentId / receiptNo",
            patient_id: "studentId",
            amount: "totalAmount",
            amount_paid: "amountPaid",
            balance: "outstandingBalance",
            payment_status: "status ('Paid' | 'Pending' | 'Part-Payment')",
            payment_method: "paymentMethod ('Paystack' | 'Bank Transfer' | 'Cash')",
            transaction_ref: "reference",
            created_at: "paymentDate",
        },
    },

    // 6. HOSPITAL NEXT OF KIN / GUARDIAN -> NIIT PARENTS & GUARDIANS
    guardians: {
        targetEntity: "Parents & Guardians",
        description: "Emergency contacts & patient guardians map to Parent Portal accounts.",
        table: "tbl_guardians / patient_contacts",
        fieldMapping: {
            guardian_id: "parentId",
            full_name: "parentName",
            relationship: "relationship ('Father' | 'Mother' | 'Guardian')",
            email: "email (used for Parent Portal login via Reset Password)",
            phone: "phone",
            address: "address",
            patient_id: "linkedStudentId",
        },
    },

    // 7. HOSPITAL APPOINTMENTS -> NIIT ENROLLMENTS & COUNSELING SESSIONS
    appointments: {
        targetEntity: "Counseling Sessions & Course Enrollments",
        description: "Doctor appointments map to counselor advisory sessions and student batch timings.",
        table: "tbl_appointments / appointments",
        fieldMapping: {
            appointment_id: "sessionId",
            doctor_id: "counselorId",
            patient_id: "studentId",
            appointment_date: "sessionDate",
            notes: "counselingNotes / progressReport",
            status: "sessionStatus ('Scheduled' | 'Completed' | 'Cancelled')",
        },
    },
};

/**
 * Data Transformer: Converts Hospital Patient API object to NIIT Student object
 */
export function transformPatientToStudent(patient) {
    if (!patient) return null;
    return {
        id: patient.patient_id || patient.id,
        sn: patient.sn || 1,
        sid: patient.patient_code || patient.student_id || `AD${patient.patient_id || 10000}`,
        name: `${patient.first_name || ""} ${patient.last_name || ""}`.trim() || patient.name || "Student",
        programme: patient.department_name || patient.specialization || "General Studies",
        email: patient.email || "",
        phone: patient.phone || patient.contact_no || "",
        status: (patient.status || "Active").toLowerCase() === "active" ? "Active" : "Inactive",
        parentName: patient.guardian_name || patient.next_of_kin || "—",
        parentPhone: patient.emergency_contact || patient.guardian_phone || "—",
        admissionDate: patient.created_at ? patient.created_at.split(" ")[0] : new Date().toISOString().split("T")[0],
    };
}

/**
 * Data Transformer: Converts NIIT Student to Hospital Patient payload for POST/PUT
 */
export function transformStudentToPatientPayload(student) {
    const nameParts = (student.name || "").trim().split(" ");
    const firstName = student.firstName || nameParts[0] || "";
    const lastName = student.lastName || nameParts.slice(1).join(" ") || "";

    return {
        first_name: firstName,
        last_name: lastName,
        patient_code: student.sid,
        email: student.email || "",
        phone: student.phone || "",
        department_name: student.programme || "",
        guardian_name: student.parentName || "",
        emergency_contact: student.parentPhone || "",
        status: student.status || "Active",
    };
}

/**
 * Data Transformer: Converts Hospital Bill to NIIT Payment Record
 */
export function transformBillToPayment(bill) {
    if (!bill) return null;
    return {
        id: bill.invoice_id || bill.id,
        receiptNo: bill.invoice_number || `REC-${bill.invoice_id || 1000}`,
        studentId: bill.patient_code || bill.patient_id,
        studentName: bill.patient_name || bill.first_name ? `${bill.first_name} ${bill.last_name}` : "Student",
        programme: bill.department_name || "Tuition Fee",
        amount: Number(bill.amount || bill.total_cost || 0),
        status: (bill.payment_status || "Pending").toLowerCase() === "paid" ? "Paid" : "Pending",
        date: bill.created_at ? bill.created_at.split(" ")[0] : new Date().toISOString().split("T")[0],
        paymentMethod: bill.payment_method || "Paystack",
    };
}
