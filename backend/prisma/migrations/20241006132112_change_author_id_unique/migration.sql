/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Event_authorId_key` ON `Event`(`authorId`);
