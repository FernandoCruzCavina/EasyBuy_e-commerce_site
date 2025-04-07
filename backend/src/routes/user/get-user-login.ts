import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {string, z} from "zod"
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";
import jwt from "jsonwebtoken"

export async function userLogin(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/users/login',
        {
            schema: {
                body: z.object({
                    email: string(),
                    password: string()
                })
            }
        },
        async(req)=>{
            const {email, password} = req.body

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    name: true,
                    email: true,
                    phone: true,
                    password: true,
                    profile: true
                }
            })

            if (!user) throw new ClientError('not find user') 
            
            if(!(password === user.password)) throw new ClientError('incorrect password')
            
            const token = jwt.sign(user,"f3rn@nd0", {expiresIn: "1h"})

            return {token}
        }
    )
    
}