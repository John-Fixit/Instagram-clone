const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
      },
      msgType: {
        type: String
      }
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const messageModel = mongoose.model('messages_tb', messageSchema)

module.exports = {messageModel}
