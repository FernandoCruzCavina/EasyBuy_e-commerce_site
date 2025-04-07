import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma"
import { ClientError } from "../../errors/client-error"

export async function profile(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get(
        '/profile/:profileId', 
        {
            schema: {
                params: z.object({
                    userId: z.string().uuid()
                })
            }
        },   
    async(req) => {
        const {userId} = req.params

        const profile = await prisma.profile.findUnique({
            where: {
                userId: userId
            },
            select: {
                id: true,
                avatar: true,
                background: true,
            }
        })

        if (!profile) throw new ClientError('not find profile') 

        return {profile}
    })
}