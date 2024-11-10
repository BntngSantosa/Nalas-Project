/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `WarisanBudaya` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `WarisanBudaya_authorId_key` ON `WarisanBudaya`(`authorId`);
