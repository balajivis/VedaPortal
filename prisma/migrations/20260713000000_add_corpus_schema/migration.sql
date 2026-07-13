-- CreateEnum
CREATE TYPE "NodeStatus" AS ENUM ('ENUMERATED', 'SOURCED', 'STRUCTURED', 'VOICED');

-- CreateEnum
CREATE TYPE "NodeTier" AS ENUM ('SETTLED', 'MULTI_TRADITIONAL', 'CONTESTED');

-- CreateEnum
CREATE TYPE "Survival" AS ENUM ('LIVING', 'ENDANGERED', 'FRAGMENTARY', 'LOST', 'REDISCOVERED');

-- CreateEnum
CREATE TYPE "YvOrganization" AS ENUM ('KRISHNA', 'SHUKLA');

-- CreateEnum
CREATE TYPE "LayerType" AS ENUM ('SAMHITA', 'BRAHMANA', 'ARANYAKA', 'UPANISHAD');

-- CreateEnum
CREATE TYPE "Patha" AS ENUM ('SAMHITA', 'PADA', 'KRAMA', 'JATA', 'GHANA');

-- CreateTable
CREATE TABLE "Veda" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL DEFAULT 'ENUMERATED',
    "tier" "NodeTier" NOT NULL DEFAULT 'SETTLED',
    "korvai" INTEGER,

    CONSTRAINT "Veda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shakha" (
    "id" TEXT NOT NULL,
    "vedaId" TEXT NOT NULL,
    "organization" "YvOrganization",
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL DEFAULT 'ENUMERATED',
    "tier" "NodeTier" NOT NULL DEFAULT 'SETTLED',
    "korvai" INTEGER,
    "survival" "Survival" NOT NULL,
    "recitingCommunities" JSONB,

    CONSTRAINT "Shakha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Layer" (
    "id" TEXT NOT NULL,
    "shakhaId" TEXT NOT NULL,
    "type" "LayerType" NOT NULL,
    "path" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL DEFAULT 'ENUMERATED',
    "tier" "NodeTier" NOT NULL DEFAULT 'SETTLED',
    "korvai" INTEGER,
    "embeddedInPath" TEXT,

    CONSTRAINT "Layer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kanda" (
    "id" TEXT NOT NULL,
    "layerId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "divisionLabel" TEXT NOT NULL DEFAULT 'kanda',
    "path" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL DEFAULT 'ENUMERATED',
    "tier" "NodeTier" NOT NULL DEFAULT 'SETTLED',
    "korvai" INTEGER,

    CONSTRAINT "Kanda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prashna" (
    "id" TEXT NOT NULL,
    "kandaId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "divisionLabel" TEXT NOT NULL DEFAULT 'prashna',
    "path" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL DEFAULT 'ENUMERATED',
    "tier" "NodeTier" NOT NULL DEFAULT 'SETTLED',
    "korvai" INTEGER,

    CONSTRAINT "Prashna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anuvaka" (
    "id" TEXT NOT NULL,
    "prashnaId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL DEFAULT 'ENUMERATED',
    "tier" "NodeTier" NOT NULL DEFAULT 'SETTLED',
    "korvai" INTEGER,

    CONSTRAINT "Anuvaka_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Panchati" (
    "id" TEXT NOT NULL,
    "anuvakaId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL DEFAULT 'ENUMERATED',
    "tier" "NodeTier" NOT NULL DEFAULT 'SETTLED',
    "korvai" INTEGER,

    CONSTRAINT "Panchati_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mantra" (
    "id" TEXT NOT NULL,
    "anuvakaId" TEXT NOT NULL,
    "panchatiId" TEXT,
    "number" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL DEFAULT 'ENUMERATED',
    "tier" "NodeTier" NOT NULL DEFAULT 'SETTLED',
    "korvai" INTEGER,
    "samhitaPatha" TEXT,
    "padaPatha" TEXT,
    "svara" TEXT,

    CONSTRAINT "Mantra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Viniyoga" (
    "id" TEXT NOT NULL,
    "mantraId" TEXT NOT NULL,
    "ritual" TEXT NOT NULL,
    "context" TEXT,
    "source" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "Viniyoga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MantraLink" (
    "id" TEXT NOT NULL,
    "fromMantraId" TEXT NOT NULL,
    "toMantraId" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'occurrence',
    "note" TEXT,

    CONSTRAINT "MantraLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Veda_name_key" ON "Veda"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Veda_path_key" ON "Veda"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Shakha_path_key" ON "Shakha"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Shakha_vedaId_name_key" ON "Shakha"("vedaId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Layer_path_key" ON "Layer"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Layer_shakhaId_type_key" ON "Layer"("shakhaId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Kanda_path_key" ON "Kanda"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Kanda_layerId_number_key" ON "Kanda"("layerId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Prashna_path_key" ON "Prashna"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Prashna_kandaId_number_key" ON "Prashna"("kandaId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Anuvaka_path_key" ON "Anuvaka"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Anuvaka_prashnaId_number_key" ON "Anuvaka"("prashnaId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Panchati_path_key" ON "Panchati"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Panchati_anuvakaId_number_key" ON "Panchati"("anuvakaId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Mantra_path_key" ON "Mantra"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Mantra_anuvakaId_panchatiId_number_key" ON "Mantra"("anuvakaId", "panchatiId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "MantraLink_fromMantraId_toMantraId_kind_key" ON "MantraLink"("fromMantraId", "toMantraId", "kind");

-- AddForeignKey
ALTER TABLE "Shakha" ADD CONSTRAINT "Shakha_vedaId_fkey" FOREIGN KEY ("vedaId") REFERENCES "Veda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Layer" ADD CONSTRAINT "Layer_shakhaId_fkey" FOREIGN KEY ("shakhaId") REFERENCES "Shakha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kanda" ADD CONSTRAINT "Kanda_layerId_fkey" FOREIGN KEY ("layerId") REFERENCES "Layer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prashna" ADD CONSTRAINT "Prashna_kandaId_fkey" FOREIGN KEY ("kandaId") REFERENCES "Kanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anuvaka" ADD CONSTRAINT "Anuvaka_prashnaId_fkey" FOREIGN KEY ("prashnaId") REFERENCES "Prashna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panchati" ADD CONSTRAINT "Panchati_anuvakaId_fkey" FOREIGN KEY ("anuvakaId") REFERENCES "Anuvaka"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mantra" ADD CONSTRAINT "Mantra_anuvakaId_fkey" FOREIGN KEY ("anuvakaId") REFERENCES "Anuvaka"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mantra" ADD CONSTRAINT "Mantra_panchatiId_fkey" FOREIGN KEY ("panchatiId") REFERENCES "Panchati"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viniyoga" ADD CONSTRAINT "Viniyoga_mantraId_fkey" FOREIGN KEY ("mantraId") REFERENCES "Mantra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MantraLink" ADD CONSTRAINT "MantraLink_fromMantraId_fkey" FOREIGN KEY ("fromMantraId") REFERENCES "Mantra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MantraLink" ADD CONSTRAINT "MantraLink_toMantraId_fkey" FOREIGN KEY ("toMantraId") REFERENCES "Mantra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

