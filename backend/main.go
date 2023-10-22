package main

import (
	"encoding/base64"
	"fmt"
	"os"
	"os/exec"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type Upload struct {
	FPS    int      `json:"fps"`
	Images []string `json:"images"`
}

func main() {
	app := fiber.New()

	app.Post("/upload", func(c *fiber.Ctx) error {
		data := &Upload{}
		c.BodyParser(data)

		folderName := createBase64ToFile(data.Images, uuid.NewString())
		done, er := generateVideo(folderName, data.FPS)
		if er == nil&&done {
			return c.SendFile(folderName + "/output.mp4")
		}
		return c.SendString("error")
	})
	app.Listen(":4000")
}

func createBase64ToFile(b64s []string, id string) string {
	folderName := "temp/" + uuid.NewString()
	err := os.Mkdir(folderName, os.ModeAppend)
	if err != nil {
		panic(err)
	}
	for i, str := range b64s {
		dec, err := base64.StdEncoding.DecodeString(str)
		if err != nil {
			panic(err)
		}
		f, err := os.Create(folderName + "/" + "f-" + strconv.Itoa(i) + ".png")
		if err != nil {
			panic(err)
		}
		defer f.Close()

		if _, err := f.Write(dec); err != nil {
			panic(err)
		}
		if err := f.Sync(); err != nil {
			panic(err)
		}
	}
	return folderName
}

func generateVideo(dir string, fps int) (done bool, er error) {
	cm := exec.Command("ffmpeg", "-framerate", strconv.Itoa(fps), "-i", dir+"/f-%d.png", "-c:v", "libx264", dir+"/output.mp4")
	cm.Wait()
	// Start the command.
	err := cm.Start()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	err = cm.Wait()
	if err != nil {
		fmt.Println(err)
		done = false
		return done, err
	}
	done = true
	return done, nil
}
