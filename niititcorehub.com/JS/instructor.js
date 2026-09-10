/**
 * Instructor Management JavaScript
 * Handles the Instructor card grid (role + status filter, search), the
 * in-page "Create New Instructor" drawer, and the Instructor Profile
 * view modal opened by clicking a card.
 */

document.addEventListener("DOMContentLoaded", function () {

    // ─── Element references ────────────────────────────────────────
    const instructorGrid = document.getElementById("instructorGrid");
    const instructorCountEl = document.getElementById("instructorCount");
    const roleFilter = document.getElementById("roleFilter");
    const statusFilter = document.getElementById("statusFilter");
    const topbarSearch = document.querySelector(".topbar-search-box input");

    const instructorModalOverlay = document.getElementById("instructorModalOverlay");
    const addInstructorBtn = document.getElementById("addInstructorBtn");
    const closeInstructorBtn = document.getElementById("instructorModalCloseBtn");
    const addInstructorForm = document.getElementById("addInstructorForm");

    const profileModalOverlay = document.getElementById("profileModalOverlay");
    const profileModalCloseBtn = document.getElementById("profileModalCloseBtn");

    // ─── Per-card profile data, keyed by the card's data-id ─────────
    const instructorProfiles = {
        "instructor-1": {
            fullName: "Courtney Henry", email: "courtneyhenry@niit.edu", phone: "080 3123 4567",
            position: "Tutor — Web Development", status: "Active", lastLogin: "2026-08-30 09:12 AM",
            avatar: "all-images/icon-images/teacher-avatar.png"
        },
        "instructor-2": {
            fullName: "Robert Fox", email: "robertfox@niit.edu", phone: "081 0345 6789",
            position: "Tutor — Cybersecurity", status: "Inactive", lastLogin: "2026-08-20 08:03 AM",
            avatar: "all-images/icon-images/staff-1.png"
        },
        "instructor-3": {
            fullName: "Eleanor Pena", email: "eleanorpena@niit.edu", phone: "081 3456 7890",
            position: "Senior Lecturer — Data Analysis", status: "Active", lastLogin: "2026-08-31 11:20 AM",
            avatar: "all-images/icon-images/staff-2.png"
        },
        "instructor-4": {
            fullName: "Leslie Alexander", email: "lesliealexander@niit.edu", phone: "081 6567 8901",
            position: "Lecturer — Networking", status: "Active", lastLogin: "2026-09-01 01:40 PM",
            avatar: "all-images/icon-images/instructor-4.png"
        }
    };

    // ─── Count text ───────────────────────────────────────────────
    function updateInstructorCount() {
        if (!instructorGrid || !instructorCountEl) return;
        const count = instructorGrid.querySelectorAll(".person-card").length;
        instructorCountEl.textContent = `${count} instructor${count !== 1 ? 's' : ''}`;
    }

    // ─── Role filter options (built from whatever roles exist) ─────
    if (roleFilter && instructorGrid) {
        const existingRoles = new Set();
        instructorGrid.querySelectorAll(".person-card").forEach(card => {
            const r = card.getAttribute("data-role");
            if (r) existingRoles.add(r);
        });
        existingRoles.forEach(r => {
            const option = document.createElement("option");
            option.value = r;
            option.textContent = r;
            roleFilter.appendChild(option);
        });
    }

    // ─── Combined filter: role + status + search must all match ───
    function applyFilters() {
        const role = roleFilter ? roleFilter.value : "all";
        const status = statusFilter ? statusFilter.value : "all";
        const query = topbarSearch ? topbarSearch.value.trim().toLowerCase() : "";

        instructorGrid.querySelectorAll(".person-card").forEach(card => {
            const matchesRole = role === "all" || card.getAttribute("data-role") === role;
            const matchesStatus = status === "all" || card.getAttribute("data-status") === status;
            const matchesSearch = !query || (card.getAttribute("data-search") || "").includes(query);
            card.style.display = (matchesRole && matchesStatus && matchesSearch) ? "" : "none";
        });
    }

    if (roleFilter) roleFilter.addEventListener("change", applyFilters);
    if (statusFilter) statusFilter.addEventListener("change", applyFilters);
    if (topbarSearch) topbarSearch.addEventListener("input", applyFilters);

    // ─── Create New Instructor drawer: open / close ────────────────
    if (addInstructorBtn && instructorModalOverlay) {
        addInstructorBtn.addEventListener("click", function () {
            instructorModalOverlay.classList.add("side-drawer-visible");
            const firstInput = instructorModalOverlay.querySelector("input, select");
            if (firstInput) setTimeout(() => firstInput.focus(), 150);
        });
    }

    function closeInstructorModal() {
        if (!instructorModalOverlay) return;
        instructorModalOverlay.classList.remove("side-drawer-visible");
        if (addInstructorForm) addInstructorForm.reset();
    }

    if (closeInstructorBtn) closeInstructorBtn.addEventListener("click", closeInstructorModal);
    if (instructorModalOverlay) {
        instructorModalOverlay.addEventListener("click", function (e) {
            if (e.target === instructorModalOverlay) closeInstructorModal();
        });
    }

    // ─── Handle Add Instructor form submit ──────────────────────────
    if (addInstructorForm && instructorGrid) {
        addInstructorForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = (document.getElementById("instructorTitle")?.value || "").trim();
            const firstName = (document.getElementById("instructorFirstName")?.value || "").trim();
            const lastName = (document.getElementById("instructorLastName")?.value || "").trim();
            const email = (document.getElementById("instructorEmail")?.value || "").trim();
            const phone = (document.getElementById("instructorPhone")?.value || "").trim();
            const role = (document.getElementById("instructorRole")?.value || "").trim();
            const programme = (document.getElementById("instructorProgramme")?.value || "").trim();
            const status = (document.getElementById("instructorStatus")?.value || "Active").trim();

            if (!firstName || !lastName || !email || !phone || !role || !programme) {
                alert("Please fill in all required fields.");
                return;
            }

            const fullName = `${title ? title + ' ' : ''}${firstName} ${lastName}`;
            const position = `${role} — ${programme}`;
            const cardCount = instructorGrid.querySelectorAll(".person-card").length + 1;
            const cardId = "instructor-new-" + cardCount;
            const statusClass = status.toLowerCase() === "active" ? "status-badge-active" : "status-badge-inactive";
            const searchData = `${fullName} ${role} ${programme}`.toLowerCase();

            instructorProfiles[cardId] = {
                fullName, email, phone, position, status,
                lastLogin: "00-00-00 00:00:00",
                avatar: "all-images/icon-images/teacher-avatar.png"
            };

            const roleTag = role.toUpperCase();
            const card = document.createElement("div");
            card.className = "person-card";
            card.setAttribute("data-id", cardId);
            card.setAttribute("data-role", role);
            card.setAttribute("data-status", status);
            card.setAttribute("data-search", searchData);
            card.innerHTML = `
                <div>
                    <div class="person-card-avatar">
                        <img src="all-images/icon-images/teacher-avatar.png" alt="${fullName}">
                    </div>
                    <div class="person-card-avatar-bar" style="background: var(--primary-color);"></div>
                </div>
                <div class="person-card-body">
                    <h4>${fullName}</h4>
                    <p class="person-card-role">${position}</p>
                    <p class="person-card-contact">${phone}</p>
                    <div class="person-card-meta-row">
                        <span class="person-card-role-tag">${roleTag}</span>
                        <span class="status-badge ${statusClass}">${status}</span>
                    </div>
                </div>
            `;
            card.addEventListener("click", () => openProfileModal(cardId));
            instructorGrid.appendChild(card);

            if (roleFilter && ![...roleFilter.options].some(o => o.value === role)) {
                const option = document.createElement("option");
                option.value = role;
                option.textContent = role;
                roleFilter.appendChild(option);
            }

            updateInstructorCount();
            closeInstructorModal();
        });
    }

    // ─── Profile view modal ─────────────────────────────────────────
    function openProfileModal(cardId) {
        const data = instructorProfiles[cardId];
        if (!data || !profileModalOverlay) return;

        document.getElementById("profileAvatar").src = data.avatar;
        document.getElementById("profileAvatar").alt = data.fullName;
        document.getElementById("profileName").textContent = data.fullName;
        document.getElementById("profileStatus").textContent = data.status;
        document.getElementById("profileLastLogin").textContent = data.lastLogin;
        document.getElementById("profileFullName").textContent = data.fullName;
        document.getElementById("profileEmail").textContent = data.email;
        document.getElementById("profilePosition").textContent = data.position;
        document.getElementById("profilePhone").textContent = data.phone;

        profileModalOverlay.classList.add("inpage-modal-visible");
    }

    function closeProfileModal() {
        if (profileModalOverlay) profileModalOverlay.classList.remove("inpage-modal-visible");
    }

    if (profileModalCloseBtn) profileModalCloseBtn.addEventListener("click", closeProfileModal);
    if (profileModalOverlay) {
        profileModalOverlay.addEventListener("click", function (e) {
            if (e.target === profileModalOverlay) closeProfileModal();
        });
    }

    if (instructorGrid) {
        instructorGrid.querySelectorAll(".person-card").forEach(card => {
            card.addEventListener("click", () => openProfileModal(card.getAttribute("data-id")));
        });
    }

    updateInstructorCount();
});
