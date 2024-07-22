-- CreateTable
CREATE TABLE "Campaigns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteractionTypes" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "InteractionTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interactions" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "interactionTypeId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InteractionTypes_type_key" ON "InteractionTypes"("type");

-- AddForeignKey
ALTER TABLE "Interactions" ADD CONSTRAINT "Interactions_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interactions" ADD CONSTRAINT "Interactions_interactionTypeId_fkey" FOREIGN KEY ("interactionTypeId") REFERENCES "InteractionTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
