'use strict';

import { randomUUID } from 'crypto';

export const up = async (queryInterface) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    const storageProviders = [
      {
        id: randomUUID(),
        name: 'Local Storage',
        type: 'LOCAL',
        isDefault: true,
        isActive: true,
        config: JSON.stringify({
          backupPath: './backups',
          retentionDays: 30,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      'storage_providers',
      storageProviders,
      { transaction }
    );

    await transaction.commit();

    console.log('✓ Default storage provider created successfully');
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const down = async (queryInterface) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.bulkDelete(
      'storage_providers',
      {
        type: 'LOCAL',
        name: 'Local Storage',
      },
      { transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};