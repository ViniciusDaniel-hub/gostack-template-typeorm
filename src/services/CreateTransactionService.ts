// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';

interface Request {
  title:string,
  category:string,
    value:number,
  type: "outcome | income";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  // constructor(transactionsRepository: TransactionsRepository){
  //   this.transactionsRepository = transactionsRepository;
  // }
  public async execute({
    title,
      value,
      category,
       type,
      }: Request): Promise<Transaction> {
      
      const transactionsRepository = getCustomRepository(TransactionsRepository)

      const transaction =  transactionsRepository.create({
        title,
        value,
        category,
        type
      });
      // const transaction = this.TransactionsRepository.create({
      //   title,
      //   value,
      //   category,
      //   type,
      // });

       return transaction;

    }
}

export default CreateTransactionService;
