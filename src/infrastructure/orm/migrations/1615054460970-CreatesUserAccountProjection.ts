import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatesUserAccountProjection1615054460970 implements MigrationInterface {
  name = 'CreatesUserAccountProjection1615054460970'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aggregateID" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_account"`)
  }
}
