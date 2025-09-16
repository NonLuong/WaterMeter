package entity

import (
	"time"

	"gorm.io/gorm"
)

type WaterMeterValue struct {
	gorm.Model
	MeterValue      int
	Timestamp       time.Time
	ModelConfidence float64 `json:"ModelConfidence"`
	Note            string
	ImagePath       string

	CameraDeviceID uint
	CameraDevice   *CameraDevice `gorm:"foreignKey:CameraDeviceID"`

	UserID uint
	User   Users `gorm:"foreignKey:UserID"`

	StatusID uint
	Status   StatusWaterValue `gorm:"foreignKey:StatusID"`
}
