package controller

import (
	CBResponse "ManageSystem/callBackResponse"
	"ManageSystem/db"
	"ManageSystem/global"
	"github.com/gin-gonic/gin"
)

func GetValanceList(c *gin.Context){
	name := c.Query("name")
	var list []db.Valance
	database := global.MysqlDB
	if name != ""{
		database=database.Where("name like ?","%"+name+"%")
	}
	database.Find(&list)
	c.JSON(200,list)
}


func AddValance(c *gin.Context){
	var be db.Valance
	c.ShouldBind(&be)
	global.MysqlDB.Omit("id").Create(&be)
	CBResponse.Success(c,nil,"")
}

func RemoveValance(c *gin.Context){
	id := c.Query("id")
	global.MysqlDB.Delete(&db.Valance{},id)
	CBResponse.Success(c,nil,"")
}

func EditValance(c *gin.Context){
	var be db.Valance
	c.ShouldBind(&be)
	global.MysqlDB.Save(&be)
}

