import { Module } from '@nestjs/common';
import { MeetController } from './meet.controller';
import { MeetService } from './meet.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Meet, MeetSchema } from './schemas/meet.schema';
import { MeetObjectSchema, MettObject } from './schemas/meetobject.schemas';

@Module({
  imports :[UserModule, MongooseModule.forFeature([
    {name: Meet.name, schema: MeetSchema},
    {name: MettObject.name, schema: MeetObjectSchema}

  ])],
  controllers: [MeetController],
  providers: [MeetService],
  exports: [MongooseModule, MeetService]
})
export class MeetModule {}
