package controller

import (
	CBResponse "ManageSystem/callBackResponse"
	"ManageSystem/db"
	"ManageSystem/global"
	"github.com/gin-gonic/gin"
)



func AddCurtain(c *gin.Context)  {
	var cur db.Curtain
	c.ShouldBind(&cur)
	global.MysqlDB.Omit("id").Create(&cur)
	CBResponse.Success(c,nil,"")
}


func GetCurtainsList(c *gin.Context){
	versionId :=c.Query("version_id")
	name :=c.Query("name")

	res :=global.MysqlDB
	if versionId !=""{
		res = res.Where("version_id like ?","%"+versionId+"%")
	}
	if name!=""{
		res = res.Where("name like ?","%"+name+"%")
	}
	var list []db.Curtain
	res.Find(&list)
	CBResponse.Success(c,list,"查询成功")
}

func RemoveCurtain(c *gin.Context){
	id := c.Query("id")
	global.MysqlDB.Delete(&db.Curtain{},id)
	CBResponse.Success(c,nil,"")
}

func EditCurtain(c *gin.Context){
	var cur db.Curtain
	c.ShouldBind(&cur)
	global.MysqlDB.Save(&cur)
}
