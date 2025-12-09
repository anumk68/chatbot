class UserModel {
  // Find user by email
  static async findByEmail(db, email) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    return rows[0]; // single user object
  }

  static async findById(db, id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ? LIMIT 1", [
      id,
    ]);
    return rows[0]; // single user object
  }

  // Create user
  static async createUser(db, data) {
    const sql = `
      INSERT INTO users (name, email, password, role, chatbot_id, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.name,
      data.email,
      data.password,
      data.role,
      data.chatbot_id,
      data.status,
    ];

    const [result] = await db.query(sql, values);

    // Debug
    console.log("INSERT RESULT:", result);

    // Sometimes insertId might be missing depending on driver
    // Best practice: fetch the inserted user from DB
    const user = await this.findByEmail(db, data.email);
    return user; // Return full user object instead of just insertId
  }
}

export default UserModel;
