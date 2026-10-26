# As-Shifa Hospital — Multi-page website demo

A lightweight Bengali multi-page static website. Separate HTML files for each menu item, shared formatted CSS and JavaScript.

## Run
Open `index.html` in a browser. For local development, use `python -m http.server 8000` inside this folder.

## Pages
Home, About, Departments, Doctors, Appointments, Diagnostics, Pharmacy, Emergency, Blood Donors, Contact, Billing, Dashboard, Privacy.

## Important limitations
- This is a **frontend demo**, not a production hospital management system.
- Forms validate locally but **do not submit or store data**.
- No authentication, medical records, admin database, payment verification, or real appointment booking exists yet.
- Do not enter real patient data.
- No doctors, fees, hospital emergency number, or hospital services have been independently verified.
- The bKash number 01971936771 was supplied by the user; confirm it with the hospital before real payments.

## Next steps
Implement authenticated Fastify APIs, PostgreSQL database, staff permissions, audit logs, clinical review, verified hospital content, and secure deployment.

Additional pages: blood-donors.html (donor search and registration demo), live-serial.html (manual local queue simulation; NOT live hospital data).
