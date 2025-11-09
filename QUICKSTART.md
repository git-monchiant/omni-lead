# 🚀 Quick Start Guide - Omni Lead Management

## วิธีรัน Project แบบง่าย ๆ

### ขั้นตอนที่ 1: ติดตั้ง Dependencies

```bash
# ติดตั้ง dependencies สำหรับ web-dashboard
cd apps/web-dashboard
npm install

# กลับมา root
cd ../..
```

### ขั้นตอนที่ 2: รัน Web Dashboard (แบบ Standalone)

```bash
cd apps/web-dashboard
npm run dev
```

เปิดเบราว์เซอร์ที่: **http://localhost:5173**

---

## 🎯 วิธีรันแบบเต็มระบบ (Full Stack)

### ขั้นตอนที่ 1: ติดตั้ง Dependencies ทุก App

```bash
# API Server
cd apps/api-server
npm install
cd ../..

# Socket Server
cd apps/socket-server
npm install
cd ../..

# Web Dashboard
cd apps/web-dashboard
npm install
cd ../..
```

### ขั้นตอนที่ 2: Setup Database (PostgreSQL)

#### Option 1: ใช้ Docker
```bash
docker-compose up -d postgres
```

#### Option 2: ใช้ PostgreSQL ที่ติดตั้งเอง
```bash
# สร้าง database
createdb omnilead
```

### ขั้นตอนที่ 3: Setup Environment Variables

```bash
# API Server
cp apps/api-server/.env.example apps/api-server/.env

# Socket Server
cp apps/socket-server/.env.example apps/socket-server/.env

# Web Dashboard (ทำไว้แล้ว)
# มี .env อยู่แล้วใน apps/web-dashboard/
```

### ขั้นตอนที่ 4: Run Database Migrations (API Server)

```bash
cd apps/api-server
npm run prisma:generate
npm run prisma:migrate
cd ../..
```

### ขั้นตอนที่ 5: รันทุก Services

เปิด 3 Terminal แยกกัน:

**Terminal 1 - API Server**
```bash
cd apps/api-server
npm run dev
```

**Terminal 2 - Socket Server**
```bash
cd apps/socket-server
npm run dev
```

**Terminal 3 - Web Dashboard**
```bash
cd apps/web-dashboard
npm run dev
```

---

## 📍 Ports & URLs

| Service | Port | URL |
|---------|------|-----|
| Web Dashboard | 5173 | http://localhost:5173 |
| API Server | 3000 | http://localhost:3000 |
| Socket Server | 3001 | http://localhost:3001 |
| PostgreSQL | 5432 | localhost:5432 |

---

## 🎨 ทดสอบ UI (ใช้ Mock Data)

**ตอนนี้รัน Web Dashboard เพียงอย่างเดียวก็ใช้งานได้แล้ว!**

```bash
cd apps/web-dashboard
npm run dev
```

UI จะใช้ Mock Data จาก `apps/web-dashboard/data/mockData.ts` ในการแสดงผล

### ฟีเจอร์ที่ทดสอบได้:
- ✅ รายการ Lead พร้อมการค้นหาและกรอง
- ✅ UI การแชท (ยังไม่เชื่อม Socket จริง)
- ✅ UI บันทึกการโทร
- ✅ แสดงและแก้ไขรายละเอียด Lead
- ✅ Responsive Design

---

## 🔧 Troubleshooting

### ปัญหา: Port ชนกัน
```bash
# เปลี่ยน port ใน .env ของแต่ละ app
```

### ปัญหา: Database connection failed
```bash
# ตรวจสอบว่า PostgreSQL รันอยู่
# ตรวจสอบ DATABASE_URL ใน apps/api-server/.env
```

### ปัญหา: Module not found
```bash
# ติดตั้ง dependencies ใหม่
cd apps/web-dashboard
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 คำสั่งที่มีประโยชน์

### Web Dashboard
```bash
npm run dev          # รัน development server
npm run build        # build สำหรับ production
npm run preview      # ดู build version
```

### API Server
```bash
npm run dev              # รัน development server
npm run prisma:studio    # เปิด Prisma Studio (GUI สำหรับดู database)
npm run prisma:migrate   # รัน migrations
```

### Socket Server
```bash
npm run dev          # รัน development server
```

---

## 🎯 Next Steps

1. ✅ รัน Web Dashboard และทดสอบ UI
2. ⏳ รัน API Server และเชื่อมต่อกับ Database
3. ⏳ รัน Socket Server สำหรับ Real-time chat
4. ⏳ เชื่อม Frontend กับ Backend APIs
5. ⏳ Implement LINE/Facebook webhook integration

---

## 💡 Tips

- ใช้ Mock Data ก่อนเพื่อพัฒนา UI
- เปิด Browser DevTools เพื่อดู Console และ Network
- ใช้ Prisma Studio เพื่อจัดการ Database ได้สะดวก
- ดู README.md หลักสำหรับรายละเอียดเพิ่มเติม
