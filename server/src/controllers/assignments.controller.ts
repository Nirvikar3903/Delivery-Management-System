import { Request, Response } from 'express';
import Assignment from '../models/assignments.model';
import Partner from '../models/partners.model';
import Order from '../models/orders.model';

// GET /api/assignments/metrics
export const getAssignmentMetrics = async (req: Request, res: Response) => {
  try {
    const activeAssignments = await Assignment.find()
      .populate('orderId')
      .populate('partnerId');

    const partners = await Partner.find();

    const statusCounts = {
      available: 0,
      busy: 0,
      offline: 0,
    };

    partners.forEach((p) => {
      if (p.status === 'inactive') {
        statusCounts.offline++;
      } else if (p.currentLoad > 0) {
        statusCounts.busy++;
      } else {
        statusCounts.available++;
      }
    });

    res.json({
      activeAssignments,
      metrics: {
        totalAssignments: activeAssignments.length,
      },
      partners: statusCounts,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assignment metrics' });
  }
};

// POST /api/assignments/run (dummy assignment logic)
export const runAssignment = async (req: Request, res: Response) => {
  try {
    const pendingOrders = await Order.find({ status: 'pending' });
    const availablePartners = await Partner.find({ status: 'active', currentLoad: 0 });

    const assignments = [];

    for (let i = 0; i < Math.min(pendingOrders.length, availablePartners.length); i++) {
      const order = pendingOrders[i];
      const partner = availablePartners[i];

      const newAssignment = await new Assignment({
        orderId: order._id,
        partnerId: partner._id,
      }).save();

      await Order.findByIdAndUpdate(order._id, {
        status: 'assigned',
        assignedPartner: partner._id,
      });

      await Partner.findByIdAndUpdate(partner._id, {
        currentLoad: 1,
      });

      assignments.push(newAssignment);
    }

    res.json({ message: 'Assignment run completed', assignments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to run assignments' });
  }
};
