import fastify from "fastify"
import cors from '@fastify/cors'
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";

import { createUser } from "./routes/user/create-user";
import { env } from "./env";
import { userDetails } from "./routes/user/get-user";
import { userLogin } from "./routes/user/get-user-login";

const app = fastify()

app.register(cors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createUser)
app.register(userLogin)
app.register(userDetails)

app.listen({port: env.PORT}).then(() => {
    console.log('Server running!')
})