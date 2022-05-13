import { createUser, getUserByUsername, removeUser } from '../services/users'
import { randomBytes } from 'crypto'
import { expect } from 'chai'


describe('User service', function () {
    const randomUsername = randomBytes(10).toString('base64')

    it('should create a user', async function () {
        const user = await createUser({
            username: randomUsername,
            password: randomUsername
        })
        expect(user).to.be.an('object')
        expect(user).to.have.keys(['username', 'id', 'password'])
        expect(user?.password).to.be.undefined
    })

    it('should get a user by username', async function () {
        const user = await getUserByUsername(randomUsername)
        expect(user).to.be.an('object')
        expect(user).to.have.all.keys(['username', 'id', 'password'])
    })

    it('should remove a user', async function () {
        const removed = await removeUser(randomUsername)
        expect(removed).to.be.true
    })
})