package db

import (
	"time"
)

type Input struct {
	Id         int       `gorm:"primaryKey;autoIncrement" json:"id,omitempty" form:"id"`
	Mode       string    `json:"mode,omitempty" form:"mode"`
	Remark     string    `json:"remark,omitempty" form:"remark"`
	Handler    string    `json:"handler,omitempty" form:"handler"`
	Money      float64   `json:"money" form:"money"`
	CreateTime time.Time `gorm:"autoCreateTime" json:"create_time" form:"create_time"`
}

type Output struct {
	Id         int       `gorm:"primaryKey;autoIncrement" json:"id,omitempty" form:"id"`
	Mode       string    `json:"mode,omitempty" form:"mode"`
	Remark     string    `json:"remark,omitempty" form:"remark"`
	Handler    string    `json:"handler,omitempty" form:"handler"`
	Money      float64   `json:"money" form:"money"`
	CreateTime time.Time `gorm:"autoCreateTime" json:"create_time" form:"create_time"`
}
