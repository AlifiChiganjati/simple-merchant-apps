const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merchants', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    merchant_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    merchant_address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'updated_at'
    },
  }, {
    sequelize,
    tableName: 'merchants',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "merchants_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
