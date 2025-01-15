-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_userId_fkey";

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_assignId_fkey" FOREIGN KEY ("assignId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
