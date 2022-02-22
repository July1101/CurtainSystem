package controller

import (
	"ManageSystem/db"
	"ManageSystem/global"
	"fmt"
	"github.com/gin-gonic/gin"
)

func AddFahuo(c *gin.Context) {
	var fahuo db.Fahuo
	c.ShouldBind(&fahuo)
	fmt.Println(fahuo)
	global.MysqlDB.Create(&fahuo)
}

func FahuoList(c *gin.Context) {
	var list []db.Fahuo
	global.MysqlDB.Find(&list)
	for i := 0; i < len(list); i++ {
		global.MysqlDB.Where("fahuo_id = ?", list[i].ID).Find(&list[i].List)
	}

	c.JSON(200, list)
}

func FahuoCurFac(c *gin.Context) {
	var list []string
	global.MysqlDB.Model(&db.Cur{}).Select("factory").Group("factory").Scan(&list)
	c.JSON(200, list)
}

func FahuoCurName(c *gin.Context) {
	factory := c.Query("factory")
	var list []string
	global.MysqlDB.Model(&db.Cur{}).Select("name").Group("name").Where("factory = ?", factory).Scan(&list)
	c.JSON(200, list)
}

func FahuoCurCode(c *gin.Context) {
	name := c.Query("name")
	factory := c.Query("factory")
	var list []string
	global.MysqlDB.Model(&db.Cur{}).Select("code").Where("factory = ? and name = ?", factory, name).Scan(&list)
	c.JSON(200, list)
}
func FahuoCurCost(c *gin.Context) {
	name := c.Query("name")
	code := c.Query("code")
	var cost float64
	global.MysqlDB.Model(&db.Cur{}).Where("code = ? and name = ?", code, name).Select("cost").Scan(&cost)
	c.JSON(200, cost)
}
