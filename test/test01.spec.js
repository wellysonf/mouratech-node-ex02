import { beforeAll, expect, test } from "vitest";
import request from 'supertest';
import { app } from "../src/app";

beforeAll(async() =>{
   await app.ready();
});

test('Testar o código de retorno', async () =>{
    await request(app.server)
            .post('/')
            .send({
                "name":"teste 01",
                "email": "email@teste.com"
            }).expect(201);
/* 
    const codigo = 500;
    expect(codigo).toEqual(200); */
})