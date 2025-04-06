import { Request, Response } from 'express';
import Partner from '../models/partners.model';

export const getAllPartners = async (req: Request, res: Response) => {
  try {
    const partners = await Partner.find();

    const totalActive = partners.filter(p => p.status === 'active').length;
    const avgRating =
      partners.reduce((sum, p) => sum + (p.metrics?.rating || 0), 0) /
        (partners.length || 1);

    // Count areas frequency
    const areaCount: Record<string, number> = {};
    partners.forEach(partner => {
      partner.areas.forEach(area => {
        areaCount[area] = (areaCount[area] || 0) + 1;
      });
    });

    // Sort areas by frequency
    const topAreas = Object.entries(areaCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);

    res.json({
      partners,
      metrics: {
        totalActive,
        avgRating: parseFloat(avgRating.toFixed(2)),
        topAreas,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch partners' });
  }
};









// import { Request, Response } from 'express';
// import Partner from '../models/partners.model';

// // GET all partners
// export const getAllPartners = async (req: Request, res: Response) => {
//   try {
//     const partners = await Partner.find();
//     res.json(partners);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch partners' });
//   }
// };

// POST create a new partner
export const createPartner = async (req: Request, res: Response) => {
  try {
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create partner' });
  }
};

// PUT update a partner
export const updatePartner = async (req: Request, res: Response) => {
  try {
    const updated = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update partner' });
  }
};

// DELETE a partner
export const deletePartner = async (req: Request, res: Response) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Partner deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete partner' });
  }
};
