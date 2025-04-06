import express from 'express';
import { getAssignmentMetrics, runAssignment } from '../controllers/assignments.controller';

const router = express.Router();

router.get('/metrics', getAssignmentMetrics);
router.post('/run', runAssignment);

export default router;
