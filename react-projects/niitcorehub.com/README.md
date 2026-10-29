# NIIT CoreHub

NIIT CoreHub is a centralised web portal designed for NIIT training centres to streamline academic administration, student enrolment, faculty management, and guardian communication.

The system provides two distinct portals:

1. **Staff Portal**: Designed for institute administrators, tutors, and student counselors. It offers comprehensive management over student admissions, academic programmes, staff directories, tuition fee records, and referral tracking.
2. **Parent and Guardian Portal**: A dedicated self-service interface that allows parents and guardians to monitor their children's course progress, review fee payment statuses, and manage contact details.

---

## Key Features

- **Authentication and Protected Routes**: Secure login, password reset flow, and route guards that prevent unauthenticated access to administrative and parent dashboards without flash redirects.
- **Role-Aware Administration**: Navigation and permissions tailored for Super Admins, Lecturers, and Counselors.
- **Student Management**: Register new students, filter by programme, view student profiles, and update enrolment statuses.
- **Staff and Faculty Directory**: Maintain records for instructors, senior lecturers, administrative staff, and counselors.
- **Parent Management**: Add and manage parent details, link parents to students, and generate access credentials for the Parent Portal.
- **Programme Directory**: Browse, search, and manage ICT training courses, syllabus modules, durations, and pricing.
- **Tuition and Fee Tracking**: Record tuition payments, monitor payment statuses (Paid, Pending, Overdue), and generate invoice receipts.
- **Referral Tracking**: Monitor student admissions brought in through staff and counselor referrals.
- **Responsive Layout**: Designed for mobile phones (390px), tablets (768px), and desktop viewports (1024px and wider), featuring collapsible mobile navigation and horizontally scrollable data tables.

---

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool and Dev Server**: Vite
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Axios with custom interceptors for backend compatibility
- **Icons**: Bootstrap Icons (v1.11.3)
- **Styling**: Vanilla CSS utilizing CSS variables, responsive media queries, and Poppins typography

---

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (Node package manager)

### Installation

1. Clone or download the repository to your local computer.
2. Open a terminal in the project directory and install dependencies:

```bash
npm install
```

3. Set up your environment variables by copying `.env.example` to `.env`:

```bash
cp .env.example .env
```

### Running Locally

To start the Vite development server with Hot Module Replacement:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

To validate TypeScript/lint rules and produce the minified production bundle in the `dist` directory:

```bash
npm run build
```

To preview the built production bundle locally:

```bash
npm run preview
```

---

## Environment Variables

The project recognizes the following variables defined in your `.env` file:

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API server. |
| `VITE_DEMO_EMAIL` | Optional demo login email for local development testing (only active when running in development mode). |
| `VITE_DEMO_PASSWORD` | Optional demo login password for local development testing (only active when running in development mode). |

---

## Known Limitations

- **Client-Side Data Persistence**: Student admissions, parent records, and payment transactions are stored in browser localStorage and mocked data stores rather than a fully integrated database API.
- **Sign-Up Simulation**: The public staff sign-up form runs as a client-side demonstration because a dedicated backend registration endpoint is not yet provisioned.
- **OTP Delivery**: Password reset relies on backend email dispatch; in local development with an unreachable backend, request errors are reported directly through the error alert banner.
