import {
  Interaction,
  InteractionWithDetails,
} from '../interfaces/interactionInterface';
import InteractionRepository from '../repositories/interactionRepository';
import CampaignRepository from '../repositories/campaignRepository';
import { NotFoundError, ValidationError } from '../errors';

class InteractionService {
  async createInteraction(data: Interaction): Promise<Interaction> {
    await this.validateInteraction(data);
    return await InteractionRepository.createInteraction(data);
  }
  async getInteractions(): Promise<InteractionWithDetails[]> {
    const interactions = await InteractionRepository.fetchAll();

    if (!interactions) {
      throw new NotFoundError('No results found.');
    }

    return interactions.map((interaction) => ({
      id: interaction.id,
      campaignId: interaction.campaignId,
      userId: interaction.userId,
      interactionTypeId: interaction.interactionTypeId,
      campaignName: interaction.campaign?.name,
      interactionType: {
        id: interaction.interactionType.id,
        type: interaction.interactionType.type,
      },
      timestamp: interaction.timestamp,
    }));
  }

  private async checkCampaignValidity(campaignId: number): Promise<void> {
    const campaign = await CampaignRepository.getById(campaignId);
    if (!campaign) {
      throw new NotFoundError('Campaign not found.');
    }
    if (campaign.deletedAt !== null) {
      throw new ValidationError('Campaign was deleted.');
    }
    const now = new Date();
    if (campaign.startDate > now || campaign.endDate < now) {
      throw new ValidationError('Campaign is not active.');
    }
  }
  private async checkInteractionTypeValidity(
    interactionTypeId: number,
  ): Promise<void> {
    const interactionType =
      await InteractionRepository.getInteractionTypeById(interactionTypeId);
    if (!interactionType) {
      throw new NotFoundError('Interaction type not found.');
    }
  }
  public async validateInteraction(data: Interaction): Promise<void> {
    if (!data.interactionTypeId) {
      throw new ValidationError(
        "Validation failed: 'interactionTypeId' is required.",
      );
    }
    if (!data.campaignId) {
      throw new ValidationError("Validation failed: 'campaignId' is required.");
    }

    await this.checkCampaignValidity(data.campaignId);
    await this.checkInteractionTypeValidity(data.interactionTypeId);
  }
}

export default new InteractionService();
