import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma"

export function createMerchant(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post('/merchants', {
        schema: {
            body: z.object({
                name: z.string().min(2),
                phone: z.string(),
                email: z.string().email(),
                password: z.string(),
                cpf: z.string()
            })
        }
    }, async (req) => {
        const {name, phone, email, password, cpf} = req.body
        try {
            const result = await prisma.$transaction(async (prisma) => {
                const user = await prisma.user.create({
                    data: {
                        name,
                        phone,
                        email,
                        password,
                    }
                })

                const merchant = await prisma.merchant.create({
                    data: {
                        cpf,
                        userId: user.id
                    }
                })

                return { merchantId: merchant.id }
            })

            
        } catch (error) {
            console.error(error)
        }

    }

    )
}