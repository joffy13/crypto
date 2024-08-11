/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_email_confirmed` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `notifications` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - Added the required column `hashed_info` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar",
DROP COLUMN "created_at",
DROP COLUMN "deleted",
DROP COLUMN "email",
DROP COLUMN "is_email_confirmed",
DROP COLUMN "notifications",
DROP COLUMN "password",
ADD COLUMN     "hashed_info" TEXT NOT NULL,
ALTER COLUMN "username" SET DATA TYPE TEXT;
