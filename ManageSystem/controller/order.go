package controller

import (
	CBResponse "ManageSystem/callBackResponse"
	"ManageSystem/db"
	"ManageSystem/global"
	"ManageSystem/utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
)

func toBillList(list []db.Order) []db.Bill {
	res := make([]db.Bill, len(list))
	for i := 0; i < len(list); i++ {
		res[i] = db.OrderToBill(list[i])
	}
	return res
}

func NewOrder(c *gin.Context) {
	var bill db.Bill
	if err := c.ShouldBind(&bill); err != nil {
		fmt.Println(err.Error())
	}
	bill.ID = utils.NewOrderID()
	order := db.BillToOrder(bill)
	fmt.Println(order)
	global.MysqlDB.Create(&order)
	CBResponse.Success(c, nil, "")
}

func UpdateBill(c *gin.Context) {
	var bill db.Bill
	if err := c.ShouldBind(&bill); err != nil {
		fmt.Println(err.Error())
	}
	order := db.BillToOrder(bill)
	global.MysqlDB.Save(&order)
	CBResponse.Success(c, nil, "")
}

func GetOrderList(c *gin.Context) {
	var list []db.Order
	global.MysqlDB.Where("state <> ?", db.DELETE).Find(&list)
	fmt.Println("list=", len(toBillList(list)))
	c.JSON(200, toBillList(list))
}

func DeleteOrder(c *gin.Context) {
	id, _ := strconv.Atoi(c.Query("id"))
	global.MysqlDB.Model(&db.Order{}).Where("id = ?", id).Update("state", db.DELETE)
	c.JSON(200, nil)
}

func UpdateBillState(c *gin.Context) {
	id, _ := strconv.Atoi(c.Query("id"))
	state, _ := strconv.Atoi(c.Query("state"))
	global.MysqlDB.Model(&db.Order{}).Where("id = ?", id).Update("state", state)
	c.JSON(200, nil)
}
