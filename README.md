# 🚀 TrackFlow CRM – Modern Sales Pipeline Management

**TrackFlow CRM** is a sleek, drag-and-drop Kanban system that helps sales teams visualize their pipeline, automate email updates, and track performance in real time.

---

## 🌟 Key Features

- ✅ **Visual Kanban Board** – Move leads through six intuitive stages
- 📧 **Automated Email Alerts** – Sends congratulatory emails via Nodemailer when leads are marked as "Won"
- 📊 **Live Dashboard Analytics** – Track conversion rates, stage distribution, and follow-up priorities
- 🔄 **Order Conversion** – Instantly convert a "Won" lead into a new order
- 📱 **Fully Responsive UI** – Seamless experience on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer            | Technology                        |
|------------------|------------------------------------|
| **Frontend**     | Next.js 14 (App Router)           |
| **UI Library**   | [shadcn/ui](https://ui.shadcn.com) (Radix UI + Tailwind CSS) |
| **Backend**      | Next.js API Routes                |
| **Database**     | MongoDB                           |
| **Email Service**| Nodemailer (SMTP/Gmail)           |
| **Form Handling**| React Hook Form                   |
| **Icons**        | Lucide React, shadcn/ui           |

---

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/trackflow-crm.git
cd trackflow-crm

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and email credentials

# 4. Start the development server
npm run dev
```

---

## 🧠 Key Challenges & Solutions

### 1. 🧩 Real-Time Kanban Updates  
**Challenge:** Ensuring drag-and-drop actions feel instant and reflect correctly in the backend.  
**Solution:** Implemented **optimistic UI updates** with React and synchronized backend state via secure API routes.

### 2. 📬 Email Notifications on "Won" Stage  
**Challenge:** Sending reliable and secure transactional emails.  
**Solution:** Used **Nodemailer** with environment-secured SMTP credentials, triggered from backend logic on stage change.

### 3. 📱 Responsive and Accessible UI  
**Challenge:** Building a seamless experience across all devices.  
**Solution:** Utilized **Tailwind CSS** and **Radix UI** for responsive, accessible, and consistent component behavior.

### 4. 🔐 Backend API Security  
**Challenge:** Preventing malicious data and ensuring data integrity.  
**Solution:** Employed **type-safe API routes**, **input validation** using Zod, and sanitized data on all inputs.

---

## 📦 Database Schema (MongoDB)

### 🗂️ `leads` Collection

```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "stage": "New",
  "company": "Acme Corp",
  "createdAt": ISODate("2025-05-26T12:00:00Z"),
  "updatedAt": ISODate("2025-05-26T12:00:00Z")
}
```

### 🗂️ `orders` Collection

```json
{
  "_id": ObjectId("..."),
  "leadId": ObjectId("..."),
  "status": "Pending",
  "trackingId": "ABC123"
}
```

> 🔗 Relationships are managed manually through `leadId` (no foreign key constraints in MongoDB).

---

## 🧪 Future Improvements

- ✅ Role-Based Access Control (RBAC)
- ✅ WebSocket support for real-time team collaboration
- ✅ Calendar and CRM integrations (Google Calendar, HubSpot, etc.)

---

## 🤝 Contributing

We welcome contributions! To get started:

```bash
# Fork the repository
# Create a feature branch
git checkout -b feature/AmazingFeature

# Make your changes and commit
git commit -m "Add AmazingFeature"

# Push to your fork and open a PR
git push origin feature/AmazingFeature
```

---


