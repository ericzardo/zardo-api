/*
  Warnings:

  - You are about to alter the column `interval` on the `FreelancerCron` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `unit` to the `FreelancerCron` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FreelancerCron` ADD COLUMN `time` VARCHAR(191) NULL,
    ADD COLUMN `unit` VARCHAR(191) NOT NULL,
    MODIFY `interval` INTEGER NOT NULL;
