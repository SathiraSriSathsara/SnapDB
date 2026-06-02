'use strict';

import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export const up = async (queryInterface, Sequelize) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    const superAdminRole = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'SUPER_ADMIN'",
      {
        type: Sequelize.QueryTypes.SELECT,
        transaction,
      }
    );

    const viewerRole = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'VIEWER'",
      {
        type: Sequelize.QueryTypes.SELECT,
        transaction,
      }
    );

    if (!superAdminRole.length || !viewerRole.length) {
      throw new Error('Roles not found. Please run role seeder first.');
    }

    const users = [
      {
        id: randomUUID(),
        email: 'admin@dbbackup.com',
        firstName: 'Admin',
        lastName: 'User',
        password: bcrypt.hashSync('Admin@123456', 10),
        isActive: true,
        emailVerified: true,
        roleId: superAdminRole[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        email: 'viewer@dbbackup.com',
        firstName: 'Viewer',
        lastName: 'User',
        password: bcrypt.hashSync('Viewer@123456', 10),
        isActive: true,
        emailVerified: true,
        roleId: viewerRole[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', users, {
      transaction,
    });

    await transaction.commit();

    console.log('✓ Default users created successfully');
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const down = async (queryInterface) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.bulkDelete(
      'users',
      {
        email: ['admin@dbbackup.com', 'viewer@dbbackup.com'],
      },
      { transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};