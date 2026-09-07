/**
 * Payments Management JavaScript
 * Handles Add Payment modal, student ID fetch, Paystack payment link generation,
 * Payment Receipt preview modal with printable layout, filters, search, and copy link toast.
 */

// Student Database (mirrors the students roster)
const studentDatabase = {
    'AD33578': { name: 'Arlene McCoy', programme: 'Web Development', avatar: 'all-images/icon-images/student-1.png', email: 'arlene.mccoy@example.com' },
    'AD45231': { name: 'Wade Warren', programme: 'Data Analysis', avatar: 'all-images/icon-images/student-2.png', email: 'wade.warren@example.com' },
    'AD67452': { name: 'Brooklyn Simmons', programme: 'Cybersecurity', avatar: 'all-images/icon-images/student-3.png', email: 'brooklyn.simmons@example.com' },
    'AD76133': { name: 'Theresa Webb', programme: 'Software Engineering', avatar: 'all-images/icon-images/student-4.png', email: 'theresa.webb@example.com' },
    'AD98214': { name: 'Darlene Robertson', programme: 'Networking', avatar: 'all-images/icon-images/student-5.png', email: 'darlene.robertson@example.com' },
};

let fetchedStudent = null;

document.addEventListener("DOMContentLoaded", function () {
    // ─── Modal Controls (Add Payment) ──────────────────────────────
    const overlay = document.getElementById('paymentModalOverlay');
    const addBtn = document.getElementById('addPaymentBtn');
    const closeBtn = document.getElementById('paymentModalCloseBtn');
    const fetchBtn = document.getElementById('fetchStudentBtn');
    const addPaymentForm = document.getElementById('addPaymentForm');
    const studentIdInput = document.getElementById('studentIdInput');

    if (addBtn && overlay) {
        addBtn.addEventListener('click', () => {
            overlay.classList.add('payment-modal-visible');
            if (studentIdInput) studentIdInput.value = '';
            document.getElementById('studentPreview').style.display = 'none';
            document.getElementById('studentError').style.display = 'none';
            document.getElementById('submitPaymentBtn').disabled = true;
            fetchedStudent = null;
        });
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => overlay.classList.remove('payment-modal-visible'));
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('payment-modal-visible');
        });
    }

    if (fetchBtn) {
        fetchBtn.addEventListener('click', fetchStudentDetails);
    }

    if (studentIdInput) {
        studentIdInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                fetchStudentDetails();
            }
        });
    }

    if (addPaymentForm) {
        addPaymentForm.addEventListener('submit', handleAddPayment);
    }

    // ─── Filter & Search ───────────────────────────────────────────
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function () {
            const value = this.value;
            const rows = document.querySelectorAll('#paymentTableBody tr');
            rows.forEach(row => {
                if (value === 'all' || row.getAttribute('data-status') === value) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    const searchInput = document.getElementById('paymentSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = this.value.trim().toLowerCase();
            const rows = document.querySelectorAll('#paymentTableBody tr');
            rows.forEach(row => {
                const searchData = row.getAttribute('data-search') || '';
                row.style.display = searchData.includes(query) ? '' : 'none';
            });
        });
    }

    // ─── Receipt Modal Controls ────────────────────────────────────
    const receiptOverlay = document.getElementById('receiptModalOverlay');
    const closeReceiptBtn = document.getElementById('receiptModalCloseBtn');
    const printReceiptBtn = document.getElementById('printReceiptBtn');

    if (closeReceiptBtn && receiptOverlay) {
        closeReceiptBtn.addEventListener('click', () => receiptOverlay.classList.remove('inpage-modal-visible'));
    }

    if (receiptOverlay) {
        receiptOverlay.addEventListener('click', (e) => {
            if (e.target === receiptOverlay) receiptOverlay.classList.remove('inpage-modal-visible');
        });
    }

    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', () => window.print());
    }

    // Attach View click listeners to table
    attachTableViewListeners();
});

