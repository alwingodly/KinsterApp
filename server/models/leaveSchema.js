import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminPass', 
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  fromDate:{
    type: Date,
    required: true,
  },
  toDate:{
    type: Date,
    required: true,
  },
  Approved:{
    type: Boolean,
    default: false
  },
  
}, {timestamps: true});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
