import { describe, expect, it, test } from "vitest";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists";

describe('Register Use Case', () => {

    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new RegisterUseCase(usersRepository);
        
        const {user} =  await sut.execute({
            name: 'John Doe',
            email: 'QpNkS@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new RegisterUseCase(usersRepository);
        const {user} =  await sut.execute({
            name: 'John Doe',
            email: 'QpNkS@example2.com',
            password: '123456'
        })
        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
        expect(user.password).not.toBe('123456')
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new RegisterUseCase(usersRepository);

        await sut.execute({
            name: 'John Doe',
            email: 'QpNkS@example.com',
            password: '123456'
        })
      await expect(() => 
            sut.execute({
                name: 'John Doe',
                email: 'QpNkS@example.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})