import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getPets } from "./getPets";


export async function petsRoutes(app:FastifyInstance){
    app.post('/create/pet', create)
    app.get('/pets', getPets)
  
}