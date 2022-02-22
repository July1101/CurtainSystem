package controller

import (
	CBResponse "ManageSystem/callBackResponse"
	"ManageSystem/db"
	"ManageSystem/global"
	"github.com/gin-gonic/gin"
)

func GetLaceList(c *gin.Context){
	name := c.Query("name")
	var list []db.Lace
	database := global.MysqlDB
	if name != ""{
		database=database.Where("name like ?","%"+name+"%")
	}
	database.Find(&list)
	c.JSON(200,list)
}


func AddLace(c *gin.Context){
	var be db.Lace
	c.ShouldBind(&be)
	global.MysqlDB.Omit("id").Create(&be)
	CBResponse.Success(c,nil,"")
}

func RemoveLace(c *gin.Context){
	id := c.Query("id")
	global.MysqlDB.Delete(&db.Lace{},id)
	CBResponse.Success(c,nil,"")
}

func EditLace(c *gin.Context){
	var be db.Lace
	c.ShouldBind(&be)
	global.MysqlDB.Save(&be)
}

