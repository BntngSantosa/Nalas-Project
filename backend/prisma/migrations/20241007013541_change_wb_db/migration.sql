/*
  Warnings:

  - You are about to drop the `galeri` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `galeri` to the `WarisanBudaya` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `galeri` DROP FOREIGN KEY `Galeri_warisanBudayaId_fkey`;

-- AlterTable
ALTER TABLE `warisanbudaya` ADD COLUMN `galeri` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `galeri`;
