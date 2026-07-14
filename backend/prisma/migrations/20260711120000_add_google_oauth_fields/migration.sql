-- AlterTable
ALTER TABLE "User"
ADD COLUMN "googleId" TEXT,
ADD COLUMN "picture" TEXT,
ADD COLUMN "refreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");