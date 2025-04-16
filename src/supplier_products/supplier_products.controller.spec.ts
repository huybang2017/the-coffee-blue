import { Test, TestingModule } from '@nestjs/testing';
import { SupplierProductsController } from './supplier_products.controller';
import { SupplierProductsService } from './supplier_products.service';

describe('SupplierProductsController', () => {
  let controller: SupplierProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierProductsController],
      providers: [SupplierProductsService],
    }).compile();

    controller = module.get<SupplierProductsController>(SupplierProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
