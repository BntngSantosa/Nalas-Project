/*
  Warnings:

  - You are about to drop the column `galeri` on the `warisanbudaya` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `warisanbudaya` DROP COLUMN `galeri`;

-- CreateTable
CREATE TABLE `Galeri` (
    `id` VARCHAR(191) NOT NULL,
    `warisanBudayaId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Galeri_warisanBudayaId_key`(`warisanBudayaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Galeri` ADD CONSTRAINT `Galeri_warisanBudayaId_fkey` FOREIGN KEY (`warisanBudayaId`) REFERENCES `WarisanBudaya`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
