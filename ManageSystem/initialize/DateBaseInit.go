package initialize

import (
	"ManageSystem/db"
	"ManageSystem/global"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

func MysqlDateBaseInit() {
	database, _ := gorm.Open(mysql.Open(global.DbUrl), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})

	database.AutoMigrate(&db.Curtain{})
	database.AutoMigrate(&db.Belt{})
	database.AutoMigrate(&db.Yarn{})
	database.AutoMigrate(&db.Lace{})
	database.AutoMigrate(&db.Valance{})
	database.AutoMigrate(&db.Pole{})
	database.AutoMigrate(&db.Pole2{})
	database.AutoMigrate(&db.Circle{})
	database.AutoMigrate(&db.Ring{})
	database.AutoMigrate(&db.Other{})
	database.AutoMigrate(&db.Address{})
	database.AutoMigrate(db.Input{})
	database.AutoMigrate(db.Output{})
	database.AutoMigrate(db.Order{})
	database.AutoMigrate(db.Cur{})
	database.AutoMigrate(db.Fahuo{})
	database.AutoMigrate(db.FahuoItem{})
	global.MysqlDB = database
}
