import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';



import { getCustomRepository} from 'typeorm'

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)
  const transactions = await transactionsRepository.getBalance()

  return response.json({transactions});
  
});

transactionsRouter.post('/', async (request, response) => {
  const {title, category, value, type} = request.body
  
  const createTransactionService = new CreateTransactionService();

  const transaction = createTransactionService.execute({
    title,
    category,
    value,
    type,
  })

  return response.json({transaction});
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
