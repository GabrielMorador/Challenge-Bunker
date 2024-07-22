import { Request, Response, NextFunction } from 'express';
import CampaignService from '../service/campaignService';
import { Campaigns as Campaign } from '../interfaces/campaignInterface';

export const getCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const includeInactive = req.query.active === 'true';
    const campaigns = await CampaignService.fetchAll(includeInactive);
    res.status(200).json({ message: 'Results', data: campaigns });
  } catch (error) {
    next(error);
  }
};

export const getCampaignById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    const campaign = await CampaignService.getById(id);
    res.status(200).json({ message: 'Results founded', data: campaign });
  } catch (error) {
    next(error);
  }
};

export const createCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const campaignData: Campaign = req.body;
    const campaign = await CampaignService.create(campaignData);
    res
      .status(201)
      .json({ message: 'Campaign was created successfully', data: campaign });
  } catch (error) {
    next(error);
  }
};

export const updateCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const campaignData: Campaign = req.body;
    const id = parseInt(req.params.id);
    const campaign = await CampaignService.update(id, campaignData);
    res
      .status(200)
      .json({ message: 'Campaign was updated successfully', data: campaign });
  } catch (error) {
    next(error);
  }
};

export const deleteCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    const campaign = await CampaignService.delete(id);
    res
      .status(200)
      .json({ message: 'Campaign was deleted successfully', data: campaign });
  } catch (error) {
    next(error);
  }
};
