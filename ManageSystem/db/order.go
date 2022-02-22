package db

import (
	"encoding/json"
	"github.com/shopspring/decimal"
	time2 "time"
)

type OrderData struct {
	UserInfo UserInfo
	Info     []Info
	Other    []BillOther
	Circle   BillCircle
	Pole1    BillPole1
	Pole2    BillPole2
	Ring     BillRing
	Belt     BillBelt
}

type Order struct {
	ID    int   `json:"id,omitempty"  form:"id"`
	State uint8 `json:"state,omitempty" form:"state"`

	OrderData string `json:"order_data,omitempty" form:"order_data"`

	Discount    decimal.Decimal `json:"discount" form:"discount"`
	FinalAmount decimal.Decimal `json:"final_amount" form:"final_amount"`
	AlreadyPad  decimal.Decimal `json:"already_pad" form:"already_pad"`
	FinishPad   decimal.Decimal `json:"finish_pad" form:"finish_pad"`

	CreateTime  time2.Time `json:"create_time"  form:"create_time"`
	ConfirmTime time2.Time `json:"confirm_time"  form:"confirm_time"`
	FahuoTime   time2.Time `json:"fahuo_time"  form:"fahuo_time"`
	HandleTime  time2.Time `json:"handle_time"  form:"handle_time"`
	InstallTime time2.Time `json:"install_time"  form:"install_time"`
	FinishTime  time2.Time `json:"finish_time"  form:"finish_time"`
}

func handleTrans(data interface{}) string {
	d, _ := json.Marshal(data)
	return string(d)
}

func BillToOrder(bill Bill) Order {
	var order Order
	order.ID = bill.ID
	order.State = bill.State
	order.Discount = bill.Discount
	order.FinalAmount = bill.FinalAmount
	order.AlreadyPad = bill.AlreadyPad
	order.FinishPad = bill.FinishPad

	order.FahuoTime = bill.FahuoTime
	order.CreateTime = bill.CreateTime
	order.ConfirmTime = bill.ConfirmTime
	order.HandleTime = bill.HandleTime
	order.InstallTime = bill.InstallTime
	order.FinishTime = bill.FinishTime

	var data OrderData
	data.UserInfo = bill.UserInfo
	data.Info = bill.Info
	data.Other = bill.Other
	data.Circle = bill.Circle
	data.Pole1 = bill.Pole1
	data.Pole2 = bill.Pole2
	data.Ring = bill.Ring
	data.Belt = bill.Belt
	order.OrderData = handleTrans(data)

	return order
}

func OrderToBill(bill Order) Bill {
	var order Bill
	order.ID = bill.ID
	order.State = bill.State
	order.Discount = bill.Discount
	order.FinalAmount = bill.FinalAmount
	order.AlreadyPad = bill.AlreadyPad
	order.FinishPad = bill.FinishPad

	order.FahuoTime = bill.FahuoTime
	order.CreateTime = bill.CreateTime
	order.ConfirmTime = bill.ConfirmTime
	order.HandleTime = bill.HandleTime
	order.InstallTime = bill.InstallTime
	order.FinishTime = bill.FinishTime

	var data OrderData
	_ = json.Unmarshal([]byte(bill.OrderData), &data)

	order.UserInfo = data.UserInfo
	order.Info = data.Info
	order.Other = data.Other
	order.Circle = data.Circle
	order.Pole1 = data.Pole1
	order.Pole2 = data.Pole2
	order.Ring = data.Ring
	order.Belt = data.Belt

	return order
}
