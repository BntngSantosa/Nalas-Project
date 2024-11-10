/*
  Warnings:

  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `date` DATETIME(3) NOT NULL,
    MODIFY `call` VARCHAR(191) NOT NULL;
