import dotenv from 'dotenv';
dotenv.config();
import { QueryTypes } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
const Token = require('../models/token')(sequelize, DataTypes);

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// get user by email
const getUserByEmail = async (email) => {
  const data = await sequelize.query('SELECT * FROM users WHERE email = :email', {
    replacements: { email: email },
    type: QueryTypes.SELECT,
    plain: true
  });
  return data;
};

export const getUserById = async (id) => {
  const data = await sequelize.query('SELECT * FROM users WHERE "userId" = :id', {
    replacements: { id: id },
    type: QueryTypes.SELECT,
    plain: true
  });
  return data;
};

//create new user
export const registerUser = async (body) => {
  const existingUser = await getUserByEmail(body.email);
  if (existingUser === null) {
    body.password = await bcrypt.hash(body.password, 10);
    const data = await sequelize.query(
      'INSERT INTO users ("firstName", "lastName", "email", "password", "role", "createdAt", "updatedAt") values (:firstName, :lastName, :email, :password, :role, :createdAt, :updatedAt) RETURNING *',
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

    return data[0][0];
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
      'INSERT INTO users ("firstName", "lastName", "email", "password", "role", "createdAt", "updatedAt") values (:firstName, :lastName, :email, :password, :role, :createdAt, :updatedAt) RETURNING *',
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

    return data[0][0];
  } else {
    throw new Error('Admin already exists');
  }
};

export const loginUser = async (body) => {
  const existingUser = await getUserByEmail(body.email);
  if (existingUser !== null) {
    if (await bcrypt.compare(body.password, existingUser.password)) {
      const accessToken = jwt.sign({ id: existingUser.userId, email: existingUser.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '120s'
      });
      const refreshToken = jwt.sign({ id: existingUser.userId, email: existingUser.email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d'
      });

      await sequelize.query(
        'INSERT INTO tokens ("refreshToken", "UserId", "createdAt", "updatedAt") values (:refreshtoken, :userid, :createdat, :updatedat)',
        {
          replacements: {
            refreshtoken: refreshToken,
            userid: existingUser.userId,
            createdat: new Date(),
            updatedat: new Date()
          },
          type: QueryTypes.INSERT
        }
      );

      return {
        accessToken: accessToken,
        refreshToken: refreshToken
      };
    } else {
      throw new Error('Invalid Password');
    }
  } else {
    throw new Error('Invalid Email');
  }
};

export const generateAccessToken = async (body) => {
  const result = jwt.verify(body.refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const existingRefreshToken = await sequelize.query(
    'SELECT * FROM tokens WHERE "refreshToken" = :refreshtoken AND "UserId" = :userid',
    {
      replacements: {
        refreshtoken: body.refreshToken,
        userid: result.id
      },
      type: QueryTypes.SELECT,
      plain: true
    }
  );

  if (existingRefreshToken !== null) {
    const accessToken = jwt.sign({ id: result.id, email: result.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '120s'
    });
    return {
      accessToken: accessToken
    };
  } else {
    throw new Error('Refresh token not found');
  }
};
