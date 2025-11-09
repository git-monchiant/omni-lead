# Web Dashboard - Omni Lead

## 🚀 Quick Start (Mockup Mode)

รันแค่ Frontend เดียว ไม่ต้องมี Backend!

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. รัน development server
npm run dev
```

เปิดเบราว์เซอร์: **http://localhost:5173**

UI จะใช้ Mock Data จาก `data/mockData.ts` แสดงผลทันที

---

## 📁 โครงสร้างโฟลเดอร์

```
web-dashboard/
├── components/          # React Components
│   ├── LeadList.tsx           # รายการ Lead
│   ├── ChatPanel.tsx          # แชทแบบ Real-time
│   ├── CallLogPanel.tsx       # บันทึกการโทร
│   └── LeadDetail.tsx         # รายละเอียด Lead
├── pages/              # Pages
│   └── chat/
│       └── index.tsx          # หน้า Lead Follow-up หลัก
├── hooks/              # Custom Hooks
│   ├── useSocket.ts           # Socket.IO hook
│   └── useAuth.ts             # Authentication hook
├── types/              # TypeScript Types
│   └── index.ts               # Lead, ChatMessage, Call, etc.
├── data/               # Mock Data
│   └── mockData.ts            # ข้อมูลทดสอบ
└── src/                # App entry
    ├── main.tsx               # React entry point
    ├── App.tsx                # Main App
    └── index.css              # Global styles
```

---

## 🎨 Features

### ✅ พร้อมใช้งานในโหมด Mockup
- รายการ Lead พร้อมค้นหาและกรอง
- UI แชทแบบสวยงาม (ยังไม่เชื่อม real-time)
- บันทึกการโทร
- แสดง/แก้ไขรายละเอียด Lead
- Responsive Design

### ⏳ รอเชื่อมต่อ Backend
- Real-time chat ผ่าน Socket.IO
- API calls สำหรับ CRUD operations
- Authentication ด้วย JWT

---

## 🔧 Configuration

### Standalone Mode (ตอนนี้)
ไฟล์ `.env`:
```env
VITE_API_URL=disabled
VITE_SOCKET_URL=disabled
```

### Full Stack Mode (เมื่อ Backend พร้อม)
แก้ไขไฟล์ `.env`:
```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3001
```

---

## 📝 Mock Data

แก้ไขข้อมูลทดสอบได้ที่: `data/mockData.ts`

- `mockLeads` - รายการ Lead
- `mockChatMessages` - ข้อความแชท
- `mockCalls` - ประวัติการโทร
- `mockUsers` - ข้อมูลผู้ใช้

---

## 🛠️ Scripts

```bash
npm run dev          # รัน dev server (port 5173)
npm run build        # build สำหรับ production
npm run preview      # preview production build
npm run type-check   # ตรวจสอบ TypeScript
```

---

## 🎯 Next Steps

1. ✅ ทดสอบ UI ด้วย Mock Data
2. ⏳ พัฒนา Backend API
3. ⏳ เชื่อมต่อ Frontend กับ Backend
4. ⏳ เพิ่ม Authentication
5. ⏳ Deploy to production

---

## 💡 Tips

- ใช้ React DevTools เพื่อ debug
- ดู Console เพื่อดู logs
- แก้ไข Mock Data ได้ตลอดเวลา
- CSS ใช้ styled-jsx (inline styles)
