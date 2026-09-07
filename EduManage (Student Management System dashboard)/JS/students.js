/**
 * Students Management JavaScript
 * Handles in-page Add Student modal with backdrop blur,
 * dynamic student creation, table updates, counts, filtering, and search.
 */

document.addEventListener("DOMContentLoaded", function () {
    const studentModalOverlay = document.getElementById("studentModalOverlay");
    const addStudentBtn = document.getElementById("addStudentBtn");
    const closeStudentBtn = document.getElementById("studentModalCloseBtn");
    const cancelStudentBtn = document.getElementById("cancelStudentBtn");
    const addStudentForm = document.getElementById("addStudentForm");
    const studentTable = document.getElementById("studentTable");
    const studentTableBody = studentTable ? studentTable.querySelector("tbody") : null;
    const studentCountEl = document.getElementById("studentCount");
    const programmeFilter = document.getElementById("programmeFilter");
    const topbarSearch = document.querySelector(".topbar-search-box input");

    // Predefined avatar pool for new students
    const avatarPool = [
        "all-images/icon-images/student-1.png",
        "all-images/icon-images/student-2.png",
        "all-images/icon-images/student-3.png",
        "all-images/icon-images/student-4.png",
        "all-images/icon-images/student-5.png"
    ];

    function updateStudentCount() {
        if (!studentTableBody || !studentCountEl) return;
        const visibleRows = studentTableBody.querySelectorAll("tr").length;
        studentCountEl.textContent = `${visibleRows} student${visibleRows !== 1 ? 's' : ''}`;
    }

    // Modal open
    if (addStudentBtn && studentModalOverlay) {
        addStudentBtn.addEventListener("click", function (e) {
            e.preventDefault();
            studentModalOverlay.classList.add("side-drawer-visible");
            studentModalOverlay.classList.add("inpage-modal-visible");
            const firstInput = studentModalOverlay.querySelector("input");
            if (firstInput) setTimeout(() => firstInput.focus(), 150);
        });
    }

    // Modal close helpers
    function closeStudentModal() {
        if (studentModalOverlay) {
            studentModalOverlay.classList.remove("side-drawer-visible");
            studentModalOverlay.classList.remove("inpage-modal-visible");
            if (addStudentForm) addStudentForm.reset();
        }
    }

    if (closeStudentBtn) closeStudentBtn.addEventListener("click", closeStudentModal);
    if (cancelStudentBtn) cancelStudentBtn.addEventListener("click", closeStudentModal);

    if (studentModalOverlay) {
        studentModalOverlay.addEventListener("click", function (e) {
            if (e.target === studentModalOverlay) closeStudentModal();
        });
    }

    // Handle Add Student form submit
    if (addStudentForm && studentTableBody) {
        addStudentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const firstName = (document.getElementById("studentFirstName")?.value || "").trim();
            const lastName = (document.getElementById("studentLastName")?.value || "").trim();
            const email = (document.getElementById("studentEmail")?.value || "").trim();
            const phone = (document.getElementById("studentPhone")?.value || "").trim();
            const address = (document.getElementById("studentAddress")?.value || "").trim();
            const programme = (document.getElementById("studentProgramme")?.value || "").trim();
            const status = (document.getElementById("studentStatus")?.value || "Active").trim();

            if (!firstName || !lastName || !email || !phone || !programme) {
                alert("Please fill in all required fields.");
                return;
            }

            const fullName = `${firstName} ${lastName}`;
            const studentId = "AD" + Math.floor(10000 + Math.random() * 90000);
            const randomAvatar = avatarPool[Math.floor(Math.random() * avatarPool.length)];
            const rowCount = studentTableBody.querySelectorAll("tr").length + 1;
            const statusClass = status.toLowerCase() === "active" ? "status-badge-active" : "status-badge-inactive";
            const searchData = `${fullName} ${studentId} ${programme}`.toLowerCase();

            const newRow = document.createElement("tr");
            newRow.setAttribute("data-programme", programme);
            newRow.setAttribute("data-search", searchData);
            newRow.innerHTML = `
                <td class="marks-table-admission-no">${rowCount}</td>
                <td>
                    <div class="marks-table-student">
                        <img src="${randomAvatar}" alt="${fullName}">
                        <div>
                            <h4>${fullName}</h4>
                            <p>Student ID: ${studentId}</p>
                        </div>
                    </div>
                </td>
                <td>${programme}</td>
                <td>${phone}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td><button class="table-view-btn" type="button">View</button></td>
            `;

            studentTableBody.appendChild(newRow);
            updateStudentCount();
            closeStudentModal();
        });
    }

    // Programme Filter
    if (programmeFilter && studentTableBody) {
        // Collect programmes from existing rows
        const existingProgrammes = new Set();
        studentTableBody.querySelectorAll("tr").forEach(row => {
            const prog = row.getAttribute("data-programme");
            if (prog) existingProgrammes.add(prog);
        });

        existingProgrammes.forEach(prog => {
            const option = document.createElement("option");
            option.value = prog;
            option.textContent = prog;
            programmeFilter.appendChild(option);
        });

        programmeFilter.addEventListener("change", function () {
            const selected = this.value;
            const rows = studentTableBody.querySelectorAll("tr");
            rows.forEach(row => {
                const prog = row.getAttribute("data-programme");
                if (selected === "all" || prog === selected) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }

    // Search Box
    if (topbarSearch && studentTableBody) {
        topbarSearch.addEventListener("input", function () {
            const query = this.value.trim().toLowerCase();
            const rows = studentTableBody.querySelectorAll("tr");
            rows.forEach(row => {
                const search = (row.getAttribute("data-search") || "").toLowerCase();
                row.style.display = search.includes(query) ? "" : "none";
            });
        });
    }

    updateStudentCount();
});
