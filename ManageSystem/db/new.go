package db

type Cur struct {
	ID      int `gorm:"primaryKey;autoIncrement"`
	Code    string
	Name    string
	Cost    float64
	Factory string
}

type Fahuo struct {
	ID      int         `gorm:"primaryKey;autoIncrement" json:"id,omitempty" form:"id"`
	Book    string      `json:"book,omitempty" form:"book"`
	Page    string      `json:"page,omitempty" form:"page"`
	Factory string      `json:"factory,omitempty" form:"factory"`
	List    []FahuoItem `gorm:"foreignKey:FahuoID" json:"list,omitempty" form:"list"`
}

type FahuoItem struct {
	ID      int     `gorm:"primaryKey;autoIncrement" json:"id,omitempty" form:"id"`
	FahuoID int     `json:"fahuo_id" form:"fahuo_id"`
	Room    string  `json:"room,omitempty" form:"room"`
	Name    string  `json:"name,omitempty" form:"name"`
	Code    string  `json:"code,omitempty" form:"code"`
	Cost    float64 `json:"cost,omitempty" form:"cost"`
	Num     float64 `json:"num,omitempty" form:"num"`
	Total   float64 `json:"total,omitempty" form:"total"`
}
