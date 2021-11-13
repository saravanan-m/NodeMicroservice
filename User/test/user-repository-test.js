process.env.NODE_ENV = 'test';

const userRepositorie = require('../repositories/UserRepository');
var { expect } = require('chai');
const sinon = require('sinon');
const { user } = require('../models');
const { UserDto } = require('../dto/UserDto');
const { v4: uuidv4 } = require('uuid')
const server = require('../index')

describe('#isUserExist()', function () {

    context('user exist in database', function () {
        it('should return true', async function () {

            const userName = 'test-user'+new Date().getTime();
            const userDto = new UserDto(userName,1);
            userDto.mapper_id = uuidv4();
            await userRepositorie.create(userDto)

            const status = await userRepositorie.isUserExist(userName);

            expect(status)
                .to.be.a('boolean')
                .and.equal(true);
        })

    })

   context('user does not exist in database', function () {
        it('should return false', async function () {
            const userName = 'test-user'+new Date().getTime();
            const status = await userRepositorie.isUserExist(userName);
            expect(status)
                .to.be.a('boolean')
                .and.equal(false);
        })

    })

})

describe('#create()', function () {

    context('create user in database', function () {
        it('should return user dto', async function () {
            const generatedUuid = uuidv4();
            const userName = 'test-user'+new Date().getTime();

            const userDto = new UserDto(userName,12);
            userDto.mapper_id = generatedUuid;

            const status = await userRepositorie.create(userDto);

            expect(status).have.property('id').and.to.be.a('number')
            expect(status).have.property('name').eql(userName)
            expect(status).have.property('age').eql(12)
            expect(status).have.property('mapper_id').eql(generatedUuid)  
        })

    })
})