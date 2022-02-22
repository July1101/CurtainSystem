package utils

import (
	"ManageSystem/db"
	"ManageSystem/global"
	"github.com/xuri/excelize/v2"
	"strconv"
)

func LoadCurDatabase() {
	f, _ := excelize.OpenFile("file/窗帘数据库.xlsx")
	rows, _ := f.GetRows("Sheet1")
	for i, row := range rows {
		if i == 0 {
			continue
		}
		var cur db.Cur
		cur.ID, _ = strconv.Atoi(row[0])
		cur.Name = row[1]
		cur.Code = row[2]
		cur.Cost, _ = strconv.ParseFloat(row[3], 64)
		cur.Factory = row[4]
		global.MysqlDB.Save(&cur)
	}
}
