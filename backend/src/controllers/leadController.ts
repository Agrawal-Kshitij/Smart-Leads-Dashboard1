import { Response } from 'express';
import { z } from 'zod';
import Lead from '../models/Lead';
import { AuthRequest } from '../middleware/auth';

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source: z.enum(['Website', 'Instagram', 'Referral'])
});

export const createLead = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten().fieldErrors });

  const lead = await Lead.create({ ...parsed.data, owner: req.user._id });
  res.status(201).json(lead);
};

export const updateLead = async (req: AuthRequest, res: Response) => {
  const parsed = leadSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten().fieldErrors });

  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  if (req.user?.role !== 'admin' && lead.owner.toString() !== req.user?._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  Object.assign(lead, parsed.data);
  await lead.save();
  res.status(200).json(lead);
};

export const deleteLead = async (req: AuthRequest, res: Response) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  if (req.user?.role !== 'admin' && lead.owner.toString() !== req.user?._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  await lead.deleteOne();
  res.status(204).send();
};

export const getLeads = async (req: AuthRequest, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = 10;
  const skip = (page - 1) * limit;
  const { status, source, search, sort } = req.query as Record<string, string>;
  const filter: any = {};

  if (status) filter.status = status;
  if (source) filter.source = source;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }
  if (req.user?.role !== 'admin') {
    filter.owner = req.user?._id;
  }

  const sortOrder = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  const total = await Lead.countDocuments(filter);
  const leads = await Lead.find(filter).sort(sortOrder).skip(skip).limit(limit);

  res.status(200).json({
    leads,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  });
};

export const getLeadById = async (req: AuthRequest, res: Response) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  if (req.user?.role !== 'admin' && lead.owner.toString() !== req.user?._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  res.status(200).json(lead);
};

export const exportLeadsCsv = async (req: AuthRequest, res: Response) => {
  const { status, source, search, sort } = req.query as Record<string, string>;
  const filter: any = {};
  if (status) filter.status = status;
  if (source) filter.source = source;
  if (search) filter.$or = [
    { name: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } }
  ];
  if (req.user?.role !== 'admin') filter.owner = req.user?._id;

  const sortOrder = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  const leads = await Lead.find(filter).sort(sortOrder);
  const csvRows = ['Name,Email,Status,Source,Created At'];
  leads.forEach((lead) => {
    csvRows.push(`${lead.name},${lead.email},${lead.status},${lead.source},${lead.createdAt.toISOString()}`);
  });

  res.header('Content-Type', 'text/csv');
  res.header('Content-Disposition', 'attachment; filename="leads.csv"');
  res.send(csvRows.join('\n'));
};
