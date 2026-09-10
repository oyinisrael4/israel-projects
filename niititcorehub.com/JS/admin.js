/**
 * Admin Management JavaScript
 * Handles the Admin card grid (role + status filter, search), the
 * in-page "Create New Admin" drawer (with a Students Brought picker
 * that only appears for the Counselor role), and the Administrative
 * Profile view modal opened by clicking a card.
 */

document.addEventListener("DOMContentLoaded", function () {

    // ─── Element references ────────────────────────────────────────
    const adminGrid = document.getElementById("adminGrid");
    const adminCountEl = document.getElementById("adminCount");
    const roleFilter = document.getElementById("roleFilter");
    const statusFilter = document.getElementById("statusFilter");
    const topbarSearch = document.querySelector(".topbar-search-box input");

    const adminModalOverlay = document.getElementById("adminModalOverlay");
    const addAdminBtn = document.getElementById("addAdminBtn");
    const closeAdminBtn = document.getElementById("adminModalCloseBtn");
    const addAdminForm = document.getElementById("addAdminForm");
    const adminRoleSelect = document.getElementById("adminRole");
    const studentsBroughtSection = document.getElementById("studentsBroughtSection");

    const profileModalOverlay = document.getElementById("profileModalOverlay");
    const profileModalCloseBtn = document.getElementById("profileModalCloseBtn");

    // ─── Per-card profile data, keyed by the card's data-id ─────────
    // (In a real backend this would come from an API; here it mirrors
    // what's already printed on each card so the profile modal has
    // something accurate to show.)
    const adminProfiles = {
        "admin-1": {
            fullName: "Jone Copper", email: "jonecopper@niit.edu", phone: "090 3427 5446",
            position: "Super Admin", status: "Active", lastLogin: "2026-09-01 10:00 AM",
            avatar: "all-images/icon-images/admin-avatar.png", studentsBrought: []
        },
        "admin-2": {
            fullName: "Oladele Philip", email: "oladelephilip@niit.edu", phone: "090 3427 5446",
            position: "President", status: "Active", lastLogin: "2026-08-30 08:45 AM",
            avatar: "all-images/icon-images/admin-3.png", studentsBrought: []
        },
        "admin-3": {
            fullName: "Kathryn Murphy", email: "kathrynmurphy@niit.edu", phone: "080 9898 7876",
            position: "Registrar", status: "Active", lastLogin: "2026-08-29 02:45 PM",
            avatar: "all-images/icon-images/profile-2.png", studentsBrought: []
        },
        "admin-4": {
            fullName: "Adebiyi Abasi", email: "adebiyiabasi@niit.edu", phone: "080 6046 8880",
            position: "Counselor", status: "Active", lastLogin: "2026-09-02 09:15 AM",
            avatar: "all-images/icon-images/admin-4.png",
            studentsBrought: [
                { name: "Arlene McCoy", id: "AD33578", avatar: "all-images/icon-images/student-1.png" },
                { name: "Wade Warren", id: "AD45231", avatar: "all-images/icon-images/student-2.png" }
            ]
        },
        "admin-5": {
            fullName: "Grace Okafor", email: "graceokafor@niit.edu", phone: "080 3709 5149",
            position: "Counselor", status: "Inactive", lastLogin: "2026-08-18 04:20 PM",
            avatar: "all-images/icon-images/admin-5.png",
            studentsBrought: [
                { name: "Brooklyn Simmons", id: "AD67452", avatar: "all-images/icon-images/student-3.png" }
            ]
        }
    };

    // ─── Count text ───────────────────────────────────────────────
    function updateAdminCount() {
        if (!adminGrid || !adminCountEl) return;
        const count = adminGrid.querySelectorAll(".person-card").length;
        adminCountEl.textContent = `${count} administrator${count !== 1 ? 's' : ''}`;
    }

    // ─── Role filter options (built from whatever roles exist) ─────
    if (roleFilter && adminGrid) {
        const existingRoles = new Set();
        adminGrid.querySelectorAll(".person-card").forEach(card => {
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

        adminGrid.querySelectorAll(".person-card").forEach(card => {
            const matchesRole = role === "all" || card.getAttribute("data-role") === role;
            const matchesStatus = status === "all" || card.getAttribute("data-status") === status;
            const matchesSearch = !query || (card.getAttribute("data-search") || "").includes(query);
            card.style.display = (matchesRole && matchesStatus && matchesSearch) ? "" : "none";
        });
    }

    if (roleFilter) roleFilter.addEventListener("change", applyFilters);
    if (statusFilter) statusFilter.addEventListener("change", applyFilters);
    if (topbarSearch) topbarSearch.addEventListener("input", applyFilters);

    // ─── Create New Admin drawer: open / close ─────────────────────
    if (addAdminBtn && adminModalOverlay) {
        addAdminBtn.addEventListener("click", function () {
            adminModalOverlay.classList.add("side-drawer-visible");
            const firstInput = adminModalOverlay.querySelector("input, select");
            if (firstInput) setTimeout(() => firstInput.focus(), 150);
        });
    }

    function closeAdminModal() {
        if (!adminModalOverlay) return;
        adminModalOverlay.classList.remove("side-drawer-visible");
        if (addAdminForm) addAdminForm.reset();
        if (studentsBroughtSection) studentsBroughtSection.classList.remove("students-brought-visible");
    }

    if (closeAdminBtn) closeAdminBtn.addEventListener("click", closeAdminModal);
    if (adminModalOverlay) {
        adminModalOverlay.addEventListener("click", function (e) {
            if (e.target === adminModalOverlay) closeAdminModal();
        });
    }

    // ─── Reveal "Students Brought" only when Role = Counselor ──────
    if (adminRoleSelect && studentsBroughtSection) {
        adminRoleSelect.addEventListener("change", function () {
            if (this.value === "Counselor") {
                studentsBroughtSection.classList.add("students-brought-visible");
            } else {
                studentsBroughtSection.classList.remove("students-brought-visible");
                studentsBroughtSection.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
            }
        });
    }

    // ─── Handle Add Admin form submit ──────────────────────────────
    if (addAdminForm && adminGrid) {
        addAdminForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = (document.getElementById("adminTitle")?.value || "").trim();
            const firstName = (document.getElementById("adminFirstName")?.value || "").trim();
            const lastName = (document.getElementById("adminLastName")?.value || "").trim();
            const email = (document.getElementById("adminEmail")?.value || "").trim();
            const phone = (document.getElementById("adminPhone")?.value || "").trim();
            const role = (document.getElementById("adminRole")?.value || "").trim();
            const status = (document.getElementById("adminStatus")?.value || "Active").trim();

            if (!firstName || !lastName || !email || !phone || !role) {
                alert("Please fill in all required fields.");
                return;
            }

            const fullName = `${title ? title + ' ' : ''}${firstName} ${lastName}`;
            const cardCount = adminGrid.querySelectorAll(".person-card").length + 1;
            const cardId = "admin-new-" + cardCount;
            const statusClass = status.toLowerCase() === "active" ? "status-badge-active" : "status-badge-inactive";
            const searchData = `${fullName} ${role}`.toLowerCase();

            // Collect ticked "students brought" (only relevant for Counselor)
            let studentsBrought = [];
            if (role === "Counselor" && studentsBroughtSection) {
                studentsBroughtSection.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
                    studentsBrought.push({ name: cb.value, id: cb.getAttribute("data-id"), avatar: "" });
                });
            }

            adminProfiles[cardId] = {
                fullName, email, phone, position: role, status,
                lastLogin: "00-00-00 00:00:00",
                avatar: "all-images/icon-images/admin-avatar.png",
                studentsBrought
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
                        <img src="all-images/icon-images/admin-avatar.png" alt="${fullName}">
                    </div>
                    <div class="person-card-avatar-bar" style="background: var(--primary-color);"></div>
                </div>
                <div class="person-card-body">
                    <h4>${fullName}</h4>
                    <p class="person-card-role">${role}</p>
                    <p class="person-card-contact">${phone}</p>
                    <div class="person-card-meta-row">
                        <span class="person-card-role-tag">${roleTag}</span>
                        <span class="status-badge ${statusClass}">${status}</span>
                    </div>
                </div>
            `;
            card.addEventListener("click", () => openProfileModal(cardId));
            adminGrid.appendChild(card);

            // New role may not be in the filter list yet
            if (roleFilter && ![...roleFilter.options].some(o => o.value === role)) {
                const option = document.createElement("option");
                option.value = role;
                option.textContent = role;
                roleFilter.appendChild(option);
            }

            updateAdminCount();
            closeAdminModal();
        });
    }

    // ─── Profile view modal ─────────────────────────────────────────
    function openProfileModal(cardId) {
        const data = adminProfiles[cardId];
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

        const broughtWrapper = document.getElementById("profileStudentsBroughtWrapper");
        const broughtList = document.getElementById("profileStudentsBrought");
        if (data.studentsBrought && data.studentsBrought.length > 0) {
            broughtWrapper.style.display = "block";
            broughtList.innerHTML = data.studentsBrought.map(s => `
                <div class="profile-student-chip">
                    ${s.avatar ? `<img src="${s.avatar}" alt="${s.name}">` : ''}
                    <div class="profile-student-chip-text">
                        <h5>${s.name}</h5>
                        <p>Student ID: ${s.id}</p>
                    </div>
                </div>
            `).join("");
        } else if (data.position === "Counselor") {
            broughtWrapper.style.display = "block";
            broughtList.innerHTML = `<p class="profile-students-brought-empty">No students recorded yet.</p>`;
        } else {
            broughtWrapper.style.display = "none";
            broughtList.innerHTML = "";
        }

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

    // Wire up clicks on the cards already in the page
    if (adminGrid) {
        adminGrid.querySelectorAll(".person-card").forEach(card => {
            card.addEventListener("click", () => openProfileModal(card.getAttribute("data-id")));
        });
    }

    updateAdminCount();
});
