import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma"
import { ClientError } from "../../errors/client-error"

export async function userDetails(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get(
        '/user/:userId', 
        {
            schema: {
                params: z.object({
                    userId: z.string().uuid()
                })
            }
        },   
        async(req) => {
            const {userId} = req.params

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    password: true,
                }
            })

            if (!user) throw new ClientError('not find user') 
            
            return {user}
        }
    )
}