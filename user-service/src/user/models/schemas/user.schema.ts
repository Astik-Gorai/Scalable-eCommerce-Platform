import { Schema } from "mongoose";

export const UserSchemaName = 'MyUser';

export const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }

},{
  collection: 'users',
  timestamps:true  
})