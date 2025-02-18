import { BadRequestException, Injectable } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GetUserProfileQuery } from "src/user/models/queries/get-user-profile.query";
import { UserSchemaName } from "src/user/models/schemas/user.schema";
import { UserModel } from "src/user/models/user.model";

@Injectable()
@QueryHandler(GetUserProfileQuery)
export class GetUserProfileHandler implements IQueryHandler<GetUserProfileQuery> {
    constructor(@InjectModel(UserSchemaName) private userService: Model<UserModel>) {}

    async execute(query: GetUserProfileQuery): Promise<any> {
        const { email } = query;
        
        // Await the query result
        const existingUser = await this.userService.findOne({ email }).exec();

        if (!existingUser) {
            throw new BadRequestException(`${email} does not exist. Please register first.`);
        }

        return existingUser;
    }
}
