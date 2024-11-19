const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionRequestSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  door: { type: Schema.Types.ObjectId, ref: 'Door', required: true },
  requestTime: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

const PermissionRequestModel = mongoose.model('PermissionRequest', permissionRequestSchema);

module.exports = PermissionRequestModel;