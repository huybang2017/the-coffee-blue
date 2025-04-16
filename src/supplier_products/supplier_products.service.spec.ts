import { Test, TestingModule } from '@nestjs/testing';
import { SupplierProductsService } from './supplier_products.service';

describe('SupplierProductsService', () => {
  let service: SupplierProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierProductsService],
    }).compile();

    service = module.get<SupplierProductsService>(SupplierProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
