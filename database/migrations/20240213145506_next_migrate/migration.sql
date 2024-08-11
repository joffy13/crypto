-- CreateTable
CREATE TABLE "CalculatedCurrencies" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "in_currency_id" UUID NOT NULL,

    CONSTRAINT "CalculatedCurrencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" UUID NOT NULL,
    "currency_percent" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CalculatedCurrencies" ADD CONSTRAINT "CalculatedCurrencies_in_currency_id_fkey" FOREIGN KEY ("in_currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
