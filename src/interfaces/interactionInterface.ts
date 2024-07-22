import { InteractionTypes, Interactions as Interaction } from '@prisma/client';

export interface InteractionWithDetails extends Interaction {
  userId: string;
  interactionType: InteractionTypes;
  campaign?: {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    budget: number;
  };
  timestamp: Date;
}

export { Interaction, InteractionTypes };
