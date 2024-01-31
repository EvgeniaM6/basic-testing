import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const initialBalance = 50;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const createdBankAccount = getBankAccount(initialBalance);
    expect(createdBankAccount).toBeInstanceOf(BankAccount);
    expect(createdBankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawMoreThanBalance = () =>
      getBankAccount(initialBalance).withdraw(100);

    expect(withdrawMoreThanBalance).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const firstBankAccount = getBankAccount(initialBalance);
    const secondBankAccount = getBankAccount(initialBalance);

    const transferMoreThanBalance = () =>
      firstBankAccount.transfer(100, secondBankAccount);

    expect(transferMoreThanBalance).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const singleBankAccount = getBankAccount(initialBalance);

    const transferToTheSameAccount = () =>
      singleBankAccount.transfer(20, singleBankAccount);

    expect(transferToTheSameAccount).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositMoney = 20;
    const balanceAfterDeposit = getBankAccount(initialBalance)
      .deposit(depositMoney)
      .getBalance();

    expect(balanceAfterDeposit).toBe(initialBalance + depositMoney);
  });

  test('should withdraw money', () => {
    const withdrawMoney = 20;
    const balanceAfterWithdraw = getBankAccount(initialBalance)
      .withdraw(withdrawMoney)
      .getBalance();

    expect(balanceAfterWithdraw).toBe(initialBalance - withdrawMoney);
  });

  test('should transfer money', () => {
    const transferMoney = 20;
    const firstBankAccount = getBankAccount(initialBalance);
    const secondBankAccount = getBankAccount(initialBalance).transfer(
      transferMoney,
      firstBankAccount,
    );

    const firstBalanceAfterTransfer = firstBankAccount.getBalance();
    const secondBalanceAfterTransfer = secondBankAccount.getBalance();

    expect(firstBalanceAfterTransfer).toBe(initialBalance + transferMoney);
    expect(secondBalanceAfterTransfer).toBe(initialBalance - transferMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const createdBankAccount = getBankAccount(initialBalance);
    const fetchBalance = async (): Promise<number | null> => {
      const balance = await createdBankAccount.fetchBalance();

      if (balance === null) {
        return fetchBalance();
      }

      return balance;
    };

    const balance = await fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const createdBankAccount = getBankAccount(initialBalance);
    const synchronizeBalance = async (): Promise<void> => {
      try {
        await createdBankAccount.synchronizeBalance();
      } catch (error) {
        await synchronizeBalance();
      }
    };
    await synchronizeBalance();

    const balance = createdBankAccount.getBalance();
    expect(balance).not.toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const createdBankAccount = getBankAccount(initialBalance);
    const synchronizeBalance = async (): Promise<void> => {
      await createdBankAccount.synchronizeBalance();
      await synchronizeBalance();
    };

    expect(synchronizeBalance).rejects.toThrow(SynchronizationFailedError);
  });
});
