const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { // Función que define el modelo + conexion a sequelize
  
  sequelize.define('videogame', {
    
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false //
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false 
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER, 
      // defaultValue: 0,
      // allowNull: true
    },
    platforms: {
      type: DataTypes.STRING, //* .JSONB? // text
      allowNull: false, 
    },
    background_image: {
      type: DataTypes.STRING, //* .STRING? 
      allowNull: true
      // defaultValue:
    },
    createdInDb: {
      type: DataTypes.BOOLEAN, //* .STRING?
      allowNull: false,
      defaultValue: true
    }, 
  }, { timestamps: false } ); // no CREATEDAT UPDATEAT freezeTableName: true NO PLURALIZA 
  
};
