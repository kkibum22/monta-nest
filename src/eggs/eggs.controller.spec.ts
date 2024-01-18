import { Test, TestingModule } from '@nestjs/testing';
import { EggsController } from './eggs.controller';
import { EggsService } from './eggs.service';

describe('EggsController', () => {
  let controller: EggsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EggsController],
      providers: [EggsService],
    }).compile();

    controller = module.get<EggsController>(EggsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
