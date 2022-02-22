package controller

import (
	CBResponse "ManageSystem/callBackResponse"
	"github.com/gin-gonic/gin"
)

type User struct {
	Username string
	Password string
}

func ToLogin(c *gin.Context) {

	var user User
	c.ShouldBind(&user)
	CBResponse.Success(c,"user","")
}
