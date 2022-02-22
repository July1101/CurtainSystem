package initialize

import (
	"ManageSystem/controller"
	"ManageSystem/middleware"
	"github.com/gin-gonic/gin"
)

func RunSystemSetRouter() {
	r := gin.Default()
	r.Use(middleware.SetHeader)

	r.OPTIONS("/login", controller.ToLogin)
	r.POST("/login", controller.ToLogin)

	g := r.Group("/curtain")
	{
		g.GET("/add", controller.AddCurtain)
		g.GET("/list", controller.GetCurtainsList)
		g.GET("/remove", controller.RemoveCurtain)
		g.GET("/edit", controller.EditCurtain)
	}

	belt := r.Group("/belt")
	{
		belt.GET("/add", controller.AddBelt)
		belt.GET("/list", controller.GetBeltList)
		belt.GET("/remove", controller.RemoveBelt)
		belt.GET("/edit", controller.EditBelt)
	}
	lace := r.Group("/lace")
	{
		lace.GET("/add", controller.AddLace)
		lace.GET("/list", controller.GetLaceList)
		lace.GET("/remove", controller.RemoveLace)
		lace.GET("/edit", controller.EditLace)
	}

	yarn := r.Group("/yarn")
	{
		yarn.GET("/add", controller.AddYarn)
		yarn.GET("/list", controller.GetYarnList)
		yarn.GET("/remove", controller.RemoveYarn)
		yarn.GET("/edit", controller.EditYarn)
	}
	valance := r.Group("/valance")
	{
		valance.GET("/add", controller.AddValance)
		valance.GET("/list", controller.GetValanceList)
		valance.GET("/remove", controller.RemoveValance)
		valance.GET("/edit", controller.EditValance)
	}

	other := r.Group("/other")
	{
		other.GET("/add", controller.AddOther)
		other.GET("/list", controller.GetAllOtherList)
		other.GET("/list2", controller.GetOtherTypeList)
		other.GET("/remove", controller.RemoveOther)
		other.GET("/edit", controller.EditOther)
	}

	bill := r.Group("/bill")
	{
		bill.GET("/curtain/name", controller.GetCurtainName)
		bill.GET("/address", controller.GetBillAddress)
		bill.GET("/circle", controller.GetBillCircle)
		bill.GET("/lace", controller.GetBillLace)
		bill.GET("/pole", controller.GetBillPole)
		bill.GET("/yarn/name", controller.GetBillYarnName)
		bill.GET("/yarn/id", controller.GetYarnID)
		bill.GET("/yarn/price", controller.GetYarnPrice)
		bill.GET("/curtain/id", controller.GetCurtainID)
		bill.GET("/curtain/price", controller.GetCurtainPrice)
		bill.GET("/valance", controller.GetBillValance)

		bill.POST("/submit", controller.NewOrder)
		bill.OPTIONS("/submit", func(context *gin.Context) {
			context.JSON(200, nil)
		})
		bill.POST("/update", controller.UpdateBill)
		bill.OPTIONS("/update", func(context *gin.Context) {
			context.JSON(200, nil)
		})
		bill.GET("/list", controller.GetOrderList)
		bill.GET("/remove", controller.DeleteOrder)
		bill.GET("/updateState", controller.UpdateBillState)

	}
	r.GET("/fac/list", controller.GetFacList)

	input := r.Group("/input")
	{
		input.GET("/list", controller.InputList)
		input.GET("/add", controller.AddInput)
		input.GET("/remove", controller.RemoveInput)
	}

	output := r.Group("/output")
	{
		output.GET("/list", controller.OutputList)
		output.GET("/add", controller.AddOutput)
		output.GET("/remove", controller.RemoveOutput)
	}

	fac := r.Group("/fac")
	{
		fac.GET("/year", controller.GetLastYearData)
		fac.GET("every10days", controller.GetEvery10DaysData)
		fac.GET("/part1", controller.GetPart1Data)
		fac.GET("/part2", controller.GetPart2Data)
	}

	fahuo := r.Group("/fahuo")
	{
		fahuo.POST("/add", controller.AddFahuo)
		fahuo.GET("/list", controller.FahuoList)
		fahuo.GET("/fac", controller.FahuoCurFac)
		fahuo.GET("/cur/name", controller.FahuoCurName)
		fahuo.GET("/cur/code", controller.FahuoCurCode)
		fahuo.GET("/cur/cost", controller.FahuoCurCost)
	}

	r.Run(":5000")
}