// ─── Fetch Student Details ─────────────────────────────────────────
function fetchStudentDetails() {
    const input = document.getElementById('studentIdInput').value.trim().toUpperCase();
    const preview = document.getElementById('studentPreview');
    const error = document.getElementById('studentError');
    const submitBtn = document.getElementById('submitPaymentBtn');

    if (!input) return;

    const student = studentDatabase[input];

    if (student) {
        // Check if student already has a payment entry
        const existingRows = document.querySelectorAll('#paymentTableBody tr');
        for (const row of existingRows) {
            const searchData = row.getAttribute('data-search') || '';
            if (searchData.includes(input.toLowerCase())) {
                error.querySelector('span').textContent = 'This student already has a payment entry.';
                error.style.display = 'flex';
                preview.style.display = 'none';
                submitBtn.disabled = true;
                fetchedStudent = null;
                return;
            }
        }

        fetchedStudent = { id: input, ...student };
        const paymentLink = `pay.niit.edu/${input}`;

        document.getElementById('previewName').textContent = student.name;
        document.getElementById('previewProgramme').textContent = student.programme;
        document.getElementById('previewLink').textContent = paymentLink;

        preview.style.display = 'flex';
        error.style.display = 'none';
        submitBtn.disabled = false;
    } else {
        error.querySelector('span').textContent = 'Student ID not found. Please check and try again.';
        error.style.display = 'flex';
        preview.style.display = 'none';
        submitBtn.disabled = true;
        fetchedStudent = null;
    }
}

// ─── Handle Add Payment ────────────────────────────────────────────
function handleAddPayment(e) {
    e.preventDefault();
    if (!fetchedStudent) return;

    const tbody = document.getElementById('paymentTableBody');
    const rowCount = tbody.querySelectorAll('tr').length + 1;
    const paymentDisplayLink = `pay.niit.edu/${fetchedStudent.id}`;
    const paymentActualUrl = `payment-link.html?id=${fetchedStudent.id}`;
    const searchStr = `${fetchedStudent.name} ${fetchedStudent.id}`.toLowerCase();

    const newRow = document.createElement('tr');
    newRow.setAttribute('data-status', 'Pending');
    newRow.setAttribute('data-search', searchStr);
    newRow.innerHTML = `
        <td class="marks-table-admission-no">${rowCount}</td>
        <td>
            <div class="marks-table-student">
                <img src="${fetchedStudent.avatar}" alt="${fetchedStudent.name}">
                <div>
                    <h4>${fetchedStudent.name}</h4>
                    <p>Student ID: ${fetchedStudent.id}</p>
                </div>
            </div>
        </td>
        <td>${fetchedStudent.programme}</td>
        <td>
            <a href="${paymentActualUrl}" target="_blank" class="payment-link-cell" title="Open or Copy payment link" onclick="handlePaymentLinkClick(this, event, '${fetchedStudent.id}')">
                <i class="bi bi-link-45deg"></i>
                <span>${paymentDisplayLink}</span>
            </a>
        </td>
        <td><span class="status-badge status-badge-pending">Pending</span></td>
        <td><button class="table-view-btn" type="button" onclick="viewPaymentReceipt('${fetchedStudent.name}', '${fetchedStudent.id}', '${fetchedStudent.programme}', 'Pending', '₦150,000')">View</button></td>
    `;

    tbody.appendChild(newRow);
    updatePaymentCount();

    const overlay = document.getElementById('paymentModalOverlay');
    if (overlay) overlay.classList.remove('payment-modal-visible');
    fetchedStudent = null;
}

// ─── Handle Payment Link Click / Copy ──────────────────────────────
function handlePaymentLinkClick(el, e, studentId) {
    // If clicked on the icon, copy the link; if clicked on the text, navigate to payment-link.html
    const target = e.target;
    if (target.classList.contains('bi-link-45deg') || target.tagName === 'I') {
        e.preventDefault();
        copyPaymentLink(el, e);
    }
}

