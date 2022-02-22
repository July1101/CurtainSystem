package db

import (
	"github.com/shopspring/decimal"
	time2 "time"
)

var (
	CREATE = 0

	DELETE = 10

	DETERMINED = 1
	FAHUO      = 2
	DEAL       = 3
	INSTALL    = 4
	FINISH     = 5
)

type Bill struct {
	ID    int   `json:"id" form:"id" `
	State uint8 `json:"state" form:"state"`

	UserInfo UserInfo `json:"user_info" form:"user_info"`

	Circle BillCircle `json:"circle" form:"circle"`
	Pole1  BillPole1  `json:"pole1" form:"pole1"`
	Pole2  BillPole2  `json:"pole2" form:"pole2"`
	Ring   BillRing   `json:"ring" form:"ring"`
	Belt   BillBelt   `json:"belt" form:"belt"`

	Discount    decimal.Decimal `json:"discount" form:"discount"`
	FinalAmount decimal.Decimal `json:"final_amount" form:"final_amount"`
	AlreadyPad  decimal.Decimal `json:"already_pad" form:"already_pad"`
	FinishPad   decimal.Decimal `json:"finish_pad" form:"finish_pad"` //最后结账时

	CreateTime  time2.Time `json:"create_time" form:"create_time"`
	ConfirmTime time2.Time `json:"confirm_time" form:"confirm_time"`
	FahuoTime   time2.Time `json:"fahuo_time" form:"fahuo_time"`
	HandleTime  time2.Time `json:"handle_time" form:"handle_time"`
	InstallTime time2.Time `json:"install_time" form:"install_time"`
	FinishTime  time2.Time `json:"finish_time" form:"finish_time"`

	Info  []Info      `json:"info" form:"info"`
	Other []BillOther `json:"other" form:"other"`
}

type UserInfo struct {
	Name          string `json:"name" form:"name"`
	Telephone     string `json:"telephone" form:"telephone"`
	Address       string `json:"address" form:"address"`
	DetailAddress string `json:"detail_address" form:"detail_address"`
}

type Info struct {
	Room       string      `json:"room" form:"room"`
	Size       float64     `json:"size" form:"size"`
	Pole       int         `json:"pole" form:"pole"`
	TotalMoney float64     `json:"total_money" form:"total_money"`
	HasLace    bool        `json:"has_lace" form:"has_lace"`
	HasValance bool        `json:"has_valance" form:"has_valance"`
	HasYarn    bool        `json:"has_yarn" form:"has_yarn"`
	Curtain    InfoCurtain `json:"curtain" form:"curtain"`
	Yarn       InfoYarn    `json:"yarn" form:"yarn"`
	Valance    InfoValance `json:"valance" form:"valance"`
	Lace       InfoLace    `json:"lace" form:"lace"`
}

type InfoCurtain struct {
	VersionId  string  `json:"version_id" form:"version_id" `
	VersionId1 string  `json:"version_id1" form:"version_id1" `
	VersionId2 string  `json:"version_id2" form:"version_id2"`
	Name       string  `json:"name" form:"name"`
	Price      float64 `json:"price" form:"price"`
	Cost       float64 `json:"cost" form:"cost"`
	Length     float64 `json:"length" form:"length"`
	Part       uint8   `json:"part" form:"part"`
}

type InfoYarn struct {
	VersionId string  `json:"version_id" form:"version_id"`
	Name      string  `json:"name" form:"name"`
	Price     float64 `json:"price" form:"price"`
	Cost      float64 `json:"cost" form:"cost"`
	Length    float64 `json:"length" form:"length"`
	Pole      uint8   `json:"pole" form:"pole"`
}

type InfoValance struct {
	Name   string  `json:"name" form:"name"`
	Price  float64 `json:"price" form:"price"`
	Cost   float64 `json:"cost" form:"cost"`
	Length float64 `json:"length" form:"length"`
}

type InfoLace struct {
	Name   string  `json:"name" form:"name"`
	Price  float64 `json:"price" form:"price"`
	Cost   float64 `json:"cost" form:"cost"`
	Length float64 `json:"length" form:"length"`
}

type BillOther struct {
	Type       string  `form:"type" json:"type"`
	State      bool    `form:"state" json:"state"`
	Name       string  `form:"name" json:"name"`
	Cost       float64 `form:"cost" json:"cost"`
	Price      float64 `form:"price" json:"price"`
	Unit       string  `form:"unit" json:"unit"`
	Num        float64 `form:"num" json:"num"`
	TotalMoney float64 `form:"total_money" json:"total_money"`
}

type BillBelt struct {
	Name   string  `json:"name" form:"name"`
	Price  float64 `json:"price" form:"price"`
	Cost   float64 `json:"cost" form:"cost"`
	Length float64 `json:"length" form:"length"`
}

type BillCircle struct {
	Name  string  `json:"name" form:"name"`
	Price float64 `json:"price" form:"price"`
	Cost  float64 `json:"cost" form:"cost"`
	Num   float64 `json:"num" form:"num"`
}

type BillPole1 struct {
	Name   string  `json:"name" form:"name"`
	Price  float64 `json:"price" form:"price"`
	Cost   float64 `json:"cost" form:"cost"`
	Length float64 `json:"length" form:"length"`
}

type BillPole2 struct {
	Name   string  `json:"name" form:"name"`
	Price  float64 `json:"price" form:"price"`
	Cost   float64 `json:"cost" form:"cost"`
	Length float64 `json:"length" form:"length"`
}

type BillRing struct {
	Name  string  `json:"name" form:"name"`
	Price float64 `json:"price" form:"price"`
	Cost  float64 `json:"cost" form:"cost"`
	Num   float64 `json:"num" form:"num"`
}
