package controller

import (
	"ManageSystem/db"
	"ManageSystem/global"
	"github.com/gin-gonic/gin"
)

func GetFacList(C *gin.Context) {
	var list []string
	global.MysqlDB.Model(&db.Fac{}).Select("factory").Scan(&list)
	C.JSON(200, list)
}