// ─── Copy Payment Link ─────────────────────────────────────────────
function copyPaymentLink(el, e) {
    if (e) e.preventDefault();
    const linkSpan = el.querySelector('span');
    const linkText = linkSpan ? linkSpan.textContent : el.textContent;
    const resolvedUrl = window.location.origin + window.location.pathname.replace('payments.html', '') + `payment-link.html?id=${linkText.replace('pay.niit.edu/', '')}`;

    navigator.clipboard.writeText(resolvedUrl).then(() => {
        showCopyToast();
    }).catch(() => {
        navigator.clipboard.writeText('https://' + linkText).then(showCopyToast);
    });
}

function showCopyToast() {
    const toast = document.getElementById('copiedToast');
    if (toast) {
        toast.classList.add('payment-copied-toast-visible');
        setTimeout(() => toast.classList.remove('payment-copied-toast-visible'), 2000);
    }
}

// ─── Attach Table View Listeners ───────────────────────────────────
function attachTableViewListeners() {
    const rows = document.querySelectorAll('#paymentTableBody tr');
    rows.forEach(row => {
        const viewBtn = row.querySelector('.table-view-btn');
        if (viewBtn && !viewBtn.getAttribute('data-listener-attached')) {
            viewBtn.setAttribute('data-listener-attached', 'true');
            viewBtn.addEventListener('click', function () {
                const nameEl = row.querySelector('.marks-table-student h4');
                const idEl = row.querySelector('.marks-table-student p');
                const progEl = row.querySelectorAll('td')[2];
                const statusBadge = row.querySelector('.status-badge');

                const studentName = nameEl ? nameEl.textContent.trim() : "Student";
                const studentId = idEl ? idEl.textContent.replace('Student ID:', '').trim() : "AD00000";
                const programme = progEl ? progEl.textContent.trim() : "Programme";
                const status = statusBadge ? statusBadge.textContent.trim() : "Pending";
                const amount = "₦150,000";

                viewPaymentReceipt(studentName, studentId, programme, status, amount);
            });
        }
    });
}

// ─── View Payment Receipt Modal ────────────────────────────────────
function viewPaymentReceipt(name, id, programme, status, amount) {
    const receiptOverlay = document.getElementById('receiptModalOverlay');
    if (!receiptOverlay) return;

    const receiptNo = "NIIT-REC-" + (id.replace(/\D/g, '') || Math.floor(10000 + Math.random() * 90000));
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    const isPaid = (status || "").toLowerCase() === "paid";

    document.getElementById('receiptNumber').textContent = receiptNo;
    document.getElementById('receiptDate').textContent = dateFormatted;
    document.getElementById('receiptStudentName').textContent = name;
    document.getElementById('receiptStudentId').textContent = id;
    document.getElementById('receiptProgramme').textContent = programme;
    document.getElementById('receiptAmount').textContent = amount || "₦150,000";
    
    const tagEl = document.getElementById('receiptStatusTag');
    if (tagEl) {
        tagEl.textContent = isPaid ? "Paid" : "Pending";
        tagEl.style.background = isPaid ? "#e8f5e9" : "#fdf1e0";
        tagEl.style.color = isPaid ? "#2e7d32" : "#b25e00";
    }

    const stampEl = document.getElementById('receiptPaidStamp');
    if (stampEl) {
        stampEl.style.display = isPaid ? "inline-flex" : "none";
    }

    receiptOverlay.classList.add('inpage-modal-visible');
}

// ─── Update Payment Count ──────────────────────────────────────────
function updatePaymentCount() {
    const count = document.querySelectorAll('#paymentTableBody tr').length;
    const countEl = document.getElementById('paymentCount');
    if (countEl) {
        countEl.textContent = `${count} payment${count !== 1 ? 's' : ''}`;
    }
    attachTableViewListeners();
}
