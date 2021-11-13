const userService = require('../services/UserService')
const userRepositorie = require('../repositories/UserRepository')
const { UserDto } = require('../dto/UserDto');
const { v4: uuidv4 } = require('uuid')
var { expect } = require('chai');
const accountService = require('../services/AccountService')
const sinon = require('sinon');

describe('#create()', function () {

    context('create user in service', function () {
        it('should return user error response', async function () {

            const userName = 'test-user'+new Date().getTime();
            const userDto = new UserDto(userName,1);
            userDto.mapper_id = uuidv4();
            await userRepositorie.create(userDto)

            const status = await userService.create(userDto);

            expect(status).have.property('code').eql('301')   
        })

    })
})

describe('#create()', function () {

    context('create user in service', function () {
        it('should return user success response', async function () {

            const accountResposne = { 'type': 'type', 'balance': 0 };
            const stub = sinon.stub(accountService, 'createAccount').returns(accountResposne);

            const userName = 'test-user'+new Date().getTime();
            const userDto = new UserDto(userName,1);
            userDto.mapper_id = uuidv4();

            const status = await userService.create(userDto);

            expect(status).have.property('code').eql('200')  
            
            stub.restore();  
        })

    })
})