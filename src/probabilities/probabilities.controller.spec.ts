import { Test, TestingModule } from '@nestjs/testing';
import { ProbabilitiesController } from './probabilities.controller';
import { ProbabilitiesService } from './probabilities.service';

describe('ProbabilitiesController', () => {
  let controller: ProbabilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProbabilitiesController],
      providers: [ProbabilitiesService],
    }).compile();

    controller = module.get<ProbabilitiesController>(ProbabilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
