/**
 * NIIT CoreHub - Programme Management Script
 * Handles rendering, filtering, search, view details, price & info editing, and adding programmes.
 * Courses sourced from niitagbara.com
 */

export function init() {

    function cleanPrice(p) {
        if (!p) return "₦0";
        const s = String(p).trim();
        const match = s.match(/(\d[\d,.]*)/);
        if (match) {
            return "₦" + match[1];
        }
        return "₦0";
    }

    function cleanSchedule(s) {
        if (!s) return "Mon, Wed, Fri • 10:00 AM - 12:00 PM";
        let str = String(s);
        str = str.replace(/â€¢|â€\s*¢|[\u00e2\u00c2][\u20ac\u0080][\u00a2\u00bc]/g, " • ");
        str = str.replace(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[^0-9•\n\r]+(\d{1,2}:\d{2})/gi, "$1 • $2");
        str = str.replace(/\s*•\s*/g, " • ");
        return str.trim();
    }

    function cleanStr(s) {
        if (!s || typeof s !== 'string') return s;
        return s
            .replace(/[\u00e3\u00c3][\u201a\u0082][\u00a6\u00a1]/g, "₦")
            .replace(/ã‚¦|ã,¦|ã,!|â‚¦|â,¦|â,!/g, "₦")
            .replace(/â€¢|â€\s*¢|[\u00e2\u00c2][\u20ac\u0080][\u00a2\u00bc]/g, "•")
            .replace(/â€”|â€“|â€"|[\u00e2\u00c2][\u20ac\u0080][\u201d\u201c]/g, "—")
            .replace(/â€˜|â€™/g, "'")
            .replace(/â€œ|â€/g, '"')
            .replace(/Â/g, " ")
            .trim();
    }

    function sanitizeProgramme(p) {
        if (!p) return p;
        return {
            ...p,
            title: cleanStr(p.title),
            code: cleanStr(p.code),
            price: cleanPrice(p.price),
            duration: cleanStr(p.duration),
            modulesCount: cleanStr(p.modulesCount),
            description: cleanStr(p.description),
            instructor: cleanStr(p.instructor),
            schedule: cleanSchedule(p.schedule),
            enrolledStudents: (p.enrolledStudents || []).map(stu => ({
                ...stu,
                name: cleanStr(stu.name),
                id: cleanStr(stu.id),
                mode: cleanStr(stu.mode || "Full-Time").replace(/^[•\s-]+/, ""),
                status: cleanStr(stu.status || "Active")
            }))
        };
    }

    const DEFAULT_PROGRAMMES = [
        {
            id: 1,
            title: "Hardware & Networking",
            code: "PRG-HN101",
            price: "₦80,000",
            duration: "3 Months",
            modulesCount: "5 Modules",
            enrolledCount: 3,
            capacity: 40,
            badge: "Certificate",
            image: "/all-images/body-images/hardware-networking-course.jpg",
            description: "Computer Hardware is the combination of physical components or parts that make the computer system. Learn to build, repair, and maintain PCs, configure network devices, manage LAN/WAN infrastructure, and earn entry-level ICT certification.",
            instructor: "Courtney Henry",
            schedule: "Mon, Wed, Fri • 10:00 AM - 12:00 PM",
            enrolledStudents: [
                { name: "Theresa Webb", id: "AD76133", avatar: "/all-images/icon-images/student-4.png", mode: "Full-Time", status: "Active" },
                { name: "Arlene McCoy", id: "AD33578", avatar: "/all-images/icon-images/student-1.png", mode: "Full-Time", status: "Active" },
                { name: "Albert Flores", id: "AD89120", avatar: "/all-images/icon-images/student-2.png", mode: "Part-Time", status: "Active" }
            ]
        },
        {
            id: 2,
            title: "Desktop Publishing (MS Office Suite)",
            code: "PRG-DTP102",
            price: "₦50,000",
            duration: "2 Months",
            modulesCount: "4 Modules",
            enrolledCount: 2,
            capacity: 50,
            badge: "Certificate",
            image: "/all-images/body-images/desktop-publishing.jpg",
            description: "Desktop Publishing (DTP) is the creation of documents using page layout software. Master Microsoft Office tools — Word, Excel, PowerPoint, Access, and Outlook — to produce professional publications, reports, spreadsheets and presentations.",
            instructor: "Eleanor Pena",
            schedule: "Tue, Thu • 9:00 AM - 11:00 AM",
            enrolledStudents: [
                { name: "Brooklyn Simmons", id: "AD67452", avatar: "/all-images/icon-images/student-3.png", mode: "Full-Time", status: "Active" },
                { name: "Jerome Bell", id: "AD23901", avatar: "/all-images/icon-images/student-5.png", mode: "Weekend", status: "Active" }
            ]
        },
        {
            id: 3,
            title: "MasterMind Series (MMS)",
            code: "PRG-MMS103",
            price: "₦120,000",
            duration: "4 Months",
            modulesCount: "6 Modules",
            enrolledCount: 2,
            capacity: 35,
            badge: "Diploma",
            image: "/all-images/body-images/software-engineering.jpg",
            description: "Software engineering is a detailed study of engineering to the design, development and maintenance of software. The MasterMind Series covers systems thinking, software design patterns, project-based development, and team collaboration techniques.",
            instructor: "Leslie Alexander",
            schedule: "Mon, Wed, Fri • 2:00 PM - 5:00 PM",
            enrolledStudents: [
                { name: "Wade Warren", id: "AD45231", avatar: "/all-images/icon-images/student-2.png", mode: "Full-Time", status: "Active" },
                { name: "Kathryn Murphy", id: "AD56219", avatar: "/all-images/icon-images/student-4.png", mode: "Part-Time", status: "Active" }
            ]
        },
        {
            id: 4,
            title: "CCNA / CCNP",
            code: "PRG-CCN104",
            price: "₦150,000",
            duration: "4 Months",
            modulesCount: "6 Modules",
            enrolledCount: 2,
            capacity: 30,
            badge: "Professional",
            image: "/all-images/body-images/ccna-ccnp.jpg",
            description: "The CCNA (Cisco Certified Network Associate) and CCNP (Professional) are globally recognised IT certifications issued by Cisco. Gain in-depth knowledge of networking concepts, routing and switching, VLANs, WAN, and network security for enterprise IT roles.",
            instructor: "Robert Fox",
            schedule: "Tue, Thu • 10:00 AM - 2:00 PM",
            enrolledStudents: [
                { name: "Darlene Robertson", id: "AD98214", avatar: "/all-images/icon-images/student-5.png", mode: "Full-Time", status: "Active" },
                { name: "Guy Hawkins", id: "AD11244", avatar: "/all-images/icon-images/student-1.png", mode: "Weekend", status: "Active" }
            ]
        },
        {
            id: 5,
            title: "IT Essentials",
            code: "PRG-ITE105",
            price: "₦65,000",
            duration: "2 Months",
            modulesCount: "4 Modules",
            enrolledCount: 2,
            capacity: 45,
            badge: "Certificate",
            image: "/all-images/body-images/it-essentials.jpg",
            description: "Cisco's IT Essentials introduces the skills needed to meet growing demand for entry-level ICT professionals. Covers fundamentals of PC technology, networking, and security plus advanced concepts in hardware troubleshooting and ICT support.",
            instructor: "Courtney Henry",
            schedule: "Mon, Wed • 9:00 AM - 11:00 AM",
            enrolledStudents: [
                { name: "Arlene McCoy", id: "AD33578", avatar: "/all-images/icon-images/student-1.png", mode: "Full-Time", status: "Active" },
                { name: "Bessie Cooper", id: "AD90432", avatar: "/all-images/icon-images/student-3.png", mode: "Full-Time", status: "Active" }
            ]
        },
        {
            id: 6,
            title: "Diploma in .NET Technologies",
            code: "PRG-NET106",
            price: "₦180,000",
            duration: "6 Months",
            modulesCount: "8 Modules",
            enrolledCount: 2,
            capacity: 35,
            badge: "Diploma",
            image: "/all-images/body-images/dotnet-technologies.jpg",
            description: ".NET Framework is a software development framework for building and running applications on Windows. Learn C#, ASP.NET, Entity Framework, RESTful APIs, and cloud deployment on Microsoft Azure to become a sought-after .NET developer.",
            instructor: "Leslie Alexander",
            schedule: "Fri, Sat • 10:00 AM - 2:00 PM",
            enrolledStudents: [
                { name: "Eleanor Pena", id: "AD77321", avatar: "/all-images/icon-images/student-4.png", mode: "Weekend", status: "Active" },
                { name: "Marvin McKinney", id: "AD88129", avatar: "/all-images/icon-images/student-2.png", mode: "Part-Time", status: "Active" }
            ]
        },
        {
            id: 7,
            title: "Diploma in Web Development",
            code: "PRG-WD107",
            price: "₦160,000",
            duration: "5 Months",
            modulesCount: "7 Modules",
            enrolledCount: 2,
            capacity: 50,
            badge: "Diploma",
            image: "/all-images/body-images/web-development-course.jpg",
            description: "Master modern web development from the ground up. Covers HTML5, CSS3, JavaScript, React, Node.js, databases, and deployment. Build real-world projects including e-commerce sites, portfolios, and web applications.",
            instructor: "Courtney Henry",
            schedule: "Mon, Wed, Fri • 10:00 AM - 1:00 PM",
            enrolledStudents: [
                { name: "Wade Warren", id: "AD45231", avatar: "/all-images/icon-images/student-2.png", mode: "Full-Time", status: "Active" },
                { name: "Theresa Webb", id: "AD76133", avatar: "/all-images/icon-images/student-4.png", mode: "Part-Time", status: "Active" }
            ]
        },
        {
            id: 8,
            title: "Data Analysis",
            code: "PRG-DA108",
            price: "₦130,000",
            duration: "3 Months",
            modulesCount: "5 Modules",
            enrolledCount: 2,
            capacity: 45,
            badge: "Certificate",
            image: "/all-images/body-images/data-analysis.jpg",
            description: "Harness the power of data to drive business decisions. Learn Excel, SQL, Python for data analysis, Power BI dashboards, statistical modeling, and data storytelling. Ideal for aspiring data analysts and business intelligence professionals.",
            instructor: "Eleanor Pena",
            schedule: "Mon, Wed, Fri • 2:00 PM - 5:00 PM",
            enrolledStudents: [
                { name: "Brooklyn Simmons", id: "AD67452", avatar: "/all-images/icon-images/student-3.png", mode: "Full-Time", status: "Active" },
                { name: "Jerome Bell", id: "AD23901", avatar: "/all-images/icon-images/student-5.png", mode: "Weekend", status: "Active" }
            ]
        },
        {
            id: 9,
            title: "Diploma in Java",
            code: "PRG-JAV109",
            price: "₦170,000",
            duration: "5 Months",
            modulesCount: "7 Modules",
            enrolledCount: 1,
            capacity: 35,
            badge: "Diploma",
            image: "/all-images/body-images/software-eng.jpg",
            description: "Build enterprise-grade applications with Java. Covers Core Java, OOP principles, Spring Boot framework, Hibernate, RESTful API development, and microservices architecture. A complete pathway to becoming a professional Java developer.",
            instructor: "Leslie Alexander",
            schedule: "Tue, Thu • 10:00 AM - 2:00 PM",
            enrolledStudents: [
                { name: "Darlene Robertson", id: "AD98214", avatar: "/all-images/icon-images/student-5.png", mode: "Full-Time", status: "Active" }
            ]
        },
        {
            id: 10,
            title: "Diploma in Python",
            code: "PRG-PY110",
            price: "₦150,000",
            duration: "4 Months",
            modulesCount: "6 Modules",
            enrolledCount: 2,
            capacity: 45,
            badge: "Diploma",
            image: "/all-images/body-images/data-science.jpg",
            description: "Python is the world's most popular programming language. Master Python fundamentals, data structures, file handling, web scraping, automation, Django web framework, and API integration. From beginner to professional in 4 months.",
            instructor: "Eleanor Pena",
            schedule: "Mon, Wed • 10:00 AM - 1:00 PM",
            enrolledStudents: [
                { name: "Guy Hawkins", id: "AD11244", avatar: "/all-images/icon-images/student-1.png", mode: "Part-Time", status: "Active" },
                { name: "Kathryn Murphy", id: "AD56219", avatar: "/all-images/icon-images/student-4.png", mode: "Full-Time", status: "Active" }
            ]
        },
        {
            id: 11,
            title: "Java with DevOps",
            code: "PRG-JDO111",
            price: "₦220,000",
            duration: "6 Months",
            modulesCount: "8 Modules",
            enrolledCount: 1,
            capacity: 30,
            badge: "Professional",
            image: "/all-images/body-images/cloud-devops.jpg",
            description: "Combine Java development with modern DevOps practices. Learn CI/CD pipelines, Docker containerisation, Kubernetes orchestration, Jenkins, Git workflows, and cloud deployment on AWS. The complete modern software engineering stack.",
            instructor: "Courtney Henry",
            schedule: "Fri, Sat • 9:00 AM - 1:00 PM",
            enrolledStudents: [
                { name: "Marvin McKinney", id: "AD88129", avatar: "/all-images/icon-images/student-2.png", mode: "Weekend", status: "Active" }
            ]
        },
        {
            id: 12,
            title: "Graphics Design",
            code: "PRG-GFX112",
            price: "₦100,000",
            duration: "3 Months",
            modulesCount: "5 Modules",
            enrolledCount: 2,
            capacity: 40,
            badge: "Certificate",
            image: "/all-images/body-images/graphics-design.jpg",
            description: "Become a professional graphic designer. Master Adobe Photoshop, Illustrator, CorelDRAW, logo design, brand identity, print and digital media, social media graphics, and poster/flyer design for personal and commercial projects.",
            instructor: "Jane Cooper",
            schedule: "Mon, Wed, Fri • 10:00 AM - 12:00 PM",
            enrolledStudents: [
                { name: "Arlene McCoy", id: "AD33578", avatar: "/all-images/icon-images/student-1.png", mode: "Full-Time", status: "Active" },
                { name: "Bessie Cooper", id: "AD90432", avatar: "/all-images/icon-images/student-3.png", mode: "Full-Time", status: "Active" }
            ]
        },
        {
            id: 13,
            title: "UI/UX Design",
            code: "PRG-UX113",
            price: "₦120,000",
            duration: "3 Months",
            modulesCount: "5 Modules",
            enrolledCount: 2,
            capacity: 35,
            badge: "Certificate",
            image: "/all-images/body-images/web-design.jpg",
            description: "Design beautiful, user-centred digital products. Learn Figma, Adobe XD, UX research methodologies, wireframing, prototyping, design systems, usability testing, and interaction design principles for web and mobile applications.",
            instructor: "Jane Cooper",
            schedule: "Tue, Thu • 10:00 AM - 1:00 PM",
            enrolledStudents: [
                { name: "Brooklyn Simmons", id: "AD67452", avatar: "/all-images/icon-images/student-3.png", mode: "Full-Time", status: "Active" },
                { name: "Eleanor Pena", id: "AD77321", avatar: "/all-images/icon-images/student-4.png", mode: "Part-Time", status: "Active" }
            ]
        },
        {
            id: 14,
            title: "Project Management (PMP)",
            code: "PRG-PMP114",
            price: "₦200,000",
            duration: "4 Months",
            modulesCount: "6 Modules",
            enrolledCount: 1,
            capacity: 30,
            badge: "Professional",
            image: "/all-images/body-images/software-engineering.jpg",
            description: "Prepare for the globally recognised Project Management Professional (PMP) certification. Covers Agile, Scrum, project lifecycle, stakeholder management, risk management, budgeting, and scheduling using industry-standard tools.",
            instructor: "Cameron Williamson",
            schedule: "Sat • 9:00 AM - 3:00 PM",
            enrolledStudents: [
                { name: "Albert Flores", id: "AD89120", avatar: "/all-images/icon-images/student-2.png", mode: "Weekend", status: "Active" }
            ]
        },
        {
            id: 15,
            title: "Multimedia",
            code: "PRG-MM115",
            price: "₦110,000",
            duration: "3 Months",
            modulesCount: "5 Modules",
            enrolledCount: 2,
            capacity: 35,
            badge: "Certificate",
            image: "/all-images/body-images/graphics-design.jpg",
            description: "Explore the world of digital multimedia production. Learn video editing with Adobe Premiere Pro, After Effects animation, audio production, 2D/3D motion graphics, and content creation for YouTube, social media, and broadcast.",
            instructor: "Jane Cooper",
            schedule: "Mon, Wed • 2:00 PM - 5:00 PM",
            enrolledStudents: [
                { name: "Theresa Webb", id: "AD76133", avatar: "/all-images/icon-images/student-4.png", mode: "Full-Time", status: "Active" },
                { name: "Jerome Bell", id: "AD23901", avatar: "/all-images/icon-images/student-5.png", mode: "Part-Time", status: "Active" }
            ]
        },
        {
            id: 16,
            title: "Game Development",
            code: "PRG-GD116",
            price: "₦190,000",
            duration: "5 Months",
            modulesCount: "7 Modules",
            enrolledCount: 1,
            capacity: 25,
            badge: "Diploma",
            image: "/all-images/body-images/software-eng.jpg",
            description: "Turn your passion for gaming into a career. Learn Unity game engine, C# scripting, 2D/3D game design, physics simulation, game UI/UX, asset creation, and publish games to PC, mobile, and web platforms.",
            instructor: "Leslie Alexander",
            schedule: "Tue, Thu, Sat • 10:00 AM - 1:00 PM",
            enrolledStudents: [
                { name: "Guy Hawkins", id: "AD11244", avatar: "/all-images/icon-images/student-1.png", mode: "Part-Time", status: "Active" }
            ]
        },
        {
            id: 17,
            title: "CyberOps",
            code: "PRG-CO117",
            price: "₦180,000",
            duration: "4 Months",
            modulesCount: "6 Modules",
            enrolledCount: 2,
            capacity: 30,
            badge: "Professional",
            image: "/all-images/body-images/cybersecurity.jpg",
            description: "Cisco CyberOps prepares you for a career in Security Operations Centers (SOC). Learn threat intelligence, intrusion analysis, security monitoring, incident response, network forensics, and cybersecurity policy in real-world environments.",
            instructor: "Robert Fox",
            schedule: "Mon, Wed, Fri • 9:00 AM - 12:00 PM",
            enrolledStudents: [
                { name: "Darlene Robertson", id: "AD98214", avatar: "/all-images/icon-images/student-5.png", mode: "Full-Time", status: "Active" },
                { name: "Kathryn Murphy", id: "AD56219", avatar: "/all-images/icon-images/student-4.png", mode: "Part-Time", status: "Active" }
            ]
        },
        {
            id: 18,
            title: "Certified Ethical Hacking",
            code: "PRG-CEH118",
            price: "₦220,000",
            duration: "4 Months",
            modulesCount: "6 Modules",
            enrolledCount: 2,
            capacity: 25,
            badge: "Professional",
            image: "/all-images/body-images/cybersecurity.jpg",
            description: "Become a Certified Ethical Hacker (CEH). Learn penetration testing methodologies, exploit development, vulnerability scanning, social engineering, web application hacking, malware analysis, and security hardening to defend modern organisations.",
            instructor: "Robert Fox",
            schedule: "Tue, Thu • 2:00 PM - 6:00 PM",
            enrolledStudents: [
                { name: "Brooklyn Simmons", id: "AD67452", avatar: "/all-images/icon-images/student-3.png", mode: "Full-Time", status: "Active" },
                { name: "Marvin McKinney", id: "AD88129", avatar: "/all-images/icon-images/student-2.png", mode: "Weekend", status: "Active" }
            ]
        }
    ];

    // Load programmes from localStorage or default
    try {
        localStorage.removeItem("niit_programmes_v6");
        localStorage.removeItem("niit_programmes_v5");
        localStorage.removeItem("niit_programmes_v4");
        localStorage.removeItem("niit_programmes_v3");
        localStorage.removeItem("niit_programmes_v2");
        localStorage.removeItem("niit_programmes");
    } catch (e) { }

    let programmes = [];
    try {
        const stored = localStorage.getItem("niit_programmes_v9");
        if (stored) {
            programmes = JSON.parse(stored).map(sanitizeProgramme);
        } else {
            programmes = DEFAULT_PROGRAMMES.map(sanitizeProgramme);
            localStorage.setItem("niit_programmes_v9", JSON.stringify(programmes));
        }
    } catch (e) {
        programmes = DEFAULT_PROGRAMMES.map(sanitizeProgramme);
    }

    // Elements
    const gridContainer = document.getElementById("programmeGrid");
    const countText = document.getElementById("programmeCount");
    const searchInput = document.querySelector(".topbar-search-box input");

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
            const displayPrice = cleanPrice(prog.price);
            const displayTitle = cleanStr(prog.title);
            const displayDesc = cleanStr(prog.description);
            const displayDuration = cleanStr(prog.duration);
            const displayModules = cleanStr(prog.modulesCount);

            card.innerHTML = `
                <div class="programme-card-image-wrapper">
                    <img src="${prog.image}" alt="${displayTitle}">
                    <span class="programme-badge">${prog.badge || "Programme"}</span>
                    <span class="programme-price-badge">
                        <i class="bi bi-tag-fill" style="font-size: 11px;"></i>
                        ${displayPrice}
                    </span>
                </div>

                <div class="programme-card-body">
                    <div class="programme-card-meta">
                        <span><i class="bi bi-clock"></i> ${displayDuration}</span>
                        <span><i class="bi bi-journal-text"></i> ${displayModules}</span>
                        <span><i class="bi bi-people-fill"></i> ${studentCount} Enrolled</span>
                    </div>

                    <h3 class="programme-card-title">${displayTitle}</h3>

                    <p class="programme-card-desc">
                        ${displayDesc}
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

    // Search logic
    function applyFilters() {
        const query = (searchInput ? searchInput.value : "").trim().toLowerCase();

        const filtered = programmes.filter(prog => {
            return !query ||
                prog.title.toLowerCase().includes(query) ||
                prog.code.toLowerCase().includes(query) ||
                prog.description.toLowerCase().includes(query);
        });

        renderProgrammes(filtered);
    }

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    // Detail Modal Handlers
    window.openProgrammeDetails = function (id) {
        const prog = programmes.find(p => p.id === id);
        if (!prog) return;

        currentDetailProgrammeId = id;

        const coverImg = document.getElementById("detailCoverImage");
        if (coverImg) {
            coverImg.src = prog.image || "/all-images/body-images/hardware-networking-course.jpg";
            coverImg.onerror = function () { this.src = "/all-images/body-images/software-eng.jpg"; };
        }
        const titleEl = document.getElementById("detailTitle");
        if (titleEl) titleEl.textContent = cleanStr(prog.title);
        const subEl = document.getElementById("detailSubtitle");
        if (subEl) subEl.textContent = cleanStr(prog.code);
        const priceEl = document.getElementById("detailPrice");
        if (priceEl) priceEl.textContent = cleanPrice(prog.price);

        const durEl = document.getElementById("detailDuration");
        if (durEl) durEl.textContent = cleanStr(prog.duration);
        const modEl = document.getElementById("detailModules");
        if (modEl) modEl.textContent = cleanStr(prog.modulesCount);

        const enrolledArr = prog.enrolledStudents || [];
        const capEl = document.getElementById("detailCapacity");
        if (capEl) capEl.textContent = `${enrolledArr.length} / ${prog.capacity} Students`;
        const insEl = document.getElementById("detailInstructor");
        if (insEl) insEl.textContent = cleanStr(prog.instructor || "Courtney Henry");
        const schEl = document.getElementById("detailSchedule");
        if (schEl) schEl.textContent = cleanSchedule(prog.schedule);
        const codeEl = document.getElementById("detailCode");
        if (codeEl) codeEl.textContent = cleanStr(prog.code);

        const descEl = document.getElementById("detailDescription");
        if (descEl) descEl.textContent = cleanStr(prog.description);

        // Render Enrolled Students
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
                                <img src="${stu.avatar || '/all-images/icon-images/student-1.png'}" alt="${cleanStr(stu.name)}">
                            </div>
                            <div class="programme-student-info">
                                <h5>${cleanStr(stu.name)}</h5>
                                <p><span class="student-id-tag">${cleanStr(stu.id)}</span> • ${cleanStr(stu.mode || 'Full-Time').replace(/^[•\s-]+/, '')}</p>
                            </div>
                        </div>
                        <span class="programme-student-status status-active">${cleanStr(stu.status || 'Active')}</span>
                    `;
                    studentsListEl.appendChild(item);
                });
            }
        }

        if (detailModal) {
            detailModal.classList.add("inpage-modal-visible");
            const modalBody = detailModal.querySelector(".inpage-modal-body");
            if (modalBody) {
                modalBody.scrollTop = 0;
                requestAnimationFrame(() => {
                    modalBody.scrollTop = 0;
                });
            }
        }
    };

    function closeDetailModal() {
        if (detailModal) {
            detailModal.classList.remove("inpage-modal-visible");
            const modalBody = detailModal.querySelector(".inpage-modal-body");
            if (modalBody) modalBody.scrollTop = 0;
        }
        currentDetailProgrammeId = null;
    }

    if (detailCloseBtn) detailCloseBtn.addEventListener("click", closeDetailModal);
    if (detailModal) {
        detailModal.addEventListener("click", function (e) {
            if (e.target === detailModal) closeDetailModal();
        });
    }

    // Edit Programme and Fee Modal
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

            const priceVal = cleanPrice(document.getElementById("editProgPrice").value.trim());

            programmes[index].title = cleanStr(document.getElementById("editProgTitle").value.trim());
            programmes[index].code = cleanStr(document.getElementById("editProgCode").value.trim());
            programmes[index].price = priceVal;
            programmes[index].duration = cleanStr(document.getElementById("editProgDuration").value.trim());
            programmes[index].modulesCount = cleanStr(document.getElementById("editProgModules").value.trim());
            programmes[index].capacity = parseInt(document.getElementById("editProgCapacity").value, 10) || programmes[index].capacity;
            programmes[index].instructor = cleanStr(document.getElementById("editProgInstructor").value.trim());
            programmes[index].schedule = cleanSchedule(document.getElementById("editProgSchedule").value.trim());
            programmes[index].description = cleanStr(document.getElementById("editProgDescription").value.trim());

            localStorage.setItem("niit_programmes_v9", JSON.stringify(programmes));
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

        const confirmed = window.confirm(`Are you sure you want to delete "${prog.title}"?\n\nThis will remove the course from the curriculum catalogue.`);
        if (confirmed) {
            programmes = programmes.filter(p => p.id !== progId);
            localStorage.setItem("niit_programmes_v9", JSON.stringify(programmes));
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
        programmes = DEFAULT_PROGRAMMES.map(sanitizeProgramme);
        localStorage.setItem("niit_programmes_v9", JSON.stringify(programmes));
        applyFilters();
        showAlertModal("Catalog Reset", "NIIT academic programmes have been restored.");
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

            const priceVal = cleanPrice(document.getElementById("addProgPrice").value.trim());

            const newProg = {
                id: Date.now(),
                title: cleanStr(document.getElementById("addProgTitle").value.trim()),
                code: cleanStr(document.getElementById("addProgCode").value.trim()) || `PRG-${Math.floor(100 + Math.random() * 900)}`,
                price: priceVal,
                duration: cleanStr(document.getElementById("addProgDuration").value.trim()),
                modulesCount: cleanStr(document.getElementById("addProgModules").value.trim()) || "6 Modules",
                enrolledCount: 0,
                capacity: parseInt(document.getElementById("addProgCapacity").value, 10) || 50,
                badge: document.getElementById("addProgBadge").value || "Certificate",
                image: "/all-images/body-images/software-eng.jpg",
                description: cleanStr(document.getElementById("addProgDescription").value.trim()),
                instructor: cleanStr(document.getElementById("addProgInstructor").value.trim()) || "Assigned Faculty",
                schedule: cleanSchedule(document.getElementById("addProgSchedule").value.trim()) || "Weekday Sessions",
                enrolledStudents: []
            };

            programmes.unshift(newProg);
            localStorage.setItem("niit_programmes_v9", JSON.stringify(programmes));
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


    window.openProgrammeDetails = openProgrammeDetails;
    window.closeDetailModal = closeDetailModal;
    window.openEditProgrammeModal = openEditProgrammeModal;
    window.closeEditModal = closeEditModal;
    window.confirmDeleteProgramme = confirmDeleteProgramme;
    window.resetDefaultProgrammes = resetDefaultProgrammes;
    window.closeAddModal = closeAddModal;

    // Initial render
    renderProgrammes(programmes);
}

export default init;
