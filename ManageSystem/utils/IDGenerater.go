package utils

import (
	"ManageSystem/db"
	"ManageSystem/global"
	"strconv"
	"time"
)

func NewOrderID() int {

	t := time.Now()
	year := strconv.Itoa(t.Year() % 100)
	month := int(t.Month())
	day := t.Day()

	ans := year
	if month < 10 {
		ans += "0"
	}
	ans += strconv.Itoa(month)
	if day < 10 {
		ans += "0"
	}
	ans += strconv.Itoa(day)
	tmp := ans + "00"

	n, _ := strconv.Atoi(tmp)

	var c int64
	global.MysqlDB.Model(db.Order{}).Where("id>?", n).Count(&c)

	if c < 9 {
		ans += "0"
	}
	ans += strconv.Itoa(int(c) + 1)

	res, _ := strconv.Atoi(ans)

	return res
}

