import { MigrationInterface, QueryRunner } from "typeorm";

export class AddContinentColumn1684832521711 implements MigrationInterface {
    name = 'AddContinentColumn1684832521711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_country" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nom" varchar NOT NULL, "code" varchar NOT NULL, "emoji" varchar NOT NULL, "continent" varchar NOT NULL DEFAULT (''), CONSTRAINT "UQ_f2277d8ff62a7fc69b1c0f13fb8" UNIQUE ("emoji"), CONSTRAINT "UQ_8ff4c23dc9a3f3856555bd86186" UNIQUE ("code"), CONSTRAINT "UQ_4a07156d97cb9409983fdcb3755" UNIQUE ("nom"))`);
        await queryRunner.query(`INSERT INTO "temporary_country"("id", "nom", "code", "emoji") SELECT "id", "nom", "code", "emoji" FROM "country"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`ALTER TABLE "temporary_country" RENAME TO "country"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" RENAME TO "temporary_country"`);
        await queryRunner.query(`CREATE TABLE "country" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nom" varchar NOT NULL, "code" varchar NOT NULL, "emoji" varchar NOT NULL, CONSTRAINT "UQ_f2277d8ff62a7fc69b1c0f13fb8" UNIQUE ("emoji"), CONSTRAINT "UQ_8ff4c23dc9a3f3856555bd86186" UNIQUE ("code"), CONSTRAINT "UQ_4a07156d97cb9409983fdcb3755" UNIQUE ("nom"))`);
        await queryRunner.query(`INSERT INTO "country"("id", "nom", "code", "emoji") SELECT "id", "nom", "code", "emoji" FROM "temporary_country"`);
        await queryRunner.query(`DROP TABLE "temporary_country"`);
    }

}
