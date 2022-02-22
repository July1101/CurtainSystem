package db

type Curtain struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	VersionId   string  `form:"version_id" json:"version_id"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	Factory     string  `form:"factory" json:"factory"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}

type Yarn struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	State       bool    `form:"state" json:"state"`
	VersionId   string  `form:"version_id" json:"version_id"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}

type Belt struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	State       bool    `form:"state" json:"state"`
	VersionId   string  `form:"version_id" json:"version_id"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}
type Lace struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	State       bool    `form:"state" json:"state"`
	VersionId   string  `form:"version_id" json:"version_id"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}

type Valance struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	State       bool    `form:"state" json:"state"`
	VersionId   string  `form:"version_id" json:"version_id"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}

type Circle struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	State       bool    `form:"state" json:"state"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}

type Ring struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	State       bool    `form:"state" json:"state"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}

type Pole struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	State       bool    `form:"state" json:"state"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}

type Pole2 struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	State       bool    `form:"state" json:"state"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}

type Other struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	Type        string  `form:"type" json:"type"`
	State       bool    `form:"state" json:"state"`
	Name        string  `form:"name" json:"name"`
	Cost        float64 `form:"cost" json:"cost"`
	Price       float64 `form:"price" json:"price"`
	Unit        string  `form:"unit" json:"unit"`
	TotalAmount float64 `form:"total_amount" json:"total_amount"`
	TotalOrder  int     `json:"total_order"`
	TotalNum    float64 `json:"total_num"`
}

type Address struct {
	ID  int    `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	Add string `json:"add" form:"add"`
}

type Fac struct {
	Factory string `gorm:"primaryKey"`
	Man     string
	Phone   string
}
