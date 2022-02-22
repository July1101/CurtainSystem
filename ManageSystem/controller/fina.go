package controller

import (
	"ManageSystem/db"
	"ManageSystem/global"
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
)

func InputList(c *gin.Context) {
	var list []db.Input
	global.MysqlDB.Order("create_time desc").Find(&list)
	c.JSON(200, list)
}

func AddInput(c *gin.Context) {
	var u db.Input
	c.ShouldBind(&u)
	fmt.Println(u)
	global.MysqlDB.Create(&u)
	c.JSON(200, nil)
}

func RemoveInput(c *gin.Context) {
	id, _ := strconv.Atoi(c.Query("id"))
	if id != 0 {
		global.MysqlDB.Delete(&db.Input{}, id)
	}
	c.JSON(200, nil)
}

func OutputList(c *gin.Context) {
	var list []db.Output
	global.MysqlDB.Order("create_time desc").Find(&list)
	c.JSON(200, list)
}

func AddOutput(c *gin.Context) {
	var u db.Output
	c.ShouldBind(&u)
	fmt.Println(u)
	global.MysqlDB.Create(&u)
	c.JSON(200, nil)
}

func RemoveOutput(c *gin.Context) {
	id, _ := strconv.Atoi(c.Query("id"))
	if id != 0 {
		global.MysqlDB.Delete(&db.Output{}, id)
	}
	c.JSON(200, nil)
}

func GetLastYearData(c *gin.Context) {
	var month []string
	var inputData []float64
	var outputData []float64

	global.MysqlDB.Raw("select DATE_FORMAT(create_time, '%y-%m') from input group by DATE_FORMAT(create_time, '%y-%m') order by create_time desc limit 12").Scan(&month)
	global.MysqlDB.Raw("select sum(money) from input group by DATE_FORMAT(create_time, '%y-%m') order by create_time desc limit 12").Scan(&inputData)
	global.MysqlDB.Raw("select sum(money) from output group by DATE_FORMAT(create_time, '%y-%m') order by create_time desc limit 12").Scan(&outputData)

	c.JSON(200, gin.H{
		"month":  month,
		"input":  inputData,
		"output": outputData,
	})
}

type Every10 struct {
	Month  string
	Period string
	Money  float64
}

func GetEvery10DaysData(c *gin.Context) {
	var list []Every10
	var month [12]string
	var inputData [12]float64
	var outputData []float64
	global.MysqlDB.Raw("SELECT MONTH(create_time) as `month`,(IF(DAY(create_time)<11,'上旬',IF(DAY(create_time)<21,'中旬','下旬'))) as `period`,sum(money) as `money` FROM input group BY MONTH(create_time),(IF(DAY(create_time)<11,'上旬',IF(DAY(create_time)<21,'中旬','下旬'))) ORDER BY create_time desc LIMIT 12").Scan(&list)
	global.MysqlDB.Raw("SELECT sum(money) as `money` FROM output group BY MONTH(create_time),(IF(DAY(create_time)<11,'上旬',IF(DAY(create_time)<21,'中旬','下旬'))) ORDER BY create_time desc LIMIT 12").Scan(&outputData)
	for i := 0; i < 12; i++ {
		month[i] = list[i].Month + "月" + list[i].Period
		inputData[i] = list[i].Money
	}
	c.JSON(200, gin.H{
		"month":  month,
		"input":  inputData,
		"output": outputData,
	})
}

type Part1 struct {
	Name  string `json:"name,omitempty" form:"name"`
	Value string `json:"value,omitempty" form:"value"`
}

func GetPart1Data(c *gin.Context) {
	var list12, list6, list4 []Part1
	global.MysqlDB.Raw("SELECT `mode` as `name`,sum(money) as `value` FROM input where `create_time`>DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY `mode` ORDER BY `mode`desc").Scan(&list12)
	global.MysqlDB.Raw("SELECT `mode` as `name`,sum(money) as `value` FROM input where `create_time`>DATE_SUB(CURDATE(), INTERVAL 6 MONTH) GROUP BY `mode` ORDER BY `mode`desc").Scan(&list6)
	global.MysqlDB.Raw("SELECT `mode` as `name`,sum(money) as `value` FROM input where `create_time`>DATE_SUB(CURDATE(), INTERVAL 4 MONTH) GROUP BY `mode` ORDER BY `mode`desc").Scan(&list4)

	c.JSON(200, gin.H{
		"last_year":       list12,
		"last_six_month":  list6,
		"last_four_month": list4,
	})
}

func GetPart2Data(c *gin.Context) {
	var list12, list6, list4 []Part1
	global.MysqlDB.Raw("SELECT `mode` as `name`,sum(money) as `value` FROM output where `create_time`>DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY `mode` ORDER BY `mode`desc").Scan(&list12)
	global.MysqlDB.Raw("SELECT `mode` as `name`,sum(money) as `value` FROM output where `create_time`>DATE_SUB(CURDATE(), INTERVAL 6 MONTH) GROUP BY `mode` ORDER BY `mode`desc").Scan(&list6)
	global.MysqlDB.Raw("SELECT `mode` as `name`,sum(money) as `value` FROM output where `create_time`>DATE_SUB(CURDATE(), INTERVAL 4 MONTH) GROUP BY `mode` ORDER BY `mode`desc").Scan(&list4)

	c.JSON(200, gin.H{
		"last_year":       list12,
		"last_six_month":  list6,
		"last_four_month": list4,
	})
}
