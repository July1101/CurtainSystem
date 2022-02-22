package middleware

import "github.com/gin-gonic/gin"

func SetHeader (c *gin.Context){
	c.Header("Access-Control-Allow-Origin","http://localhost:8080")
	c.Header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
	c.Header("Access-Control-Allow-Credentials","true")
	c.Next()
}
