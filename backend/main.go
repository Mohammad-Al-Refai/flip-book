package main

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"image"
	"image/color/palette"
	"image/draw"
	"image/gif"
	"image/png"
	"syscall/js"
)

type Payload struct {
	Result interface{}
	Error  error
}

func main() {
	js.Global().Set("getGif", js.FuncOf(handleArray))
	select {}
}
func handleArray(this js.Value, args []js.Value) interface{} {
	payload := Payload{}
	if len(args) != 1 {
		panic(fmt.Sprintf("expected one argument, got %d", len(args)))
	}
	arr := args[0]
	if arr.Type() != js.TypeObject {
		payload.Error = fmt.Errorf(fmt.Sprintf("expected an array, got %s", arr.Type()))
		return payload
	}
	goSlice := make([]interface{}, arr.Length())
	for i := 0; i < arr.Length(); i++ {
		element := arr.Index(i)
		goSlice[i] = element.String()
	}
	result, error := generateGIF(goSlice)
	payload.Error = error
	payload.Result = result
	var jsObj = make(map[string]interface{})
	jsObj["error"] = payload.Error
	jsObj["result"] = payload.Result

	return js.ValueOf(jsObj)
}

// Accept array of base64 string
func generateGIF(frames []interface{}) (string, error) {
	outGif := &gif.GIF{LoopCount: 0}
	//Add images to outGif.
	for _, frame := range frames {
		//Read png file.
		decodeBase64, err := readPNGBase64(frame.(string))
		if err != nil {
			return "", err
		}
		img, DecodeError := png.Decode(bytes.NewReader(decodeBase64))
		if DecodeError != nil {
			return "", DecodeError
		}
		//Create a new paletted image.
		palettedImage := image.NewPaletted(img.Bounds(), palette.Plan9)
		//Copy the pixels from the original image to the paletted image.
		draw.Draw(palettedImage, img.Bounds(), img, img.Bounds().Min, draw.Src)
		outGif.Image = append(outGif.Image, palettedImage)
		outGif.Delay = append(outGif.Delay, 0)
		fmt.Printf("GIF: %+v\n", outGif.Image)
	}
	var buff bytes.Buffer
	gif.EncodeAll(&buff, outGif)
	encoded := base64.StdEncoding.EncodeToString(buff.Bytes())
	return encoded, nil
}
func readPNGBase64(value string) ([]byte, error) {
	return base64.StdEncoding.DecodeString(value)
}
