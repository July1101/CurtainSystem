package controller

import (
	"ManageSystem/db"
	"ManageSystem/global"
	"github.com/gin-gonic/gin"
	"sort"
)

func unique(list []string) []string{
	sort.Strings(list)
	k:=1
	for i:=1;i<len(list);i++{
		if list[i]!=list[i-1]{
			list[k]=list[i]
			k++
		}
	}
	return list[0:k]
}

func GetBillCircle(c *gin.Context){
	var list[]db.Circle
	global.MysqlDB.Where("state = ?",1).Find(&list)
	c.JSON(200,list)
}

func GetBillPole(c *gin.Context){
	var list[]db.Pole
	global.MysqlDB.Where("state = ?",1).Find(&list)
	c.JSON(200,list)
}

func GetBillValance(c *gin.Context){
	var list[]db.Valance
	global.MysqlDB.Where("state= ?",1).Find(&list)
	c.JSON(200,list)
}
func GetBillYarnName(c *gin.Context){
	var list[] string
	global.MysqlDB.Model(&db.Yarn{}).Select("name").Where("state = ?",1).Find(&list)
	c.JSON(200,unique(list))
}

func GetBillAddress(c *gin.Context){
	var list[] db.Address
	global.MysqlDB.Find(&list)
	c.JSON(200,list)
}

func GetBillLace(c *gin.Context)  {
	var list[] db.Lace
	global.MysqlDB.Find(&list)
	c.JSON(200,list)
}

func GetYarnID(c *gin.Context)  {
	name := c.Query("name")
	var list[] string
	if name!="" {
		global.MysqlDB.Model(&db.Yarn{}).Select("version_id").Where("name=?",name).Find(&list)
	}
	c.JSON(200,list)
}

func GetYarnPrice(c *gin.Context){
	name := c.Query("name")
	versionId := c.Query("version_id")
	var price float64
	if name!=""&&versionId!=""{
		//global.MysqlDB.Model(&db.Yarn{}).Select("price").Where("name = ?and version_id=?",name,versionId).First(&price)
		global.MysqlDB.Table("yarn").Select("price").Where("version_id=? and name=?",versionId,name).Scan(&price)
	}
	c.JSON(200,price)
}

func GetCurtainName(c *gin.Context)  {
	var list[] string
	global.MysqlDB.Model(&db.Curtain{}).Select("name").Find(&list)
	c.JSON(200,unique(list))
}

func GetCurtainID(c *gin.Context)  {
	name := c.Query("name")
	var list[] string
	if name!="" {
		global.MysqlDB.Model(&db.Curtain{}).Select("version_id").Where("name=?",name).Find(&list)
	}
	c.JSON(200,list)
}

func GetCurtainPrice(c *gin.Context){
	name := c.Query("name")
	versionId := c.Query("version_id")
	var price float64
	if name!=""&&versionId!=""{
		//global.MysqlDB.Model(&db.Curtain{}).Select("price").Where("version_id=? and name=?",versionId,name).Find(&price)
		global.MysqlDB.Table("curtain").Select("price").Where("version_id=? and name=?",versionId,name).Scan(&price)
	}
	c.JSON(200,price)
}