import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database.js'

export async function transactionsRoutes(app) {
    app.get(
        '/',
        async () => {
            const transactions = await knex('transactions')
                .select()

            return { transactions }
        },
    )

    app.get(
        '/:id',
        async (request) => {
            const getTransactionsParamsSchema = z.object({
                id: z.string().uuid(),
            })

            const { id } = getTransactionsParamsSchema.parse(request.params)

            const transaction = await knex('transactions')
                .where('id_user', id)
                .select()

            return {
                transaction,
            }
        },
    )

    app.get(
        '/summary/:id',
        async (request) => {
            const getTransactionsParamsSchema = z.object({
                id: z.string().uuid(),
            })

            const { id } = getTransactionsParamsSchema.parse(request.params)

            const summary = await knex('transactions')
                .where('id_user', id)
                .sum('amount', { as: 'amount' })
                .first()

            return { summary }
        },
    )

    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
            id_user: z.string().uuid(),
        })

        const { title, amount, type, id_user } = createTransactionBodySchema.parse(
            request.body,
        )

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            id_user,
        })

        return reply.status(201).send()
    })
}
