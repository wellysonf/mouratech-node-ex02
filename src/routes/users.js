import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database.js'

export async function usersRoutes(app) {
    app.get('/', async (req, res) =>{
        const data = await knex('users').select();
        return data
    });
    app.get('/:id', async (req, res) =>{
        const getUserIdParams = z.object({
            id: z.string().uuid(),
        })
        const { id } = getUserIdParams.parse(req.params);
        const user = await knex('users')
                .where('id', id)
                .first()

            return {
                user,
            }
    })
    app.post('/',async (req, res) =>{
        const getUserParams = z.object({
            name: z.string(),
            email: z.string().email()
        });
        const {name, email} = getUserParams.parse(req.body);
        const data = await knex('users').insert({
            id: randomUUID(),
            name,
            email
        });
        return res.status(201).send();
    });
}
