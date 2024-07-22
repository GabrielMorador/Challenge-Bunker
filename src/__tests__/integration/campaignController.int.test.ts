import request from 'supertest';
import app from '../../app';
import CampaignService from '../../service/campaignService';
import { NotFoundError, ValidationError } from '../../errors';

jest.mock('../../service/campaignService');
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});
describe('Campaign Controller Integration Tests', () => {
  describe('GET /api/campaigns', () => {
    it('should fetch all campaigns and return them', async () => {
      const mockCampaigns = [{ id: 1, name: 'Campaign 1' }];
      (CampaignService.fetchAll as jest.Mock).mockResolvedValue(mockCampaigns);

      const response = await request(app).get('/api/campaigns?active=true');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Results',
        data: mockCampaigns,
      });
      expect(CampaignService.fetchAll).toHaveBeenCalledWith(true);
    });

    it('should handle errors', async () => {
      const error = new Error('Test error');
      (CampaignService.fetchAll as jest.Mock).mockRejectedValue(error);

      const response = await request(app).get('/api/campaigns?active=true');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  describe('GET /api/campaigns/:id', () => {
    it('should fetch a campaign by ID and return it', async () => {
      const mockCampaign = { id: 1, name: 'Campaign 1' };
      (CampaignService.getById as jest.Mock).mockResolvedValue(mockCampaign);

      const response = await request(app).get('/api/campaigns/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Results founded',
        data: mockCampaign,
      });
      expect(CampaignService.getById).toHaveBeenCalledWith(1);
    });

    it('should handle validation errors', async () => {
      const error = new ValidationError('Invalid campaign ID');
      (CampaignService.getById as jest.Mock).mockRejectedValue(error);

      const response = await request(app).get('/api/campaigns/invalid-id');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid campaign ID');
    });

    it('should handle not found errors', async () => {
      const error = new NotFoundError('Campaign not found');
      (CampaignService.getById as jest.Mock).mockRejectedValue(error);

      const response = await request(app).get('/api/campaigns/1');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Campaign not found');
    });
  });

  describe('POST /api/campaigns', () => {
    it('should create a new campaign and return it', async () => {
      const mockCampaign = { id: 1, name: 'Campaign 1' };
      (CampaignService.create as jest.Mock).mockResolvedValue(mockCampaign);

      const response = await request(app)
        .post('/api/campaigns')
        .send({ name: 'Campaign 1' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Campaign was created successfully',
        data: mockCampaign,
      });
      expect(CampaignService.create).toHaveBeenCalledWith({
        name: 'Campaign 1',
      });
    });

    it('should handle validation errors', async () => {
      const error = new ValidationError('Campaign name is required');
      (CampaignService.create as jest.Mock).mockRejectedValue(error);

      const response = await request(app).post('/api/campaigns').send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Campaign name is required');
    });
  });

  describe('PUT /api/campaigns/:id', () => {
    it('should update a campaign and return it', async () => {
      const mockCampaign = { id: 1, name: 'Updated Campaign' };
      (CampaignService.update as jest.Mock).mockResolvedValue(mockCampaign);

      const response = await request(app)
        .put('/api/campaigns/1')
        .send({ name: 'Updated Campaign' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Campaign was updated successfully',
        data: mockCampaign,
      });
      expect(CampaignService.update).toHaveBeenCalledWith(1, {
        name: 'Updated Campaign',
      });
    });

    it('should handle validation errors', async () => {
      const error = new ValidationError('Invalid campaign ID');
      (CampaignService.update as jest.Mock).mockRejectedValue(error);

      const response = await request(app)
        .put('/api/campaigns/invalid-id')
        .send({ name: 'Updated Campaign' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid campaign ID');
    });
  });

  describe('DELETE /api/campaigns/:id', () => {
    it('should delete a campaign and return it', async () => {
      const mockCampaign = { id: 1, name: 'Deleted Campaign' };
      (CampaignService.delete as jest.Mock).mockResolvedValue(mockCampaign);

      const response = await request(app).delete('/api/campaigns/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Campaign was deleted successfully',
        data: mockCampaign,
      });
      expect(CampaignService.delete).toHaveBeenCalledWith(1);
    });

    it('should handle not found errors', async () => {
      const error = new NotFoundError('Campaign not found');
      (CampaignService.delete as jest.Mock).mockRejectedValue(error);

      const response = await request(app).delete('/api/campaigns/1');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Campaign not found');
    });
  });
});
