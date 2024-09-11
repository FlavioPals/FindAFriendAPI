import { describe, expect, it, test } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import {InvalidCredentialsError} from '../errors/invalid-credentials-error'
import { beforeEach } from "vitest";

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase


describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })


    it('should be to authenticate', async () => {
         await usersRepository.create({
             name: 'John Doe',
             email: 'QpNkS@example.com',
             password: await hash('123456', 2)
         })

         const {user} = await sut.execute({
             email: 'QpNkS@example.com',
             password: '123456'
         })
     expect(user.id).toEqual(expect.any(String))
       
    })
    it('should not be able to authenticate whif email is invalid', async () => {
         await expect(() => 
             sut.execute({
                email: 'QpNkS@example.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    it('should not be able to authenticate whif wrong password', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'QpNkS@example.com',
            password: await hash('123456', 2)
        })

         await expect(() => 
             sut.execute({
                email: 'QpNkS@example.com',
                password: '123'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})