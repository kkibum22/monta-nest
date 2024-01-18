import { Module, forwardRef } from '@nestjs/common';
import { StudyCategoriesService } from './study-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyCategory } from './entities/study-category.entity';
import { MembersModule } from '@src/members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudyCategory]),
    forwardRef(() => MembersModule),
  ],
  providers: [StudyCategoriesService],
  exports: [StudyCategoriesService],
})
export class StudyCategoriesModule {}
