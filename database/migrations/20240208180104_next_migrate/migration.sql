-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "avatar" TEXT,
    "is_email_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "notifications" JSON,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "exchange_min" INTEGER NOT NULL,
    "exchange_max" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "current_amount" INTEGER NOT NULL,
    "coin_cdn_url" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
