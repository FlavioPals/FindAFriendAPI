import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { register } from "./register";
import { create } from "./create";

export async function orgRoutes(app:FastifyInstance){
    app.post('/register', register)
    app.post('/sessions', authenticate)
    app.post('/create/org', create)

    app.get('/me',{onRequest:[verifyJWT]} , profile)
}