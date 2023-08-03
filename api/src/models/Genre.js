// //! ------------------------------

// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   sequelize.define('genre', {
   
//       name: {

//       type: DataTypes.STRING,
//       // unique: true,
//       allowNull: false

//     },

//   },{ timestamps: true, createdAt: "Creado", updateAt: false }); // freezeTableName: true
// };


const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: true, createdAt: "Creado", updatedAt: false });
};
