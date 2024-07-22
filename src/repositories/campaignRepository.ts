import { PrismaClient, Prisma } from '@prisma/client';
import { Campaigns as Campaign } from '../interfaces/campaignInterface';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

class CampaignRepository {
  async fetchAll(active: boolean): Promise<Campaign[]> {
    let campaigns;
    if (active) {
      campaigns = await prisma.campaigns.findMany({
        where: {
          deletedAt: null, // Filtrar solo campañas que no han sido eliminadas
          startDate: { lte: new Date() }, // Filtrar campañas que hayan iniciado
          endDate: { gte: new Date() }, // Filtrar campañas que aún no han finalizado
        },
      });
    } else {
      campaigns = await prisma.campaigns.findMany();
    }

    return campaigns;
  }
  async getById(id: number): Promise<Campaign | null> {
    const campaign = await prisma.campaigns.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        budget: true,
        deletedAt: true,
      },
    });
    return campaign;
  }
  async create(data: Campaign): Promise<Campaign> {
    const campaignData: Prisma.CampaignsCreateInput = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      budget: data.budget,
    };
    return await prisma.campaigns.create({
      data: campaignData,
    });
  }
  async update(id: number, data: Campaign): Promise<Campaign> {
    const campaignData: Prisma.CampaignsUpdateInput = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      budget: data.budget,
    };
    return await prisma.campaigns.update({
      where: { id: id },
      data: campaignData,
    });
  }
  async delete(id: number): Promise<Campaign> {
    return await prisma.campaigns.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });
  }
}

export default new CampaignRepository();
