-- CreateTable
CREATE TABLE "_JubenToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_JubenToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Juben" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JubenToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_JubenToUser_AB_unique" ON "_JubenToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_JubenToUser_B_index" ON "_JubenToUser"("B");
