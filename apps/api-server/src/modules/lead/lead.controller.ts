import { Request, Response } from 'express';

export class LeadController {
  async getLeads(req: Request, res: Response) {
    // TODO: Implement get all leads
    res.json({ message: 'Get all leads' });
  }

  async getLeadById(req: Request, res: Response) {
    // TODO: Implement get lead by id
    const { id } = req.params;
    res.json({ message: `Get lead ${id}` });
  }

  async createLead(req: Request, res: Response) {
    // TODO: Implement create lead
    res.json({ message: 'Create lead' });
  }

  async updateLead(req: Request, res: Response) {
    // TODO: Implement update lead
    const { id } = req.params;
    res.json({ message: `Update lead ${id}` });
  }

  async deleteLead(req: Request, res: Response) {
    // TODO: Implement delete lead
    const { id } = req.params;
    res.json({ message: `Delete lead ${id}` });
  }
}
