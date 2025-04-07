import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma"
import { ClientError } from "../../errors/client-error"

export function updateProfile(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().put(
        '/profile/:userId',
        {
            schema: {
                body: z.object({
                    userId: z.string().uuid(),
                    avatar: z.any().refine((file?) => file)
                })
            }
        },
        async (req) => {
            const {userId} = req.body

            
        }
    )
}