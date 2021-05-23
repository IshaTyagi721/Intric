const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')
const { json } = require('body-parser')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'asd',
        email: 'asd@examplfse.com',
        password: 'abs@123'
    }).expect(201)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'asd',
            email: 'asd@examplfse.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('abs@123')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email : userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'WrongPassword'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})
test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Jess'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Jess')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Philadelphia'
        })
        .expect(400)
})
