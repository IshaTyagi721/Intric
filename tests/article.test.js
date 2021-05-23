const request = require('supertest')
const app = require('../src/app')
const Article = require('../src/models/article')

const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    articleOne,
    articleTwo,
    articleThree,
    setupDatabase,
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create article for user', async () => {
    const response = await request(app)
        .post('/articles')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            Content: 'From my test',
        })
        .expect(201)
    const article = await Article.findById(response.body._id)
    expect(article).not.toBeNull()
    expect(article.Completed).toEqual(false)
})

test('Should fetch user articles', async () => {
    const response = await request(app)
        .get('/articles')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users articles', async () => {
    const response = await request(app)
        .delete(`/articles/${articleOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const article = await Article.findById(articleOne._id)
    expect(article).not.toBeNull()
})