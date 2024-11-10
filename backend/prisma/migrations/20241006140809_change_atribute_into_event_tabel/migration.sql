/*
  Warnings:

  - You are about to drop the column `category` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `galeri` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `kabupaten` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `kecamatan` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `event` table. All the data in the column will be lost.
  - Added the required column `call` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `category`,
    DROP COLUMN `galeri`,
    DROP COLUMN `kabupaten`,
    DROP COLUMN `kecamatan`,
    DROP COLUMN `type`,
    DROP COLUMN `youtube`,
    ADD COLUMN `call` INTEGER NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
