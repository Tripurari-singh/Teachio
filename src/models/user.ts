import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    FirstName : {
        type : String,
        reqired : true,
        trim : true
    },
     LastName : {
        type : String,
        reqired : true,
        trim : true
    },
     email : {
        type : String,
        reqired : true,
        trim : true
    },
     password : {
        type : String,
        reqired : true,
    },
    accountType : {
        type : String,
        enum : ["Admin" , "student" , "Instructor"],
        required : true
    }
})