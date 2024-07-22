import { Campaigns as Campaign } from '../interfaces/campaignInterface';
import CampaignRepository from '../repositories/campaignRepository';
import { NotFoundError, ValidationError } from '../errors';

class CampaignService {
  async create(data: Campaign): Promise<Campaign> {
    this.validateCampaign(data);
    return await CampaignRepository.create(data);
  }
  async update(id: number, data: Campaign): Promise<Campaign> {
    this.validateCampaign(data);
    const searchCampaign = await this.getById(id);
    if (!searchCampaign) {
      throw new NotFoundError('Campaign does not exists.');
    }
    if (searchCampaign.deletedAt !== null) {
      throw new ValidationError('Campaign was deleted.');
    }
    return await CampaignRepository.update(id, data);
  }
  async delete(id: number): Promise<Campaign> {
    const searchCampaign = await this.getById(id);
    if (!searchCampaign) {
      throw new NotFoundError('Campaign does not exists.');
    }
    if (searchCampaign.deletedAt !== null) {
      throw new ValidationError('Campaign was deleted before.');
    }
    return await CampaignRepository.delete(id);
  }
  async fetchAll(active: boolean): Promise<Campaign[]> {
    const campains = await CampaignRepository.fetchAll(active);
    if (!campains || campains.length === 0) {
      throw new NotFoundError('No results found.');
    }
    return campains;
  }
  async getById(id: number): Promise<Campaign | null> {
    if (isNaN(id)) {
      throw new ValidationError('Invalid ID format.');
    }
    const campaign = await CampaignRepository.getById(id);
    if (!campaign) {
      throw new NotFoundError('No results found.');
    }
    return campaign;
  }

  private validateCampaign(data: Campaign): void {
    // validate field required
    if (!data.name) {
      throw new ValidationError("Validation failed: 'name' is required.");
    }
    if (!data.startDate) {
      throw new ValidationError("Validation failed: 'startDate' is required.");
    }
    if (!data.endDate) {
      throw new ValidationError("Validation failed: 'endDate' is required.");
    }
    if (data.budget == null) {
      throw new ValidationError("Validation failed: 'budget' is required.");
    }

    // validate date
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    if (isNaN(startDate.getTime())) {
      throw new ValidationError(
        "Validation failed: 'startDate' is not a valid date.",
      );
    }
    if (isNaN(endDate.getTime())) {
      throw new ValidationError(
        "Validation failed: 'endDate' is not a valid date.",
      );
    }

    // validate amount
    if (typeof data.budget !== 'number' || data.budget <= 0) {
      throw new ValidationError(
        "Validation failed: 'budget' must be a positive number.",
      );
    }
  }
}

export default new CampaignService();
