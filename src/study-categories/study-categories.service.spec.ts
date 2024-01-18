import { Test, TestingModule } from '@nestjs/testing';
import { StudyCategoriesService } from './study-categories.service';

describe('StudyCategoriesService', () => {
  let service: StudyCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyCategoriesService],
    }).compile();

    service = module.get<StudyCategoriesService>(StudyCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
