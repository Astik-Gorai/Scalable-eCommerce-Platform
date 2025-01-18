import { BadRequestException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { LoginUserCommand } from "src/user/models/commands/login-user-command";
import { UserSchemaName } from "src/user/models/schemas/user.schema";
import { UserModel } from "src/user/models/user.model";

@Injectable()
@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
    constructor(
        @InjectModel(UserSchemaName)
        private userService: Model<UserModel>
    ) {}

    async execute(command: LoginUserCommand): Promise<any> {
        const { email, password } = command;

        // Find user by email
        const existingUser = await this.userService.findOne({ email: email });
        if (!existingUser) {
            throw new BadRequestException(`${email} does not exist. Please register first.`);
        }

        // Compare hashed password with the provided password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            Logger.log("Incorrect Password");
            throw new BadRequestException("Invalid credentials. Please try again.");
        }

        Logger.log("Logged in successfully");
        return HttpStatus.ACCEPTED;
    }
}
