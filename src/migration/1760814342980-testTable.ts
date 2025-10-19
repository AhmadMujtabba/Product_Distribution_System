import { MigrationInterface, QueryRunner } from "typeorm";

export class TestTable1760814342980 implements MigrationInterface {
    name = 'TestTable1760814342980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "retailers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mobile" integer NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, CONSTRAINT "PK_1228653999402b52e75d40b1c66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unit_price" integer NOT NULL, "company" character varying NOT NULL, "stock" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" SERIAL NOT NULL, "unit_price" integer NOT NULL, "quantity" integer NOT NULL, "total_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "order" integer, "product" integer, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "order_date" TIMESTAMP NOT NULL, "order_status" "public"."orders_order_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "order_by" integer, "retailer_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'staff', "password" character varying NOT NULL, "mobile" integer NOT NULL, "otp" integer, "otp_expiry" TIMESTAMP, "verification_status" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "retailers" ADD CONSTRAINT "FK_94e21b16fc4456ed47fd94b35f0" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_7d67f6c4765788dddc0fe7f97f4" FOREIGN KEY ("order") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_9b7e6a447307eb01b4275ee4cc3" FOREIGN KEY ("product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_adf0c012c382f2edb61cd9bb3fa" FOREIGN KEY ("order_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2a0e2e8eaaa58728ff87892acc3" FOREIGN KEY ("retailer_id") REFERENCES "retailers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2a0e2e8eaaa58728ff87892acc3"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_adf0c012c382f2edb61cd9bb3fa"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_9b7e6a447307eb01b4275ee4cc3"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_7d67f6c4765788dddc0fe7f97f4"`);
        await queryRunner.query(`ALTER TABLE "retailers" DROP CONSTRAINT "FK_94e21b16fc4456ed47fd94b35f0"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "retailers"`);
    }

}
