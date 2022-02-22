package controller

import (
	CBResponse "ManageSystem/callBackResponse"
	"ManageSystem/db"
	"ManageSystem/global"
	"github.com/gin-gonic/gin"
)

func GetBeltList(c *gin.Context){
	name := c.Query("name")
	var list []db.Belt
	database := global.MysqlDB
	if name != ""{
		database=database.Where("name like ?","%"+name+"%")
	}
	database.Find(&list)
	c.JSON(200,list)
}


func AddBelt(c *gin.Context){
	var be db.Belt
	c.ShouldBind(&be)
	global.MysqlDB.Omit("id").Create(&be)
	CBResponse.Success(c,nil,"")
}

func RemoveBelt(c *gin.Context){
	id := c.Query("id")
	global.MysqlDB.Delete(&db.Belt{},id)
	CBResponse.Success(c,nil,"")
}

func EditBelt(c *gin.Context){
	var be db.Belt
	c.ShouldBind(&be)
	global.MysqlDB.Save(&be)
}

