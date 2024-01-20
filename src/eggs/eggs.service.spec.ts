import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { EggsService } from './eggs.service';
import { Egg } from './entities/egg.entity';
import { CreateEggDto } from './dto/create-egg.dto';
import { UpdateEggDto } from './dto/update-egg.dto';

// Egg 엔티티를 위한 모의 데이터
const mockEgg: Egg = {
  egg_id: '1',
  name: 'EggName',
  description: 'EggDescription',
  required_study_time: 100,
  purchase_price: 500,
  image_url: 'http://example.com/image.jpg',
  grade: 'A',
  egg_inventories: [],
  created_at: new Date(),
  updated_at: new Date(),
};

describe('EggsService', () => {
  let service: EggsService;
  let repo: Repository<Egg>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EggsService,
        {
          provide: getRepositoryToken(Egg),
          useValue: {
            find: jest.fn().mockResolvedValue([mockEgg]),
            findOne: jest.fn().mockResolvedValue(mockEgg),
            create: jest.fn().mockReturnValue(mockEgg),
            save: jest.fn().mockResolvedValue(mockEgg),
            update: jest.fn().mockResolvedValue(new UpdateResult()),
            delete: jest.fn().mockResolvedValue(new DeleteResult()),
          },
        },
      ],
    }).compile();

    service = module.get<EggsService>(EggsService);
    repo = module.get<Repository<Egg>>(getRepositoryToken(Egg));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of eggs', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockEgg]);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single egg', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockEgg);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { egg_id: '1' },
        relations: ['egg_inventories'],
      });
    });

    it('should throw NotFoundException if egg is not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('unknown_id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create and return the egg', async () => {
      const createEggData: CreateEggDto = {
        name: 'EggNew',
        description: 'New Egg Description',
        required_study_time: 120,
        purchase_price: 300,
        image_url: 'http://example.com/new_egg_image.jpg',
        grade: 'B',
      };
      const newEgg = {
        egg_id: 'new_id',
        ...createEggData,
        created_at: new Date(),
        updated_at: new Date(),
        egg_inventories: [],
      };

      jest.spyOn(repo, 'create').mockReturnValue(newEgg);
      jest.spyOn(repo, 'save').mockResolvedValue(newEgg);

      const result = await service.create(createEggData);
      expect(result).toEqual(newEgg);
      expect(repo.create).toHaveBeenCalledWith(createEggData);
      expect(repo.save).toHaveBeenCalledWith(newEgg);
    });
  });

  describe('update', () => {
    it('should update and return the egg', async () => {
      const updateEggData: Partial<UpdateEggDto> = {
        name: 'EggUpdated',
        description: 'Updated Egg Description',
        required_study_time: 150,
        purchase_price: 400,
        image_url: 'http://example.com/updated_egg_image.jpg',
        grade: 'B',
      };
      const updatedEgg = { ...mockEgg, ...updateEggData };

      jest.spyOn(repo, 'update').mockResolvedValue({
        generatedMaps: [],
        raw: [],
        affected: 1,
      });
      jest.spyOn(repo, 'findOne').mockResolvedValue(updatedEgg);

      const result = await service.update('1', updateEggData as UpdateEggDto);
      expect(result).toEqual(updatedEgg);
      expect(repo.update).toHaveBeenCalledWith(
        '1',
        updateEggData as UpdateEggDto,
      );
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { egg_id: '1' },
        relations: ['egg_inventories'],
      });
    });

    it('should throw NotFoundException if egg is not found for update', async () => {
      jest.spyOn(repo, 'update').mockResolvedValue({
        generatedMaps: [],
        raw: [],
        affected: 0,
      });

      const updateEggData: Partial<UpdateEggDto> = {
        name: 'Nonexistent Egg',
      };

      await expect(
        service.update('unknown_id', updateEggData as UpdateEggDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete the egg', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue({
        affected: 1,
        raw: [],
      });
      await service.delete('1');
      expect(repo.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if egg is not found for delete', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue({
        affected: 0,
        raw: [],
      });
      await expect(service.delete('unknown_id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
