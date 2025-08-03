-- Up Migration (Applying the migration)

CREATE TABLE users (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "RegistrationTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
    "LastLoginTime" TIMESTAMP WITH TIME ZONE NULL,
    "Status" TEXT NOT NULL,
    CONSTRAINT "PK_users" PRIMARY KEY ("Id")
);

CREATE UNIQUE INDEX "IX_users_Email" ON users ("Email");
