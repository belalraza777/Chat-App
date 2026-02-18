const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['text', 'image', 'video', 'audio', 'link'],
        default: 'text',
        required: true,
    },

    content: String, // For text messages, this holds the message text. For media/link, it can hold a caption or description.
    fileUrl: String, // For media messages, this holds the URL to the uploaded file (image/video/audio). For links, it can hold a preview image URL.

}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;