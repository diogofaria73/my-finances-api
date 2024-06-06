import { PrismaService } from "@/infra/database/service/prisma.service";
import { Body, Controller, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { z } from "zod";

const authBodySchema = z.object({
   email: z.string().email(),
   password: z.string().min(6),
})

type AuthBodySchema = z.infer<typeof authBodySchema>

@Controller('/session')
export class AuthController {
   constructor(private jwt: JwtService, private prisma: PrismaService) {}

   async handle(@Body() body: AuthBodySchema) {
      const { email, password } = body;

      const user = await this.prisma.user.findUnique({
         where:{
            email
         }
      })

      if (!user)
         throw new UnauthorizedException('User credentials do not match')

      const isPasswordValid = await compare(password, user.password)

      if(!isPasswordValid)
         throw new UnauthorizedException('User credentials do not match')

      const accessToken = this.jwt.sign({ sub: user })

      return { access_token: accessToken }

   }
}