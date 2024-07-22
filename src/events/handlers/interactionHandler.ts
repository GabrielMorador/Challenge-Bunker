import { Interaction } from '../../interfaces/interactionInterface';
import Logger from '../../logger/logger';

const handleInteraction = (interaction: Interaction): void => {
  Logger.log('Handling interaction:', interaction);
  // update campaign budget mock
  updateCampaignBudget(interaction.campaignId);
};

const updateCampaignBudget = (campaignId: number): void => {
  Logger.log(`Updating budget for campaign ${campaignId}`);
};

export { handleInteraction };
