package controller

import (
	CBResponse "ManageSystem/callBackResponse"
	"ManageSystem/db"
	"ManageSystem/global"
	"github.com/gin-gonic/gin"
)

func GetYarnList(c *gin.Context){
	name := c.Query("name")
	var list []db.Yarn
	database := global.MysqlDB
	if name != ""{
		database=database.Where("name like ?","%"+name+"%")
	}
	database.Find(&list)
	c.JSON(200,list)
}


func AddYarn(c *gin.Context){
	var be db.Yarn
	c.ShouldBind(&be)
	global.MysqlDB.Omit("id").Create(&be)
	CBResponse.Success(c,nil,"")
}

func RemoveYarn(c *gin.Context){
	id := c.Query("id")
	global.MysqlDB.Delete(&db.Yarn{},id)
	CBResponse.Success(c,nil,"")
}

func EditYarn(c *gin.Context){
	var be db.Yarn
	c.ShouldBind(&be)
	global.MysqlDB.Save(&be)
}

