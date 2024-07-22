import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });


async function main(){
    try {
        console.log('Starting seed process...');
        await seedCampaigns();
        await seedInteractionTypes();
        await seedInteractions();
        console.log('Seed data created successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}


async function seedCampaigns(){
    const campaigns = [
        { name: 'Campaign 1', startDate: new Date('2024-01-01T00:00:00Z'), endDate: new Date('2024-12-31T23:59:59Z'), budget: 1000.0 },
        { name: 'Campaign 2', startDate: new Date('2024-01-01T00:00:00Z'), endDate: new Date('2024-12-31T23:59:59Z'), budget: 2000.0 },
      ];

    for(const campaign of campaigns){
        const existingCampaign = await prisma.campaigns.findFirst({
            where: {name : campaign.name}
        });

        if(!existingCampaign){
            await prisma.campaigns.create({
                data: campaign,
            });
        }else{
            await prisma.campaigns.update({
                where:{id : existingCampaign.id},
                data: campaign,
            });
        }
    }
}

async function seedInteractionTypes(){
    const interactions = [
        { type:"click" },
        { type:"view" },
    ]

    for (const interaction of interactions){
        await prisma.interactionTypes.upsert({
            where:{ type: interaction.type},
            update:{},
            create:interaction
        });
    }
}

async function seedInteractions() {
    const interactions = [
      { campaignName: 'Campaign 1', userEmail: 'test1@test.com', interactionType: 'click' },
      { campaignName: 'Campaign 1', userEmail: 'test2@test.com', interactionType: 'view' },
      { campaignName: 'Campaign 2', userEmail: 'test1@test.com', interactionType: 'click' },
    ];
  
    for(const interaction of interactions){
      const campaign = await prisma.campaigns.findFirst({ where: { name: interaction.campaignName } });
      const interactionType = await prisma.interactionTypes.findFirst({ where: { type: interaction.interactionType } });
  
      if(campaign && interactionType) {
        await prisma.interactions.create({
          data: {
            campaignId: campaign.id,
            userId: uuidv4(),
            interactionTypeId: interactionType.id,
            timestamp: new Date(), 
          },
        });
      }
    }
}

main()
    .catch((e)=>{
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect()
    })