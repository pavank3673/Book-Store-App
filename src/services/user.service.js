import { QueryTypes } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';

// get user by email
const getUserByEmail = async (email) => {
  const data = await sequelize.query(
    'SELECT * FROM users WHERE email = :email',
    {
      replacements: { email: email },
      type: QueryTypes.SELECT,
      plain: true
    }
  );
  return data;
};

//create new user
export const registerUser = async (body) => {
  const existingUser = await getUserByEmail(body.email);
  if (existingUser === null) {
    body.password = await bcrypt.hash(body.password, 10);
    const data = await sequelize.query(
      'INSERT INTO users ("firstName", "lastName", "email", "password", "role", "createdAt", "updatedAt") values (:firstName, :lastName, :email, :password, :role, :createdAt, :updatedAt)',
      {
        replacements: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: body.password,
          role: body.role,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        type: QueryTypes.INSERT
      }
    );

    return data[1];
  } else {
    throw new Error('User already exists');
  }
};

// create new admin
export const registerAdmin = async (body) => {
  const existingAdmin = await getUserByEmail(body.email);
  if (existingAdmin === null) {
    body.password = await bcrypt.hash(body.password, 10);
    const data = await sequelize.query(
      'INSERT INTO users ("firstName", "lastName", "email", "password", "role", "createdAt", "updatedAt") values (:firstName, :lastName, :email, :password, :role, :createdAt, :updatedAt)',
      {
        replacements: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: body.password,
          role: body.role,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        type: QueryTypes.INSERT
      }
    );

    return data[1];
  } else {
    throw new Error('Admin already exists');
  }
};
