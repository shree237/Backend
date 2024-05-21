import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        uname: { type: String},
        email: { type: String},
        password: { type: String}
    },
    {
        timestamps:true
    }
)

export default mongoose.model('User',UserSchema)


