import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma"

export async function createUser(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post(
        '/users', 
        {
            schema: {
                body: z.object({
                    name: z.string().min(2),
                    phone: z.string(),
                    email: z.string(),
                    password: z.string(),
                })
            }
        },   
    async(req) => {
        const {name, phone, email, password} = req.body

        const user = await prisma.user.create({
            data: {
                name,
                phone,
                email,
                password,
                profile: {
                    create: {}
                }
            }
        })

        if (!user) return 'error: not was possible create user' 

        return {userId: user.id}
    })
}