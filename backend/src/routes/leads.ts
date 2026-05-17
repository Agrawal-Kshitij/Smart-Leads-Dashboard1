import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { createLead, deleteLead, exportLeadsCsv, getLeadById, getLeads, updateLead } from '../controllers/leadController';

const router = Router();

router.use(authMiddleware);
router.get('/', getLeads);
router.get('/export', exportLeadsCsv);
router.post('/', createLead);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;
