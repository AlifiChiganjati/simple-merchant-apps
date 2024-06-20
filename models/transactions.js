const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
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
    merchant_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'merchants',
        key: 'id'
      }
    },
    transactions_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    point_total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transactions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "transactions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
