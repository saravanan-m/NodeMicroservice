const accountService = require('../services/AccountService')
const accountRepositorie = require('../repositories/AccountsRepository')
const { v4: uuidv4 } = require('uuid')
var { expect } = require('chai');
const sinon = require('sinon');

describe('#createAccount()', function () {

    context('create account in service', function () {
        it('should return account', async function () {
            const generatedUuid = uuidv4();
            const accountResposne = {'data':{ 'type': 'SAVINGS', 'balance': 0 }};
            const stub = sinon.stub(accountRepositorie, 'createAccountApi').returns(accountResposne);
            const status = await accountService.createAccount(generatedUuid);

            expect(status).have.property('type').equals('SAVINGS')
            expect(status).have.property('balance').equals(0)

            stub.restore();  
        })

    })
})

describe('#createAccount()', function () {

    context('create account in service', function () {
        it('should return null', async function () {
            const generatedUuid = uuidv4();
            const stub = sinon.stub(accountRepositorie, 'createAccountApi').returns(undefined);

            const status = await accountService.createAccount(generatedUuid);
            expect(status).eql(undefined)
            stub.restore();  
        })

    })
})