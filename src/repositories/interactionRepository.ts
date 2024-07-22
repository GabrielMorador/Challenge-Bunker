import { PrismaClient, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {
  Interaction,
  InteractionWithDetails,
  InteractionTypes,
} from '../interfaces/interactionInterface';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export class InteractionRepository {
  async createInteraction(data: Interaction): Promise<Interaction> {
    const prismaData: Prisma.InteractionsCreateInput = {
      interactionType: { connect: { id: data.interactionTypeId } },
      campaign: {
        connect: { id: data.campaignId },
      },
      userId: uuidv4(),
    };
    return await prisma.interactions.create({
      data: prismaData,
    });
  }

  async fetchAll(): Promise<InteractionWithDetails[]> {
    const interactions = await prisma.interactions.findMany({
      include: {
        interactionType: true,
      },
    });
    return interactions;
  }

  async getInteractionTypeById(id: number): Promise<InteractionTypes | null> {
    const interactionType = await prisma.interactionTypes.findUnique({
      where: { id: id },
      select: {
        id: true,
        type: true,
      },
    });
    return interactionType;
  }
}

export default new InteractionRepository();
