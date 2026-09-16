/**
 * NIIT CoreHub - Parents & Guardians Management JavaScript
 * Handles table filtering/search, Add Parent drawer, and profile view modal.
 */

export function init() {

    const parentTable = document.getElementById("parentTable");
    const parentTableBody = parentTable ? parentTable.querySelector("tbody") : null;
    const parentCountEl = document.getElementById("parentCount");
    const relationshipFilter = document.getElementById("relationshipFilter");
    const topbarSearch = document.querySelector(".topbar-search-box input");

    const parentModalOverlay = document.getElementById("parentModalOverlay");
    const addParentBtn = document.getElementById("addParentBtn");
    const closeParentBtn = document.getElementById("parentModalCloseBtn");
    const addParentForm = document.getElementById("addParentForm");

    const parentProfileModalOverlay = document.getElementById("parentProfileModalOverlay");
    const parentProfileCloseBtn = document.getElementById("parentProfileCloseBtn");

    // --------- Pre-defined parent profile data ---------------------------------------------------------------------------
    const parentProfiles = {
        "parent-1": {
            fullName: "Mr James McCoy", email: "james.mccoy@gmail.com", phone: "0812 345 6789",
            relationship: "Father", linkedStudent: "Arlene McCoy", studentId: "AD33578",
            studentAvatar: "/all-images/icon-images/student-1.png",
            avatar: "/all-images/icon-images/admin-3.png"
        },
        "parent-2": {
            fullName: "Mrs Patricia Warren", email: "pwarren@yahoo.com", phone: "0803 456 7890",
            relationship: "Mother", linkedStudent: "Wade Warren", studentId: "AD45231",
            studentAvatar: "/all-images/icon-images/student-2.png",
            avatar: "/all-images/icon-images/profile-2.png"
        },
        "parent-3": {
            fullName: "Mr Charles Simmons", email: "csimmons@outlook.com", phone: "0816 567 8901",
            relationship: "Guardian", linkedStudent: "Brooklyn Simmons", studentId: "AD67452",
            studentAvatar: "/all-images/icon-images/student-3.png",
            avatar: "/all-images/icon-images/admin-4.png"
        },
        "parent-4": {
            fullName: "Mr Henry Webb", email: "henrywebb@niit.ng", phone: "0802 678 9012",
            relationship: "Father", linkedStudent: "Theresa Webb", studentId: "AD76133",
            studentAvatar: "/all-images/icon-images/student-4.png",
            avatar: "/all-images/icon-images/admin-5.png"
        },
        "parent-5": {
            fullName: "Mrs Grace Robertson", email: "gracerobertson@gmail.com", phone: "0809 789 0123",
            relationship: "Mother", linkedStudent: "Darlene Robertson", studentId: "AD98214",
            studentAvatar: "/all-images/icon-images/student-5.png",
            avatar: "/all-images/icon-images/profile-2.png"
        }
    };

    // --------- Count text ---------------------------------------------------------------------------------------------------------------------------------------------
    function updateParentCount() {
        if (!parentTableBody || !parentCountEl) return;
        const rows = parentTableBody.querySelectorAll("tr");
        parentCountEl.textContent = `${rows.length} record${rows.length !== 1 ? 's' : ''}`;
    }

    // --------- Relationship Filter ---------------------------------------------------------------------------------------------------------------------
    if (relationshipFilter && parentTableBody) {
        relationshipFilter.addEventListener("change", function () {
            const selected = this.value;
            parentTableBody.querySelectorAll("tr").forEach(row => {
                const rel = row.getAttribute("data-relationship");
                row.style.display = (selected === "all" || rel === selected) ? "" : "none";
            });
        });
    }

    // --------- Search Box ---------------------------------------------------------------------------------------------------------------------------------------------
    if (topbarSearch && parentTableBody) {
        topbarSearch.addEventListener("input", function () {
            const query = this.value.trim().toLowerCase();
            parentTableBody.querySelectorAll("tr").forEach(row => {
                const search = (row.getAttribute("data-search") || "").toLowerCase();
                row.style.display = search.includes(query) ? "" : "none";
            });
        });
    }

    // --------- View Buttons ---------------------------------------------------------------------------------------------------------------------------------------
    function wireViewButtons() {
        document.querySelectorAll(".table-view-btn[data-parent]").forEach(btn => {
            btn.addEventListener("click", function () {
                openParentProfile(this.getAttribute("data-parent"));
            });
        });
    }
    wireViewButtons();

    // --------- Add Parent Drawer ------------------------------------------------------------------------------------------------------------------------
    if (addParentBtn && parentModalOverlay) {
        addParentBtn.addEventListener("click", function () {
            parentModalOverlay.classList.add("side-drawer-visible");
            const firstInput = parentModalOverlay.querySelector("input, select");
            if (firstInput) setTimeout(() => firstInput.focus(), 150);
        });
    }

    function closeParentModal() {
        if (!parentModalOverlay) return;
        parentModalOverlay.classList.remove("side-drawer-visible");
        if (addParentForm) addParentForm.reset();
    }

    if (closeParentBtn) closeParentBtn.addEventListener("click", closeParentModal);
    if (parentModalOverlay) {
        parentModalOverlay.addEventListener("click", function (e) {
            if (e.target === parentModalOverlay) closeParentModal();
        });
    }

    // --------- Handle Add Parent form submit ------------------------------------------------------------------------------------
    if (addParentForm && parentTableBody) {
        addParentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = (document.getElementById("parentTitle")?.value || "").trim();
            const firstName = (document.getElementById("parentFirstName")?.value || "").trim();
            const lastName = (document.getElementById("parentLastName")?.value || "").trim();
            const relationship = (document.getElementById("parentRelationship")?.value || "Guardian").trim();
            const phone = (document.getElementById("parentPhone")?.value || "").trim();
            const email = (document.getElementById("parentEmail")?.value || "").trim();
            const linkedStudent = (document.getElementById("parentLinkedStudent")?.value || "").trim();

            if (!firstName || !lastName || !phone || !email || !relationship || !linkedStudent) {
                alert("Please fill in all required fields.");
                return;
            }

            const fullName = `${title ? title + ' ' : ''}${firstName} ${lastName}`;
            const rowCount = parentTableBody.querySelectorAll("tr").length + 1;
            const studentName = linkedStudent.split(" — ")[0] || linkedStudent;
            const studentId = linkedStudent.split(" — ")[1] || "";
            const searchData = `${fullName} ${relationship} ${linkedStudent}`.toLowerCase();
            const newParentId = "parent-new-" + rowCount;

            const avatarPool = [
                "/all-images/icon-images/admin-3.png",
                "/all-images/icon-images/admin-4.png",
                "/all-images/icon-images/admin-5.png",
                "/all-images/icon-images/profile-2.png"
            ];
            const randomAvatar = avatarPool[Math.floor(Math.random() * avatarPool.length)];

            parentProfiles[newParentId] = {
                fullName, email, phone, relationship, linkedStudent: studentName,
                studentId, studentAvatar: "/all-images/icon-images/student-1.png",
                avatar: randomAvatar
            };

            const newRow = document.createElement("tr");
            newRow.setAttribute("data-relationship", relationship);
            newRow.setAttribute("data-search", searchData);
            newRow.innerHTML = `
                <td class="marks-table-admission-no">${rowCount}</td>
                <td>
                    <div class="marks-table-student">
                        <img src="${randomAvatar}" alt="${fullName}">
                        <div>
                            <h4>${fullName}</h4>
                            <p>Added: Just now</p>
                        </div>
                    </div>
                </td>
                <td><span class="person-card-role-tag">${relationship.toUpperCase()}</span></td>
                <td>
                    <div class="marks-table-student">
                        <img src="/all-images/icon-images/student-1.png" alt="${studentName}">
                        <div>
                            <h4>${studentName}</h4>
                            <p>${studentId}</p>
                        </div>
                    </div>
                </td>
                <td>${phone}</td>
                <td>${email}</td>
                <td><button class="table-view-btn" type="button" data-parent="${newParentId}">View</button></td>
            `;

            parentTableBody.appendChild(newRow);
            wireViewButtons();
            updateParentCount();
            closeParentModal();
        });
    }

    // --------- Parent Profile Modal ------------------------------------------------------------------------------------------------------------
    function openParentProfile(parentId) {
        const data = parentProfiles[parentId];
        if (!data || !parentProfileModalOverlay) return;

        document.getElementById("parentProfileAvatar").src = data.avatar;
        document.getElementById("parentProfileAvatar").alt = data.fullName;
        document.getElementById("parentProfileName").textContent = data.fullName;
        document.getElementById("parentProfileRelation").textContent = data.relationship;
        document.getElementById("parentProfileFullName").textContent = data.fullName;
        document.getElementById("parentProfileEmail").textContent = data.email;
        document.getElementById("parentProfilePhone").textContent = data.phone;
        document.getElementById("parentProfileRelationField").textContent = data.relationship;

        const linkedEl = document.getElementById("parentProfileLinkedStudent");
        if (linkedEl) {
            linkedEl.innerHTML = `
                <div class="profile-student-chip">
                    <img src="${data.studentAvatar}" alt="${data.linkedStudent}">
                    <div class="profile-student-chip-text">
                        <h5>${data.linkedStudent}</h5>
                        <p>Student ID: ${data.studentId}</p>
                    </div>
                </div>
            `;
        }

        parentProfileModalOverlay.classList.add("inpage-modal-visible");
    }

    function closeParentProfile() {
        if (parentProfileModalOverlay) parentProfileModalOverlay.classList.remove("inpage-modal-visible");
    }

    if (parentProfileCloseBtn) parentProfileCloseBtn.addEventListener("click", closeParentProfile);
    if (parentProfileModalOverlay) {
        parentProfileModalOverlay.addEventListener("click", function (e) {
            if (e.target === parentProfileModalOverlay) closeParentProfile();
        });
    }

    updateParentCount();
}

export default init;
