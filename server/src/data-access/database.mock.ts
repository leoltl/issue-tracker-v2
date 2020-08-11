export const mockDatabase = {
  users: [{
    id: "_l1smkt2hd",
    name: "Admin",
    username: "u_admin",
    hashedPassword: "***1234567***",
    email: "admin@gmail.com",
    role: "admin"
  }, ],
  issues: [],
  project: [],
  findUserByUsername(username) {
    return this.users.find(user => user.username == username);
  },
  findUserById(userId) {
    return this.users.find(user => user.id == userId);
  },
  insertIssue(issue) {
    var copyOfIssue = Object.assign({}, issue)
    this.issues.push(copyOfIssue);
    return copyOfIssue;
  },
  findIssueById(id) {
    var found = this.issues.find(issue => issue.id == id);
    return found;
  },
  insertUser(user) {
    var copyOfUser = Object.assign({}, user);
    this.users.push(copyOfUser);
    return copyOfUser
  }
}