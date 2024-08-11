import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyTaskerController } from './currency-tasker.controller';
import { CurrencyTaskerService } from './currency-tasker.service';

describe('CurrencyTaskerController', () => {
  let currencyTaskerController: CurrencyTaskerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyTaskerController],
      providers: [CurrencyTaskerService],
    }).compile();

    currencyTaskerController = app.get<CurrencyTaskerController>(CurrencyTaskerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(currencyTaskerController.getHello()).toBe('Hello World!');
    });
  });
});
