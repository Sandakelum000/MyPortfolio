-- AlterTable
ALTER TABLE "SkillGroup" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "email" TEXT,
    "github" TEXT,
    "linkedin" TEXT,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
