package main

import "ManageSystem/initialize"

func main() {
	initialize.MysqlDateBaseInit()
	initialize.RunSystemSetRouter()
}

//func main() {
//	initialize.MysqlDateBaseInit()
//	utils.LoadCurDatabase()
//}
