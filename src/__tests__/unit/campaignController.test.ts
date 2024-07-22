import { Request, Response, NextFunction } from 'express';
import {
  getCampaigns,
  getCampaignById,
  createCampaigns,
  updateCampaign,
  deleteCampaign,
} from '../../controllers/campaignController';
import CampaignService from '../../service/campaignService';
import { Campaigns as Campaign } from '../../interfaces/campaignInterface';

jest.mock('../../service/campaignService');

describe('Campaign Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCampaigns', () => {
    it('should fetch all campaigns and return them', async () => {
      const mockCampaigns = [{ id: 1, name: 'Campaign 1' }];
      (CampaignService.fetchAll as jest.Mock).mockResolvedValue(mockCampaigns);

      req.query = { active: 'true' };

      await getCampaigns(req as Request, res as Response, next);

      expect(CampaignService.fetchAll).toHaveBeenCalledWith(true);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Results',
        data: mockCampaigns,
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Test error');
      (CampaignService.fetchAll as jest.Mock).mockRejectedValue(error);

      req.query = { active: 'true' }; // Asegúrate de que req.query esté definido

      await getCampaigns(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getCampaignById', () => {
    it('should fetch a campaign by ID and return it', async () => {
      const mockCampaign = { id: 1, name: 'Campaign 1' };
      (CampaignService.getById as jest.Mock).mockResolvedValue(mockCampaign);

      req.params = { id: '1' };

      await getCampaignById(req as Request, res as Response, next);

      expect(CampaignService.getById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Results founded',
        data: mockCampaign,
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Test error');
      (CampaignService.getById as jest.Mock).mockRejectedValue(error);

      req.params = { id: '1' };

      await getCampaignById(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createCampaigns', () => {
    it('should create a new campaign and return it', async () => {
      const mockCampaign = { id: 1, name: 'Campaign 1' };
      (CampaignService.create as jest.Mock).mockResolvedValue(mockCampaign);

      req.body = { name: 'Campaign 1' } as Campaign;

      await createCampaigns(req as Request, res as Response, next);

      expect(CampaignService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Campaign was created successfully',
        data: mockCampaign,
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Test error');
      (CampaignService.create as jest.Mock).mockRejectedValue(error);

      req.body = { name: 'Campaign 1' } as Campaign;

      await createCampaigns(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateCampaign', () => {
    it('should update a campaign and return it', async () => {
      const mockCampaign = { id: 1, name: 'Updated Campaign' };
      (CampaignService.update as jest.Mock).mockResolvedValue(mockCampaign);

      req.params = { id: '1' };
      req.body = { name: 'Updated Campaign' } as Campaign;

      await updateCampaign(req as Request, res as Response, next);

      expect(CampaignService.update).toHaveBeenCalledWith(1, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Campaign was updated successfully',
        data: mockCampaign,
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Test error');
      (CampaignService.update as jest.Mock).mockRejectedValue(error);

      req.params = { id: '1' };
      req.body = { name: 'Updated Campaign' } as Campaign;

      await updateCampaign(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteCampaign', () => {
    it('should delete a campaign and return it', async () => {
      const mockCampaign = { id: 1, name: 'Deleted Campaign' };
      (CampaignService.delete as jest.Mock).mockResolvedValue(mockCampaign);

      req.params = { id: '1' };

      await deleteCampaign(req as Request, res as Response, next);

      expect(CampaignService.delete).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Campaign was deleted successfully',
        data: mockCampaign,
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Test error');
      (CampaignService.delete as jest.Mock).mockRejectedValue(error);

      req.params = { id: '1' };

      await deleteCampaign(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
