/*
Copyright © 2022 Dimitri Prosper <dimitri.prosper@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strconv"
	"strings"

	"dprosper/hw-ce/internal/logger"
	"dprosper/hw-ce/internal/middleware/common"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/contrib/gzip"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

// Formvalue struct
type Formvalue struct {
	Secret string `json:"secret" binding:"required"`
}

// Env struct
type Env struct {
	Key   string `json:"key" binding:"required"`
	Value string `json:"value" binding:"required"`
}

func verifySecret() gin.HandlerFunc {
	return func(c *gin.Context) {
		var form Formvalue
		if err := c.ShouldBindJSON(&form); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		fmt.Println(form.Secret)
		match := form.Secret == os.Getenv("APP_SECRET") //TODO: Read from env.Secret
		if !match {
			c.JSON(http.StatusOK, gin.H{"status": "failure", "message": "The secret provided is not a match."})
			c.Abort()
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "success", "message": "The secret provided is a match."})
	}
}

func readData() gin.HandlerFunc {
	return func(c *gin.Context) {
		random, _ := ioutil.ReadFile("data/random.json")
		c.Data(http.StatusOK, "application/json", random)
	}
}

func readEnv() gin.HandlerFunc {
	return func(c *gin.Context) {
		envs := []Env{}

		for _, env := range os.Environ() {
			kv := strings.SplitN(env, "=", 2)
			if kv[0] != "APP_SECRET" {
				envs = append(envs, Env{Key: kv[0], Value: kv[1]})
			}
		}
		c.JSON(http.StatusOK, envs)
	}
}

func main() {
	logger.InitLogger(true, true, true)

	// comment this next line to debug during development
	gin.SetMode(gin.ReleaseMode)

	// Set the router as the default one shipped with Gin
	router := gin.Default()

	router.Use(gzip.Gzip(gzip.DefaultCompression))

	router.Use(common.RedirectHttps())

	router.Use(logger.GinLogger("gin-logger"))

	router.GET("/api/read", readData())

	router.GET("/api/env", readEnv())

	router.POST("/api/verify", verifySecret())

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "UP"})
	})

	// Serve the webui app
	router.Use(static.Serve("/", static.LocalFile("./public", true)))

	router.NoRoute(func(c *gin.Context) {
		dir, file := path.Split(c.Request.RequestURI)
		ext := filepath.Ext(file)
		if file == "" || ext == "" {
			c.File("./public/index.html")
		} else {
			c.File("./public" + path.Join(dir, file))
		}
	})

	addr := ":" + strconv.Itoa(3001)
	srv := &http.Server{
		Addr:    addr,
		Handler: router,
	}

	logger.SystemLogger.Info("starting server", zap.String("start", "true"))
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		logger.ErrorLogger.Fatal("error starting server", zap.String("error: ", err.Error()))
	}
}
