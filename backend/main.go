package main

import (
	"encoding/base64"
	"image"
	"image/color/palette"
	"image/draw"
	"image/gif"
	"image/png"
	"log"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type Upload struct {
	FPS    int      `json:"fps"`
	Images []string `json:"images"`
}

func main() {
	setup()
	app := fiber.New()
	app.Post("/upload", func(c *fiber.Ctx) error {
		data := &Upload{}
		c.BodyParser(data)
		folderName := createBase64ToFile(data.Images, uuid.NewString())
		done, er := generateGIF(folderName, folderName)
		if er == nil && done {
			return c.SendFile(folderName + ".gif")
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

func generateGIF(dir string, fileName string) (done bool, er error) {
	//Read images folder from dir.
	files, err := os.ReadDir(dir)
	outGif := &gif.GIF{LoopCount: 0}
	if err != nil {
		return false, err
	}
	//Add images to outGif.
	for _, file := range files {
		//Read png file.
		f, _ := os.Open(dir + "/" + file.Name())
		img, DecodeError := png.Decode(f)
		if DecodeError != nil {
			panic(DecodeError)
		}
		f.Close()
		// Create a new paletted image.
		palettedImage := image.NewPaletted(img.Bounds(), palette.Plan9)
		// Copy the pixels from the original image to the paletted image.
		draw.Draw(palettedImage, img.Bounds(), img, img.Bounds().Min, draw.Src)
		outGif.Image = append(outGif.Image, palettedImage)
		outGif.Delay = append(outGif.Delay, 0)
	}
	//Create gif file
	x, _ := os.OpenFile(fileName+".gif", os.O_WRONLY|os.O_CREATE, 0600)
	defer x.Close()
	gif.EncodeAll(x, outGif)
	return true, nil
}

func setup() {
	_, err := os.ReadDir("temp")
	if err != nil {
		er := os.Mkdir("temp", os.ModeAppend)
		if er != nil {
			log.Println("Field to create temp")
		}
		return
	}
}
