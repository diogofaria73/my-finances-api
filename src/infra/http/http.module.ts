import { Module } from "@nestjs/common";
import { CreateProductController } from "./controllers/product/create-product.controller";
import { ListProductsController } from "./controllers/product/list-products.controller";
import { PrismaService } from "../database/service/prisma.service";

@Module({
      imports: [],
      controllers: [CreateProductController, ListProductsController],
      providers: [PrismaService]
})

export class  HttpModule {
}