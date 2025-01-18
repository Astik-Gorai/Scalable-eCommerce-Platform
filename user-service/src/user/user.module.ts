import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaName } from './models/schemas/user.schema';
import { LoginUserCommandHandler } from './providers/command-handlers/login-user-command-handler';
import { RegisterUserCommandHandler } from './providers/command-handlers/register-user-command-handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSchemaName,
        schema: UserSchema
      }
    ]),
    CqrsModule
  ],
  controllers: [UserController],
  providers: [LoginUserCommandHandler,RegisterUserCommandHandler]
})
export class UserModule {}
