import fastify from "fastify";
import { orgRoutes } from "./http/controllers/org/routes";
import fastifyJwt from "@fastify/jwt";
import { petsRoutes } from "./http/controllers/pets/routes";



export const app = fastify();
app.register(fastifyJwt, {
    secret: 'secretPassword'
})
app.get('/', () => {
    return 'hello world'
})

app.register(orgRoutes)
app.register(petsRoutes)
app.setErrorHandler((error, _, reply) => {
    if(error instanceof Error){
        return reply.status(400).send({
            message: error.message
        })
    }
    return reply.status(500).send()
})