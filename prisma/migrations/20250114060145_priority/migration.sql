/*
  Warnings:

  - Added the required column `priority` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PriorityType" AS ENUM ('URGENT', 'HIGH', 'LOW', 'MEDIUM');

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "priority" "PriorityType" NOT NULL;
