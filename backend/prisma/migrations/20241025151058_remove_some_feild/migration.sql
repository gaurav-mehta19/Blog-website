/*
  Warnings:

  - You are about to drop the column `isHidden` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "isHidden",
DROP COLUMN "published";
