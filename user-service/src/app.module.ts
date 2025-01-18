import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/myDatabase'),
    // MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
