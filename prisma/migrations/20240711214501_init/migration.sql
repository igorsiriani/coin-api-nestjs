/*
  Warnings:

  - Added the required column `name` to the `Coin` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wallet_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Coin_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coin" ("id", "wallet_id") SELECT "id", "wallet_id" FROM "Coin";
DROP TABLE "Coin";
ALTER TABLE "new_Coin" RENAME TO "Coin";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
