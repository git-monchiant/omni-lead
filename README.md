# Omni Lead Management System

A comprehensive lead management system with real-time chat capabilities, call logging, and multi-channel communication support.

## Project Structure

```
omni-lead/
├── apps/
│   ├── api-server/          # REST API with NestJS-like structure
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── modules/
│   │   │   │   ├── lead/    # Lead management
│   │   │   │   ├── chat/    # Webhook and reply endpoints
│   │   │   │   ├── call/    # Manual call logging
│   │   │   │   └── user/    # Authentication with JWT
│   │   │   ├── prisma/
│   │   │   │   └── schema.prisma
│   │   │   └── common/
│   │   └── package.json
│   │
│   ├── socket-server/       # Real-time messaging with Socket.IO
│   │   ├── main.ts
│   │   ├── events/
│   │   │   └── chat.events.ts
│   │   └── package.json
│   │
│   └── web-dashboard/       # React frontend
│       ├── pages/
│       │   ├── leads/
│       │   ├── chat/
│       │   └── login/
│       ├── components/
│       ├── hooks/
│       └── package.json
│
├── docker-compose.yml
└── README.md
```

## Features

### API Server
- **Lead Management**: CRUD operations for leads
- **Chat Module**:
  - Webhook endpoints for LINE/Facebook integration
  - Reply endpoints for sending messages
  - Chat history retrieval
- **Call Module**: Manual call logging and history
- **User Module**: JWT-based authentication and authorization

### Socket Server
- Real-time message delivery
- Typing indicators
- Room-based chat (per lead)
- Event-driven architecture

### Web Dashboard
- Lead management interface
- Real-time chat interface
- User authentication
- Responsive design

## Technology Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Socket.IO
- **Frontend**: React, TypeScript, Vite
- **Authentication**: JWT
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (if not using Docker)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd omni-lead
```

2. Install dependencies for each app
```bash
# API Server
cd apps/api-server
npm install

# Socket Server
cd ../socket-server
npm install

# Web Dashboard
cd ../web-dashboard
npm install
```

3. Set up environment variables

Create `.env` files in each app directory:

**apps/api-server/.env**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/omnilead
PORT=3000
JWT_SECRET=your-secret-key-here
```

**apps/socket-server/.env**
```env
SOCKET_PORT=3001
CORS_ORIGIN=http://localhost:5173
```

**apps/web-dashboard/.env**
```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3001
```

4. Run with Docker Compose
```bash
docker-compose up -d
```

Or run each service individually:

```bash
# Terminal 1 - API Server
cd apps/api-server
npm run dev

# Terminal 2 - Socket Server
cd apps/socket-server
npm run dev

# Terminal 3 - Web Dashboard
cd apps/web-dashboard
npm run dev
```

### Database Setup

```bash
cd apps/api-server
npm run prisma:generate
npm run prisma:migrate
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Leads
- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get lead by ID
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Chat
- `POST /api/chat/webhook` - Webhook for incoming messages
- `POST /api/chat/reply` - Send reply message
- `GET /api/chat/history/:leadId` - Get chat history

### Calls
- `POST /api/calls/log` - Log manual call
- `GET /api/calls/:leadId` - Get call history for lead
- `GET /api/calls` - Get all calls

## Socket Events

### Client Events
- `join-lead-chat` - Join a lead's chat room
- `leave-lead-chat` - Leave a lead's chat room
- `send-message` - Send message to lead
- `typing` - Notify typing
- `stop-typing` - Stop typing notification

### Server Events
- `new-message` - New message received
- `user-typing` - User is typing
- `user-stop-typing` - User stopped typing

## Development

### API Server
```bash
cd apps/api-server
npm run dev        # Start development server
npm run build      # Build for production
npm run prisma:studio  # Open Prisma Studio
```

### Socket Server
```bash
cd apps/socket-server
npm run dev        # Start development server
npm run build      # Build for production
```

### Web Dashboard
```bash
cd apps/web-dashboard
npm run dev        # Start development server
npm run build      # Build for production
```

## TODO

- [ ] Implement webhook integration for LINE
- [ ] Implement webhook integration for Facebook Messenger
- [ ] Add real-time notifications
- [ ] Implement file upload for chat
- [ ] Add analytics dashboard
- [ ] Implement role-based access control
- [ ] Add email notifications
- [ ] Create mobile app

## License

MIT
