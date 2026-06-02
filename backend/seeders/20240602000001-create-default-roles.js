'use strict';

export const up = async (queryInterface) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    const roles = [
      {
        name: 'SUPER_ADMIN',
        description: 'Super Administrator with full access',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ADMIN',
        description: 'Administrator with full backup and schedule management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'VIEWER',
        description: 'Viewer with read-only access',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('roles', roles, {
      transaction,
    });

    await transaction.commit();
    console.log('✓ Roles seeded successfully');
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const down = async (queryInterface) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.bulkDelete(
      'roles',
      {
        name: ['SUPER_ADMIN', 'ADMIN', 'VIEWER'],
      },
      {
        transaction,
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};