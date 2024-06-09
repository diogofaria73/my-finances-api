import { Controller, Put } from "@nestjs/common";

@Controller('products')
export class UpdateProductController {
   
   @Put('update')
   async handle() {
      return null;
   }
}