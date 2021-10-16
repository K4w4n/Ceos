import { Operation, connection } from "../../src/models/conectionMysql";

describe('async jest com mysql2', () => {
    it('testando jest', async () => {
        expect(0).toBe(0);
        await connection.end();
    });
});

describe('Operation', () => {
    describe('equal', () => {
        it('user_email = ?', () => expect(new Operation().column('user_email').equal.value('kawan@gmail.com').toString()).toBe('user_email = ?'));
        it('? = user_email', () => expect(new Operation().value('kawan@gmail.com').equal.column('user_email').toString()).toBe('? = user_email'));
        it('? = ?', () => expect(new Operation().value('kawan@gmail.com').equal.value('kawan@gmail.com').toString()).toBe('? = ?'));
        it('user_email = user_email', () => expect(new Operation().column('user_email').equal.column('user_email').toString()).toBe('user_email = user_email'));
    });
    describe('lesser', () => {
        it('user_idade < ?', () => expect(new Operation().column('user_idade').lesser.value(18).toString()).toBe('user_idade < ?'));
        it('? < user_idade', () => expect(new Operation().value(18).lesser.column('user_idade').toString()).toBe('? < user_idade'));
        it('? < ?', () => expect(new Operation().value(5).lesser.value(18).toString()).toBe('? < ?'));
        it('user_idade < user_maioridade', () => expect(new Operation().column('user_idade').lesser.column('user_maioridade').toString()).toBe('user_idade < user_maioridade'));
    });
    describe('lesser equal', () => {
        it('user_idade <= ?', () => expect(new Operation().column('user_idade').lesserEqual.value(18).toString()).toBe('user_idade <= ?'));
        it('? <= user_idade', () => expect(new Operation().value(18).lesserEqual.column('user_idade').toString()).toBe('? <= user_idade'));
        it('? <= ?', () => expect(new Operation().value(5).lesserEqual.value(18).toString()).toBe('? <= ?'));
        it('user_idade <= user_maioridade', () => expect(new Operation().column('user_idade').lesserEqual.column('user_maioridade').toString()).toBe('user_idade <= user_maioridade'));
    });
    describe('greater', () => {
        it('user_idade > ?', () => expect(new Operation().column('user_idade').greater.value(18).toString()).toBe('user_idade > ?'));
        it('? > user_idade', () => expect(new Operation().value(18).greater.column('user_idade').toString()).toBe('? > user_idade'));
        it('? > ?', () => expect(new Operation().value(18).greater.value(5).toString()).toBe('? > ?'));
        it('user_idade > user_maioridade', () => expect(new Operation().column('user_idade').greater.column('user_maioridade').toString()).toBe('user_idade > user_maioridade'));
    });
    describe('greater equal', () => {
        it('user_idade >= ?', () => expect(new Operation().column('user_idade').greaterEqual.value(18).toString()).toBe('user_idade >= ?'));
        it('? >= user_idade', () => expect(new Operation().value(18).greaterEqual.column('user_idade').toString()).toBe('? >= user_idade'));
        it('? >= ?', () => expect(new Operation().value(5).greaterEqual.value(18).toString()).toBe('? >= ?'));
        it('user_idade >= user_maioridade', () => expect(new Operation().column('user_idade').greaterEqual.column('user_maioridade').toString()).toBe('user_idade >= user_maioridade'));
    });
    describe('different', () => {
        it('user_idade != ?', () => expect(new Operation().column('user_idade').different.value(18).toString()).toBe('user_idade != ?'));
        it('? != user_idade', () => expect(new Operation().value(18).different.column('user_idade').toString()).toBe('? != user_idade'));
        it('? != ?', () => expect(new Operation().value(5).different.value(18).toString()).toBe('? != ?'));
        it('user_idade != user_maioridade', () => expect(new Operation().column('user_idade').different.column('user_maioridade').toString()).toBe('user_idade != user_maioridade'));
    });
    describe('and', () => {
        it('user_idade > ? AND user_name != ?', () => expect(new Operation().column('user_idade').greater.value(18).and.column('user_name').different.value('kawan').toString()).toBe('user_idade > ? AND user_name != ?'));
        it('user_idade >= ? AND user_name != ?', () => expect(new Operation().column('user_idade').greaterEqual.value(18).and.column('user_name').different.value('kawan').toString()).toBe('user_idade >= ? AND user_name != ?'));
        it('user_idade < ? AND user_name = ?', () => expect(new Operation().column('user_idade').lesser.value(18).and.column('user_name').equal.value('kawan').toString()).toBe('user_idade < ? AND user_name = ?'));
        it('user_idade <= ? AND user_name = ?', () => expect(new Operation().column('user_idade').lesserEqual.value(18).and.column('user_name').equal.value('kawan').toString()).toBe('user_idade <= ? AND user_name = ?'));
    });
    describe('or', () => {
        it('user_idade > ? OR user_name != ?', () => expect(new Operation().column('user_idade').greater.value(18).or.column('user_name').different.value('kawan').toString()).toBe('user_idade > ? OR user_name != ?'));
        it('user_idade >= ? OR user_name != ?', () => expect(new Operation().column('user_idade').greaterEqual.value(18).or.column('user_name').different.value('kawan').toString()).toBe('user_idade >= ? OR user_name != ?'));
        it('user_idade < ? OR user_name = ?', () => expect(new Operation().column('user_idade').lesser.value(18).or.column('user_name').equal.value('kawan').toString()).toBe('user_idade < ? OR user_name = ?'));
        it('user_idade <= ? OR user_name = ?', () => expect(new Operation().column('user_idade').lesserEqual.value(18).or.column('user_name').equal.value('kawan').toString()).toBe('user_idade <= ? OR user_name = ?'));
    });
});

describe('Insert', () => {
    
});
describe('Delete', () => {

});
describe('Update', () => {

});
describe('Select', () => {

});