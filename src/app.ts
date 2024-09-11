import fastify from "fastify";
import { appRoutes } from "./http/routes";



export const app = fastify();

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
    if(error instanceof Error){
        return reply.status(400).send({
            message: error.message
        })
    }
    return reply.status(500).send()
})