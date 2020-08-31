import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface BalanceProps {
  income: number;
  outcome: number;
  total: number;
}


@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const balance = new Balance ({
      income:0,
      outcome:0,
      total:0
    })

    const transactions = await this.find();

    const balanceReduce = transactions.reduce((accumulador : BalanceProps, transaction: Transaction) => {
      let income = 0;
      let outcome = 0;

      switch(transaction.type){
        case "income":
         income = accumulador.income + transaction.value;
          break;

        case "outcome":
         outcome = accumulador.outcome + transaction.value;
       break;

        default:
          break;
      }

      return {
        
        income,
        outcome,
        total: income - outcome
      }
    }, balance);

    return balanceReduce;
  }
}

export default TransactionsRepository;
