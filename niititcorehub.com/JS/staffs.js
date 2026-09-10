/**
 * Staffs Management JavaScript
 * Handles in-page Add Staff modal with backdrop blur,
 * dynamic staff creation, table updates, counts, filtering, and search.
 */

document.addEventListener("DOMContentLoaded", function () {
    const staffModalOverlay = document.getElementById("staffModalOverlay");
    const addStaffBtn = document.getElementById("addStaffBtn");
    const closeStaffBtn = document.getElementById("staffModalCloseBtn");
    const cancelStaffBtn = document.getElementById("cancelStaffBtn");
    const addStaffForm = document.getElementById("addStaffForm");
    const staffTable = document.getElementById("staffTable");
    const staffTableBody = staffTable ? staffTable.querySelector("tbody") : null;
    const staffCountEl = document.getElementById("staffCount");
    const roleFilter = document.getElementById("roleFilter");
    const topbarSearch = document.querySelector(".topbar-search-box input");

    const avatarPool = [
        "all-images/icon-images/staff-1.png",
        "all-images/icon-images/staff-2.png",
        "all-images/icon-images/teacher-avatar.png",
        "all-images/icon-images/admin-avatar.png"
    ];

    function updateStaffCount() {
        if (!staffTableBody || !staffCountEl) return;
        const count = staffTableBody.querySelectorAll("tr").length;
        staffCountEl.textContent = `${count} staff member${count !== 1 ? 's' : ''}`;
    }

    // Modal open
    if (addStaffBtn && staffModalOverlay) {
        addStaffBtn.addEventListener("click", function (e) {
            e.preventDefault();
            staffModalOverlay.classList.add("side-drawer-visible");
            staffModalOverlay.classList.add("inpage-modal-visible");
            const firstInput = staffModalOverlay.querySelector("input, select");
            if (firstInput) setTimeout(() => firstInput.focus(), 150);
        });
    }

    // Modal close helpers
    function closeStaffModal() {
        if (staffModalOverlay) {
            staffModalOverlay.classList.remove("side-drawer-visible");
            staffModalOverlay.classList.remove("inpage-modal-visible");
            if (addStaffForm) addStaffForm.reset();
        }
    }

    if (closeStaffBtn) closeStaffBtn.addEventListener("click", closeStaffModal);
    if (cancelStaffBtn) cancelStaffBtn.addEventListener("click", closeStaffModal);

    if (staffModalOverlay) {
        staffModalOverlay.addEventListener("click", function (e) {
            if (e.target === staffModalOverlay) closeStaffModal();
        });
    }

    // Handle Add Staff form submit
    if (addStaffForm && staffTableBody) {
        addStaffForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = (document.getElementById("staffTitle")?.value || "").trim();
            const firstName = (document.getElementById("staffFirstName")?.value || "").trim();
            const lastName = (document.getElementById("staffLastName")?.value || "").trim();
            const email = (document.getElementById("staffEmail")?.value || "").trim();
            const phone = (document.getElementById("staffPhone")?.value || "").trim();
            const address = (document.getElementById("staffAddress")?.value || "").trim();
            const role = (document.getElementById("staffRole")?.value || "Teacher").trim();
            const status = (document.getElementById("staffStatus")?.value || "Active").trim();

            if (!firstName || !lastName || !email || !phone || !role) {
                alert("Please fill in all required fields.");
                return;
            }

            const fullName = `${title ? title + ' ' : ''}${firstName} ${lastName}`;
            const rowCount = staffTableBody.querySelectorAll("tr").length + 1;
            const staffId = "STAFF" + String(rowCount).padStart(3, "0");
            const randomAvatar = avatarPool[Math.floor(Math.random() * avatarPool.length)];
            const statusClass = status.toLowerCase() === "active" ? "status-badge-active" : "status-badge-inactive";
            const searchData = `${fullName} ${staffId} ${role}`.toLowerCase();

            const now = new Date();
            const dateStr = now.toISOString().split("T")[0] + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newRow = document.createElement("tr");
            newRow.setAttribute("data-role", role);
            newRow.setAttribute("data-search", searchData);
            newRow.innerHTML = `
                <td class="marks-table-admission-no">${rowCount}</td>
                <td>
                    <div class="marks-table-student">
                        <img src="${randomAvatar}" alt="${fullName}">
                        <div>
                            <h4>${fullName}</h4>
                            <p>Staff ID: ${staffId}</p>
                        </div>
                    </div>
                </td>
                <td>${role}</td>
                <td>${dateStr}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td><button class="table-view-btn" type="button">View</button></td>
            `;

            staffTableBody.appendChild(newRow);
            updateStaffCount();
            closeStaffModal();
        });
    }

    // Role Filter
    if (roleFilter && staffTableBody) {
        const existingRoles = new Set();
        staffTableBody.querySelectorAll("tr").forEach(row => {
            const r = row.getAttribute("data-role");
            if (r) existingRoles.add(r);
        });

        existingRoles.forEach(r => {
            const option = document.createElement("option");
            option.value = r;
            option.textContent = r;
            roleFilter.appendChild(option);
        });

        roleFilter.addEventListener("change", function () {
            const selected = this.value;
            const rows = staffTableBody.querySelectorAll("tr");
            rows.forEach(row => {
                const r = row.getAttribute("data-role");
                if (selected === "all" || r === selected) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }

    // Topbar Search
    if (topbarSearch && staffTableBody) {
        topbarSearch.addEventListener("input", function () {
            const query = this.value.trim().toLowerCase();
            const rows = staffTableBody.querySelectorAll("tr");
            rows.forEach(row => {
                const search = (row.getAttribute("data-search") || "").toLowerCase();
                row.style.display = search.includes(query) ? "" : "none";
            });
        });
    }

    updateStaffCount();
});
