class User {
  constructor(username) {
    this.username = username;
  }

  save() {
    const currentUsers = User.allString();
    if (currentUsers.includes(this.username)) {
      return false;
    }
    return localStorage.setItem(
      'users',
      [currentUsers, this.username].join(','),
    );
  }

  static exists(username) {
    return User.allString().includes(username);
  }

  static allString() {
    return localStorage.getItem('users') || '';
  }

  static all() {
    return User.allString()
      .split(',')
      .map((username) => User.new(username));
  }

  static serialize(user) {
    return user.username;
  }

  static serializeAll(users) {
    return users.map((user) => User.serialize(user)).join(',');
  }
}

export default User;
