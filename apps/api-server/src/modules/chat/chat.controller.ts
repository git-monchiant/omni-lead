import { Request, Response } from 'express';

export class ChatController {
  // Webhook endpoint for receiving messages from platforms
  async webhook(req: Request, res: Response) {
    // TODO: Implement webhook handler for LINE/Facebook
    console.log('Received webhook:', req.body);
    res.json({ status: 'received' });
  }

  // Reply endpoint for sending messages
  async reply(req: Request, res: Response) {
    // TODO: Implement reply functionality
    const { leadId, message } = req.body;
    res.json({ message: 'Reply sent', leadId, sentMessage: message });
  }

  // Get chat history for a lead
  async getChatHistory(req: Request, res: Response) {
    // TODO: Implement get chat history
    const { leadId } = req.params;
    res.json({ message: `Get chat history for lead ${leadId}` });
  }
}
