/**
 * NIIT CoreHub - Counselor Management JavaScript
 * Handles the Counselor card grid (status filter, search), the
 * "Create New Counselor" drawer (with Students Brought picker),
 * and the Counselor Profile view modal.
 */

document.addEventListener("DOMContentLoaded", function () {

    // ─── Element references ────────────────────────────────────────
    const counselorGrid = document.getElementById("counselorGrid");
    const counselorCountEl = document.getElementById("counselorCount");
    const statusFilter = document.getElementById("statusFilter");
    const topbarSearch = document.querySelector(".topbar-search-box input");

    const counselorModalOverlay = document.getElementById("counselorModalOverlay");
    const addCounselorBtn = document.getElementById("addCounselorBtn");
    const closeCounselorBtn = document.getElementById("counselorModalCloseBtn");
    const addCounselorForm = document.getElementById("addCounselorForm");
    const studentsBroughtSection = document.getElementById("counselorStudentsBroughtSection");

    const profileModalOverlay = document.getElementById("profileModalOverlay");
    const profileModalCloseBtn = document.getElementById("profileModalCloseBtn");

    // ─── Per-card profile data, keyed by card's data-id ─────────
    const counselorProfiles = {
        "counselor-1": {
            fullName: "Adebiyi Abasi", email: "adebiyiabasi@niit.edu", phone: "080 6046 8880",
            position: "Counselor", status: "Active", lastLogin: "2026-09-02 09:15 AM",
            avatar: "all-images/icon-images/admin-4.png",
            studentsBrought: [
                { name: "Arlene McCoy", id: "AD33578", avatar: "all-images/icon-images/student-1.png" },
                { name: "Wade Warren", id: "AD45231", avatar: "all-images/icon-images/student-2.png" }
            ]
        },
        "counselor-2": {
            fullName: "Grace Okafor", email: "graceokafor@niit.edu", phone: "080 3709 5149",
            position: "Counselor", status: "Inactive", lastLogin: "2026-08-18 04:20 PM",
            avatar: "all-images/icon-images/admin-5.png",
            studentsBrought: [
                { name: "Brooklyn Simmons", id: "AD67452", avatar: "all-images/icon-images/student-3.png" }
            ]
        }
    };

    // ─── Count text ───────────────────────────────────────────────
    function updateCounselorCount() {
        if (!counselorGrid || !counselorCountEl) return;
        const count = counselorGrid.querySelectorAll(".person-card").length;
        counselorCountEl.textContent = `${count} counselor${count !== 1 ? 's' : ''}`;
    }

    // ─── Combined filter: status + search must both match ─────────
    function applyFilters() {
        const status = statusFilter ? statusFilter.value : "all";
        const query = topbarSearch ? topbarSearch.value.trim().toLowerCase() : "";

        counselorGrid.querySelectorAll(".person-card").forEach(card => {
            const matchesStatus = status === "all" || card.getAttribute("data-status") === status;
            const matchesSearch = !query || (card.getAttribute("data-search") || "").includes(query);
            card.style.display = (matchesStatus && matchesSearch) ? "" : "none";
        });
    }

    if (statusFilter) statusFilter.addEventListener("change", applyFilters);
    if (topbarSearch) topbarSearch.addEventListener("input", applyFilters);

    // ─── Create New Counselor drawer: open / close ─────────────────
    if (addCounselorBtn && counselorModalOverlay) {
        addCounselorBtn.addEventListener("click", function () {
            counselorModalOverlay.classList.add("side-drawer-visible");
            const firstInput = counselorModalOverlay.querySelector("input, select");
            if (firstInput) setTimeout(() => firstInput.focus(), 150);
        });
    }

    function closeCounselorModal() {
        if (!counselorModalOverlay) return;
        counselorModalOverlay.classList.remove("side-drawer-visible");
        if (addCounselorForm) addCounselorForm.reset();
    }

    if (closeCounselorBtn) closeCounselorBtn.addEventListener("click", closeCounselorModal);
    if (counselorModalOverlay) {
        counselorModalOverlay.addEventListener("click", function (e) {
            if (e.target === counselorModalOverlay) closeCounselorModal();
        });
    }

    // ─── Handle Add Counselor form submit ──────────────────────────
    if (addCounselorForm && counselorGrid) {
        addCounselorForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = (document.getElementById("counselorTitle")?.value || "").trim();
            const firstName = (document.getElementById("counselorFirstName")?.value || "").trim();
            const lastName = (document.getElementById("counselorLastName")?.value || "").trim();
            const email = (document.getElementById("counselorEmail")?.value || "").trim();
            const phone = (document.getElementById("counselorPhone")?.value || "").trim();
            const status = (document.getElementById("counselorStatus")?.value || "Active").trim();

            if (!firstName || !lastName || !email || !phone) {
                alert("Please fill in all required fields.");
                return;
            }

            const fullName = `${title ? title + ' ' : ''}${firstName} ${lastName}`;
            const cardCount = counselorGrid.querySelectorAll(".person-card").length + 1;
            const cardId = "counselor-new-" + cardCount;
            const statusClass = status.toLowerCase() === "active" ? "status-badge-active" : "status-badge-inactive";
            const searchData = `${fullName} counselor`.toLowerCase();

            // Collect students brought
            let studentsBrought = [];
            if (studentsBroughtSection) {
                studentsBroughtSection.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
                    studentsBrought.push({ name: cb.value, id: cb.getAttribute("data-id"), avatar: "" });
                });
            }

            counselorProfiles[cardId] = {
                fullName, email, phone, position: "Counselor", status,
                lastLogin: "00-00-00 00:00:00",
                avatar: "all-images/icon-images/admin-avatar.png",
                studentsBrought
            };

            const card = document.createElement("div");
            card.className = "person-card";
            card.setAttribute("data-id", cardId);
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
                    <p class="person-card-role">Counselor</p>
                    <p class="person-card-contact">${phone}</p>
                    <div class="person-card-meta-row">
                        <span class="person-card-role-tag">COUNSELOR</span>
                        <span class="status-badge ${statusClass}">${status}</span>
                    </div>
                </div>
            `;
            card.addEventListener("click", () => openProfileModal(cardId));
            counselorGrid.appendChild(card);

            updateCounselorCount();
            closeCounselorModal();
        });
    }

    // ─── Profile view modal ─────────────────────────────────────────
    function openProfileModal(cardId) {
        const data = counselorProfiles[cardId];
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
        if (broughtList) {
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
            } else {
                broughtWrapper.style.display = "block";
                broughtList.innerHTML = `<p class="profile-students-brought-empty">No students recorded yet.</p>`;
            }
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

    // Wire up clicks on cards already in the page
    if (counselorGrid) {
        counselorGrid.querySelectorAll(".person-card").forEach(card => {
            card.addEventListener("click", () => openProfileModal(card.getAttribute("data-id")));
        });
    }

    updateCounselorCount();
});
