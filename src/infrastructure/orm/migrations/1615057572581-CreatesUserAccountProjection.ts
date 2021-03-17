import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatesUserAccountProjection1615057572581 implements MigrationInterface {
  name = 'CreatesUserAccountProjection1615057572581'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aggregate_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_account"`)
  }
}
