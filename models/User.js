const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
          type: String,
          required: true,
          trim: true,
          unique: true,
          max_length: 25,
        },
      email: {
          type: String,
          required: true,
          max_length: 25,
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User',
          }
      ]
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return 'friends.length';
  })

const User = model('User', userSchema);

module.exports = User;