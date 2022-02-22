package controller

import (
	CBResponse "ManageSystem/callBackResponse"
	"ManageSystem/db"
	"ManageSystem/global"
	"github.com/gin-gonic/gin"
)

func GetAllOtherList(c *gin.Context){
	var list []db.Other
	global.MysqlDB.Find(&list)
	c.JSON(200,list)
}

func GetOtherTypeList(c *gin.Context){
	t :=c.Query("type")
	var list []db.Other
	database := global.MysqlDB
	if t!="" {
		database=database.Where("type = ?",t)
	}
	database.Find(&list)
	c.JSON(200,list)
}

func AddOther(c *gin.Context){
	var be db.Other
	c.ShouldBind(&be)
	global.MysqlDB.Omit("id").Create(&be)
	CBResponse.Success(c,nil,"")
}

func RemoveOther(c *gin.Context){
	id := c.Query("id")
	global.MysqlDB.Delete(&db.Other{},id)
	CBResponse.Success(c,nil,"")
}

func EditOther(c *gin.Context){
	var be db.Other
	c.ShouldBind(&be)
	global.MysqlDB.Save(&be)
}
