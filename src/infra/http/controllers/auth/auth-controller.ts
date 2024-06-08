import { PrismaService } from "@/infra/database/service/prisma.service";
import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { z } from 'zod'
import { ZodValidationPipe } from "../../pipes/validations/zod-validation-pipe";


const authenticateBodySchema = z.object({
   email: z.string().email(),
   password: z.string().min(6).max(255)
})

type AuthenticateBody = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthController{

   constructor(private jwt: JwtService, private prisma: PrismaService){}

   @Post('/create')
   @UsePipes(new ZodValidationPipe(authenticateBodySchema))
   async handle(@Body() body: AuthenticateBody){

      const { email, password } = body

      const user = await this.prisma.user.findFirst({
         where:{
            email
         }
      })

      if (!user){
         throw new UnauthorizedException('User credentials do not match')
      }

      const isPasswordMatch = await compare(password, user.password)

      if(!isPasswordMatch){
         throw new UnauthorizedException('User credentials do not match')
      }

      const accessToken = this.jwt.sign({
         sub: user
      })

      return {
         access_token: accessToken
      }

   }
}