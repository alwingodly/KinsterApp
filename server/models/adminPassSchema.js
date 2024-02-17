import mongoose from "mongoose";

const AdminPassSchema = new mongoose.Schema({
  allowedUsers: [
    {
      employeeID: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      name:{
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      tasks: [
        {
          task: {
            type: String,
          },
          status: {
            type: String,
            default: "Pending", 
          },
          createdAt:{
            type:String,
          },
          finishedAt:{
            type:String,
          }
        },
      ],
    },
  ],
}, { timestamps: true });

const AdminPass = mongoose.model("AdminPass", AdminPassSchema);

export default AdminPass;
