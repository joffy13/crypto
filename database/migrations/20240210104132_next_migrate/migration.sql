/*
  Warnings:

  - You are about to drop the column `coin_cdn_url` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `exchange_max` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `exchange_min` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Currency` table. All the data in the column will be lost.
  - Added the required column `constant_id` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "coin_cdn_url",
DROP COLUMN "exchange_max",
DROP COLUMN "exchange_min",
DROP COLUMN "name",
DROP COLUMN "symbol",
DROP COLUMN "type",
DROP COLUMN "uuid",
ADD COLUMN     "constant_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "CurrencyConstant" (
    "id" UUID NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "exchange_min" INTEGER NOT NULL,
    "exchange_max" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "coin_cdn_url" TEXT NOT NULL,

    CONSTRAINT "CurrencyConstant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_constant_id_fkey" FOREIGN KEY ("constant_id") REFERENCES "CurrencyConstant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
