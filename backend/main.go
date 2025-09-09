package main

import (
	"net/http"

	"example.com/sa-67-example/config"
	"example.com/sa-67-example/controller/genders"
	lineController "example.com/sa-67-example/controller/line"
	"example.com/sa-67-example/controller/meter"
	"example.com/sa-67-example/controller/notification"
	"example.com/sa-67-example/controller/upload_image"
	"example.com/sa-67-example/controller/users"
	"example.com/sa-67-example/controller/waterlog"
	"example.com/sa-67-example/controller/waterusage"
	"example.com/sa-67-example/controller/watervalue"
	"example.com/sa-67-example/middlewares"
	"example.com/sa-67-example/services"
	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
	config.Load()
	// ✅ เชื่อมต่อฐานข้อมูล และ Setup data
	config.ConnectionDB()
	config.SetupDatabase()

	// ✅ ดึง db ที่ถูกตั้งค่าแล้ว
	db := config.DB()

	// ✅ ส่ง db ให้ services ใช้
	services.SetDatabase(db)

	// ✅ เริ่ม Gin Server
	r := gin.Default()
	r.Use(CORSMiddleware())

	// ✅ Public routes
	r.POST("/signup", users.SignUp)
	r.POST("/signin", users.SignIn)

	r.GET("/genders", genders.GetAll)

	r.POST("/line/webhook", lineController.WebhookHandler)

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})
	r.Static("/uploads", "./uploads")

	// ✅ Protected routes
	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())

		router.PUT("/user/:id", users.Update)
		router.GET("/users", users.GetAll)
		router.GET("/user/:id", users.Get)
		router.DELETE("/user/:id", users.Delete)

		router.GET("/meters", meter.GetAllMeters)
		router.GET("/waterusages", waterlog.GetAllWaterUsageValues)
		router.GET("/waterdetail/:id", waterlog.GetCameraDeviceWithUsage)
		router.GET("/waterdetail", waterlog.GetAllCameraDevicesWithUsage)
		router.GET("/notifications/:id", notification.GetNotificationsByMeterLocation)
		router.GET("/notifications", notification.GetAllNotifications)
		router.POST("/meters", meter.CreateMeter)
		router.POST("/watervalue", watervalue.CreateWaterMeterValue)

		// ❗ หากต้องการให้ waterusage ใช้ auth ก็ย้ายเข้า router นี้
	}

	// ✅ API รับข้อมูลน้ำจาก ESP32 + ส่งให้ Frontend

	r.POST("/upload_image", upload_image.UploadMeterImage)

	r.POST("/api/water-usage", waterusage.PostWaterUsage)
	r.GET("/api/water-usage/latest", waterusage.GetLatestUsage)
	r.GET("/api/water-usage", waterusage.GetAllWaterUsage)
	r.GET("/api/water-usage/daily/:locationId", waterusage.GetDailyUsage)

	// ✅ Run server
	//r.Run("0.0.0.0:" + PORT)
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
