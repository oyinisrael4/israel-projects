/**
 * EduManage - Programme Management Script
 * Handles rendering, filtering, search, view details, price & info editing, and adding programmes.
 */

document.addEventListener("DOMContentLoaded", function () {
    const DEFAULT_PROGRAMMES = [
        {
            id: 1,
            title: "Software Engineering & Full Stack",
            code: "PRG-SE101",
            category: "Software Development",
            price: "₦250,000",
            duration: "6 Months",
            modulesCount: "8 Modules",
            enrolledCount: 3,
            capacity: 50,
            badge: "Diploma",
            image: "all-images/body-images/software-eng.jpg",
            description: "Master modern software engineering with full-stack web and systems architecture, React, Node.js, Python, PostgreSQL, and cloud deployments.",
            instructor: "Courtney Henry",
            schedule: "Mon, Wed, Fri • 10:00 AM - 1:00 PM",
            enrolledStudents: [
                {
                    name: "Theresa Webb",
                    id: "AD76133",
                    avatar: "all-images/icon-images/student-4.png",
                    mode: "Full-Time",
                    status: "Active"
                },
                {
                    name: "Arlene McCoy",
                    id: "AD33578",
                    avatar: "all-images/icon-images/student-1.png",
                    mode: "Full-Time",
                    status: "Active"
                },
                {
                    name: "Albert Flores",
                    id: "AD89120",
                    avatar: "all-images/icon-images/student-2.png",
                    mode: "Part-Time",
                    status: "Active"
                }
            ]
        },
        {
            id: 2,
            title: "Cybersecurity & Ethical Hacking",
            code: "PRG-CY202",
            category: "Cybersecurity",
            price: "₦220,000",
            duration: "6 Months",
            modulesCount: "6 Modules",
            enrolledCount: 2,
            capacity: 40,
            badge: "Professional",
            image: "all-images/body-images/cybersecurity.jpg",
            description: "Learn practical penetration testing, vulnerability assessment, cryptography, defensive network architecture, and security operations center skills.",
            instructor: "Cameron Williamson",
            schedule: "Tue, Thu • 9:00 AM - 1:00 PM",
            enrolledStudents: [
                {
                    name: "Brooklyn Simmons",
                    id: "AD67452",
                    avatar: "all-images/icon-images/student-3.png",
                    mode: "Full-Time",
                    status: "Active"
                },
                {
                    name: "Jerome Bell",
                    id: "AD23901",
                    avatar: "all-images/icon-images/student-5.png",
                    mode: "Weekend",
                    status: "Active"
                }
            ]
        },
        {
            id: 3,
            title: "Data Analysis & Machine Learning",
            code: "PRG-DA303",
            category: "Data & AI",
            price: "₦180,000",
            duration: "4 Months",
            modulesCount: "6 Modules",
            enrolledCount: 2,
            capacity: 60,
            badge: "Certificate",
            image: "all-images/body-images/data-science.jpg",
            description: "Harness data analytics, business intelligence with Power BI, Python data science libraries, statistical modeling, and deep learning algorithms.",
            instructor: "Esther Howard",
            schedule: "Mon, Wed, Fri • 2:00 PM - 5:00 PM",
            enrolledStudents: [
                {
                    name: "Wade Warren",
                    id: "AD45231",
                    avatar: "all-images/icon-images/student-2.png",
                    mode: "Full-Time",
                    status: "Active"
                },
                {
                    name: "Kathryn Murphy",
                    id: "AD56219",
                    avatar: "all-images/icon-images/student-4.png",
                    mode: "Part-Time",
                    status: "Active"
                }
            ]
        },
        {
            id: 4,
            title: "Computer Networking & Infrastructure",
            code: "PRG-NT404",
            category: "Networking",
            price: "₦150,000",
            duration: "4 Months",
            modulesCount: "5 Modules",
            enrolledCount: 2,
            capacity: 35,
            badge: "Diploma",
            image: "all-images/body-images/networking.jpg",
            description: "Design, configure, and troubleshoot enterprise networks, Cisco routing and switching, network protocols, VLANs, and firewall systems.",
            instructor: "Robert Fox",
            schedule: "Tue, Thu • 2:00 PM - 6:00 PM",
            enrolledStudents: [
                {
                    name: "Darlene Robertson",
                    id: "AD98214",
                    avatar: "all-images/icon-images/student-5.png",
                    mode: "Full-Time",
                    status: "Active"
                },
                {
                    name: "Guy Hawkins",
                    id: "AD11244",
                    avatar: "all-images/icon-images/student-1.png",
                    mode: "Weekend",
                    status: "Active"
                }
            ]
        },
        {
            id: 5,
            title: "Web Development & UI/UX Design",
            code: "PRG-WD505",
            category: "Design",
            price: "₦160,000",
            duration: "4 Months",
            modulesCount: "6 Modules",
            enrolledCount: 2,
            capacity: 70,
            badge: "Certificate",
            image: "all-images/body-images/web-design.jpg",
            description: "Combine user experience research, Figma wireframing and prototyping with modern frontend web development and micro-interactions.",
            instructor: "Jane Cooper",
            schedule: "Mon, Wed • 10:00 AM - 1:00 PM",
            enrolledStudents: [
                {
                    name: "Arlene McCoy",
                    id: "AD33578",
                    avatar: "all-images/icon-images/student-1.png",
                    mode: "Full-Time",
                    status: "Active"
                },
                {
                    name: "Bessie Cooper",
                    id: "AD90432",
                    avatar: "all-images/icon-images/student-3.png",
                    mode: "Full-Time",
                    status: "Active"
                }
            ]
        },
        {
            id: 6,
            title: "Cloud Computing & DevOps",
            code: "PRG-CL606",
            category: "Cybersecurity",
            price: "₦240,000",
            duration: "6 Months",
            modulesCount: "7 Modules",
            enrolledCount: 2,
            capacity: 35,
            badge: "Professional",
            image: "all-images/body-images/cloud-devops.jpg",
            description: "Deploy scalable cloud systems on AWS, container orchestration with Docker and Kubernetes, and automated infrastructure as code.",
            instructor: "Courtney Henry",
            schedule: "Fri, Sat • 9:00 AM - 1:00 PM",
            enrolledStudents: [
                {
                    name: "Eleanor Pena",
                    id: "AD77321",
                    avatar: "all-images/icon-images/student-4.png",
                    mode: "Weekend",
                    status: "Active"
                },
                {
                    name: "Marvin McKinney",
                    id: "AD88129",
                    avatar: "all-images/icon-images/student-2.png",
                    mode: "Part-Time",
                    status: "Active"
                }
            ]
        }
    ];

    // Load programmes from localStorage or default
    let programmes = [];
    try {
        const stored = localStorage.getItem("edumanage_programmes_v2");
        if (stored) {
            programmes = JSON.parse(stored);
        } else {
            programmes = [...DEFAULT_PROGRAMMES];
            localStorage.setItem("edumanage_programmes_v2", JSON.stringify(programmes));
        }
    } catch (e) {
        programmes = [...DEFAULT_PROGRAMMES];
    }

    // Elements
    const gridContainer = document.getElementById("programmeGrid");
    const countText = document.getElementById("programmeCount");
    const searchInput = document.querySelector(".topbar-search-box input");
    const categoryFilter = document.getElementById("programmeCategoryFilter");

    // Modal elements
    const detailModal = document.getElementById("programmeDetailModal");
    const detailCloseBtn = document.getElementById("detailModalCloseBtn");
    const editModal = document.getElementById("editProgrammeModal");
    const editCloseBtn = document.getElementById("editModalCloseBtn");
    const editCancelBtn = document.getElementById("editModalCancelBtn");
    const editForm = document.getElementById("editProgrammeForm");

    const addModal = document.getElementById("addProgrammeModal");
    const addBtn = document.getElementById("addProgrammeBtn");
    const addCloseBtn = document.getElementById("addModalCloseBtn");
    const addCancelBtn = document.getElementById("addModalCancelBtn");
    const addForm = document.getElementById("addProgrammeForm");

    const alertOverlay = document.getElementById("alertOverlay");
    const alertMessageEl = document.getElementById("alertMessage");
    const alertCloseBtn = document.getElementById("alertCloseBtn");

    let currentDetailProgrammeId = null;

    // Render Grid
    function renderProgrammes(list) {
        if (!gridContainer) return;
        gridContainer.innerHTML = "";

        if (list.length === 0) {
            gridContainer.innerHTML = `
                <div class="programme-empty-state">
                    <i class="bi bi-mortarboard"></i>
                    <h4>No programmes found</h4>
                    <p>All programmes may have been removed, or none match your search filter.</p>
                    <button type="button" class="panel-add-btn" onclick="resetDefaultProgrammes()" style="margin: 14px auto 0 auto;">
                        <i class="bi bi-arrow-counterclockwise"></i>
                        <span>Restore Default Programmes</span>
                    </button>
                </div>
            `;
            if (countText) countText.textContent = "0 programmes found";
            return;
        }

        if (countText) {
            countText.textContent = `${list.length} programme${list.length > 1 ? "s" : ""} available`;
        }

        list.forEach(prog => {
            const card = document.createElement("div");
            card.className = "programme-card";
            card.setAttribute("data-id", prog.id);

            const studentCount = (prog.enrolledStudents || []).length;

            card.innerHTML = `
                <div class="programme-card-image-wrapper">
                    <img src="${prog.image}" alt="${prog.title}">
                    <span class="programme-badge">${prog.badge || "Programme"}</span>
                    <span class="programme-price-badge">
                        <i class="bi bi-tag-fill" style="font-size: 11px;"></i>
                        ${prog.price}
                    </span>
                </div>

                <div class="programme-card-body">
                    <div class="programme-card-meta">
                        <span><i class="bi bi-clock"></i> ${prog.duration}</span>
                        <span><i class="bi bi-journal-text"></i> ${prog.modulesCount}</span>
                        <span><i class="bi bi-people-fill"></i> ${studentCount} Enrolled</span>
                    </div>

                    <h3 class="programme-card-title">${prog.title}</h3>

                    <p class="programme-card-desc">
                        ${prog.description}
                    </p>

                    <div class="programme-card-footer">
                        <button type="button" class="programme-read-btn" onclick="openProgrammeDetails(${prog.id})">
                            <span>View Programme</span>
                            <span class="programme-btn-arrow-circle"><i class="bi bi-arrow-up-right"></i></span>
                        </button>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    // Filter and search logic
    function applyFilters() {
        const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
        const category = categoryFilter ? categoryFilter.value : "all";

        const filtered = programmes.filter(prog => {
            const matchesCategory = category === "all" || prog.category.toLowerCase() === category.toLowerCase();
            const matchesQuery = !query ||
                prog.title.toLowerCase().includes(query) ||
                prog.code.toLowerCase().includes(query) ||
                prog.description.toLowerCase().includes(query) ||
                prog.category.toLowerCase().includes(query);
            return matchesCategory && matchesQuery;
        });

        renderProgrammes(filtered);
    }

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", applyFilters);
    }

    // Detail Modal Handlers
    window.openProgrammeDetails = function (id) {
        const prog = programmes.find(p => p.id === id);
        if (!prog) return;

        currentDetailProgrammeId = id;

        document.getElementById("detailCoverImage").src = prog.image;
        document.getElementById("detailTitle").textContent = prog.title;
        document.getElementById("detailSubtitle").textContent = `${prog.code} • ${prog.category}`;
        document.getElementById("detailPrice").textContent = prog.price;

        document.getElementById("detailDuration").textContent = prog.duration;
        document.getElementById("detailModules").textContent = prog.modulesCount;
        
        const enrolledArr = prog.enrolledStudents || [];
        document.getElementById("detailCapacity").textContent = `${enrolledArr.length} / ${prog.capacity} Students`;
        document.getElementById("detailInstructor").textContent = prog.instructor || "Assigned Faculty";
        document.getElementById("detailSchedule").textContent = prog.schedule || "Regular Weekdays";
        document.getElementById("detailCode").textContent = prog.code;

        document.getElementById("detailDescription").textContent = prog.description;

        // Render Enrolled Students as individual list items
        const countBadge = document.getElementById("detailEnrolledCount");
        if (countBadge) countBadge.textContent = enrolledArr.length;

        const studentsListEl = document.getElementById("detailEnrolledStudentsList");
        if (studentsListEl) {
            studentsListEl.innerHTML = "";
            if (enrolledArr.length === 0) {
                studentsListEl.innerHTML = `
                    <div class="programme-no-students">
                        <i class="bi bi-person-x"></i>
                        <span>No students currently enrolled in this programme.</span>
                    </div>
                `;
            } else {
                enrolledArr.forEach(stu => {
                    const item = document.createElement("div");
                    item.className = "programme-student-item";
                    item.innerHTML = `
                        <div class="programme-student-left">
                            <div class="programme-student-avatar">
                                <img src="${stu.avatar || 'all-images/icon-images/student-1.png'}" alt="${stu.name}">
                            </div>
                            <div class="programme-student-info">
                                <h5>${stu.name}</h5>
                                <p><span class="student-id-tag">${stu.id}</span> • ${stu.mode || 'Full-Time'}</p>
                            </div>
                        </div>
                        <span class="programme-student-status status-active">${stu.status || 'Active'}</span>
                    `;
                    studentsListEl.appendChild(item);
                });
            }
        }

        if (detailModal) {
            detailModal.classList.add("inpage-modal-visible");
        }
    };

    function closeDetailModal() {
        if (detailModal) {
            detailModal.classList.remove("inpage-modal-visible");
        }
        currentDetailProgrammeId = null;
    }

    if (detailCloseBtn) detailCloseBtn.addEventListener("click", closeDetailModal);
    if (detailModal) {
        detailModal.addEventListener("click", function (e) {
            if (e.target === detailModal) closeDetailModal();
        });
    }

    // Edit Programme and Fee Modal (Triggered from "Edit Fee & Info" inside detail modal)
    window.openEditProgrammeModal = function (id) {
        const progId = id || currentDetailProgrammeId;
        const prog = programmes.find(p => p.id === progId);
        if (!prog) return;

        document.getElementById("editProgId").value = prog.id;
        document.getElementById("editProgTitle").value = prog.title;
        document.getElementById("editProgCode").value = prog.code;
        document.getElementById("editProgPrice").value = prog.price;
        document.getElementById("editProgDuration").value = prog.duration;
        document.getElementById("editProgModules").value = prog.modulesCount;
        document.getElementById("editProgCapacity").value = prog.capacity;
        document.getElementById("editProgInstructor").value = prog.instructor || "";
        document.getElementById("editProgSchedule").value = prog.schedule || "";
        document.getElementById("editProgDescription").value = prog.description;

        const catSelect = document.getElementById("editProgCategory");
        if (catSelect) catSelect.value = prog.category;

        // Close detail modal so edit modal takes focus
        if (detailModal) {
            detailModal.classList.remove("inpage-modal-visible");
        }

        if (editModal) {
            editModal.classList.add("inpage-modal-visible");
        }
    };

    function closeEditModal() {
        if (editModal) {
            editModal.classList.remove("inpage-modal-visible");
        }
    }

    if (editCloseBtn) editCloseBtn.addEventListener("click", closeEditModal);
    if (editCancelBtn) editCancelBtn.addEventListener("click", closeEditModal);
    if (editModal) {
        editModal.addEventListener("click", function (e) {
            if (e.target === editModal) closeEditModal();
        });
    }

    // Save Edited Programme & Fee
    if (editForm) {
        editForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const id = parseInt(document.getElementById("editProgId").value, 10);
            const index = programmes.findIndex(p => p.id === id);
            if (index === -1) return;

            let priceVal = document.getElementById("editProgPrice").value.trim();
            if (!priceVal.startsWith("₦")) {
                priceVal = "₦" + priceVal.replace(/[^0-9,]/g, "");
            }

            programmes[index].title = document.getElementById("editProgTitle").value.trim();
            programmes[index].code = document.getElementById("editProgCode").value.trim();
            programmes[index].category = document.getElementById("editProgCategory").value;
            programmes[index].price = priceVal;
            programmes[index].duration = document.getElementById("editProgDuration").value.trim();
            programmes[index].modulesCount = document.getElementById("editProgModules").value.trim();
            programmes[index].capacity = parseInt(document.getElementById("editProgCapacity").value, 10) || programmes[index].capacity;
            programmes[index].instructor = document.getElementById("editProgInstructor").value.trim();
            programmes[index].schedule = document.getElementById("editProgSchedule").value.trim();
            programmes[index].description = document.getElementById("editProgDescription").value.trim();

            localStorage.setItem("edumanage_programmes_v2", JSON.stringify(programmes));
            applyFilters();
            closeEditModal();

            // Re-open detail modal with updated values
            openProgrammeDetails(id);

            showAlertModal("Programme & Fee Updated", `${programmes[index].title} fee and details have been successfully saved.`);
        });
    }

    // Delete Programme Handler
    window.confirmDeleteProgramme = function (id) {
        const progId = id || currentDetailProgrammeId;
        const prog = programmes.find(p => p.id === progId);
        if (!prog) return;

        const confirmed = window.confirm(`Are you sure you want to delete "${prog.title}"?\n\nThis will remove the course and its tuition record from the curriculum catalogue.`);
        if (confirmed) {
            programmes = programmes.filter(p => p.id !== progId);
            localStorage.setItem("edumanage_programmes_v2", JSON.stringify(programmes));
            applyFilters();
            closeDetailModal();
            closeEditModal();
            showAlertModal("Programme Deleted", `"${prog.title}" has been successfully removed.`);
        }
    };

    const editDeleteBtn = document.getElementById("editModalDeleteBtn");
    if (editDeleteBtn) {
        editDeleteBtn.addEventListener("click", function () {
            const id = parseInt(document.getElementById("editProgId").value, 10);
            confirmDeleteProgramme(id);
        });
    }

    // Reset Catalog to Defaults
    window.resetDefaultProgrammes = function () {
        programmes = JSON.parse(JSON.stringify(DEFAULT_PROGRAMMES));
        localStorage.setItem("edumanage_programmes_v2", JSON.stringify(programmes));
        applyFilters();
        showAlertModal("Catalog Reset", "Initial academic programmes have been restored.");
    };

    // Add Programme Modal
    if (addBtn) {
        addBtn.addEventListener("click", function () {
            if (addForm) addForm.reset();
            if (addModal) addModal.classList.add("inpage-modal-visible");
        });
    }

    function closeAddModal() {
        if (addModal) addModal.classList.remove("inpage-modal-visible");
    }

    if (addCloseBtn) addCloseBtn.addEventListener("click", closeAddModal);
    if (addCancelBtn) addCancelBtn.addEventListener("click", closeAddModal);
    if (addModal) {
        addModal.addEventListener("click", function (e) {
            if (e.target === addModal) closeAddModal();
        });
    }

    // Save New Programme
    if (addForm) {
        addForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let priceVal = document.getElementById("addProgPrice").value.trim();
            if (!priceVal.startsWith("₦")) {
                priceVal = "₦" + priceVal.replace(/[^0-9,]/g, "");
            }

            const cat = document.getElementById("addProgCategory").value;
            let imagePath = "all-images/body-images/software-eng.jpg";
            if (cat === "Cybersecurity") imagePath = "all-images/body-images/cybersecurity.jpg";
            else if (cat === "Data & AI") imagePath = "all-images/body-images/data-science.jpg";
            else if (cat === "Networking") imagePath = "all-images/body-images/networking.jpg";
            else if (cat === "Design") imagePath = "all-images/body-images/web-design.jpg";

            const newProg = {
                id: Date.now(),
                title: document.getElementById("addProgTitle").value.trim(),
                code: document.getElementById("addProgCode").value.trim() || `PRG-${Math.floor(100 + Math.random() * 900)}`,
                category: cat,
                price: priceVal,
                duration: document.getElementById("addProgDuration").value.trim(),
                modulesCount: document.getElementById("addProgModules").value.trim() || "6 Modules",
                enrolledCount: 0,
                capacity: parseInt(document.getElementById("addProgCapacity").value, 10) || 50,
                badge: document.getElementById("addProgBadge").value || "Certificate",
                image: imagePath,
                description: document.getElementById("addProgDescription").value.trim(),
                instructor: document.getElementById("addProgInstructor").value.trim() || "Assigned Faculty",
                schedule: document.getElementById("addProgSchedule").value.trim() || "Weekday Sessions",
                enrolledStudents: []
            };

            programmes.unshift(newProg);
            localStorage.setItem("edumanage_programmes_v2", JSON.stringify(programmes));
            applyFilters();
            closeAddModal();

            showAlertModal("Programme Created", `${newProg.title} has been successfully added to the academic catalog.`);
        });
    }

    // Alert Modal Handler
    function showAlertModal(title, message) {
        if (!alertOverlay) return;
        const h4 = alertOverlay.querySelector("h4");
        if (h4) h4.textContent = `${title}: ${message}`;
        alertOverlay.classList.add("alertModal");
    }

    if (alertCloseBtn && alertOverlay) {
        alertCloseBtn.addEventListener("click", function () {
            alertOverlay.classList.remove("alertModal");
        });
        alertOverlay.addEventListener("click", function (e) {
            if (e.target === alertOverlay) {
                alertOverlay.classList.remove("alertModal");
            }
        });
    }

    // Initial render
    renderProgrammes(programmes);
});
