const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    embedCode: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: function() {
          // Either embedCode or videoUrl must be provided
          return this.embedCode || this.videoUrl;
        },
        message: 'Either embedCode or videoUrl must be provided'
      }
    },
    platform: {
      type: String,
      enum: ['facebook', 'instagram', 'youtube'],
      default: 'facebook',
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ['fashion', 'styling', 'behind-scenes', 'customer-stories', 'tutorials'],
      default: 'fashion',
    },
    tags: [{
      type: String,
      trim: true,
    }],
    views: {
      type: Number,
      default: 0,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Make it optional like products
    },
  },
  { timestamps: true }
);

// Index for better query performance
VideoSchema.index({ isActive: 1, displayOrder: 1 });
VideoSchema.index({ platform: 1, isActive: 1 });
VideoSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model("Video", VideoSchema);
