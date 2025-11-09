export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source?: string;
  notes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
}

export type MessageType = 'chat' | 'call';

export interface Message {
  id: string;
  leadId: string;
  type: MessageType;
  sender: 'lead' | 'agent';
  createdAt: string;
  read?: boolean;

  // For chat messages
  message?: string;
  platform?: 'line' | 'facebook' | 'web';

  // For call messages
  callDuration?: number; // in seconds
  callStatus?: 'completed' | 'missed' | 'incoming' | 'outgoing';
  callNotes?: string;
}

// Legacy interfaces (kept for backward compatibility)
export interface ChatMessage {
  id: string;
  leadId: string;
  message: string;
  sender: 'lead' | 'agent';
  platform?: 'line' | 'facebook' | 'web';
  createdAt: string;
  read?: boolean;
}

export interface Call {
  id: string;
  leadId: string;
  userId: string;
  duration?: number;
  notes?: string;
  status: 'completed' | 'missed' | 'scheduled';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export type FollowUpType = 'chat' | 'call';

export interface Activity {
  id: string;
  type: FollowUpType;
  timestamp: string;
  description: string;
  user?: string;
}
