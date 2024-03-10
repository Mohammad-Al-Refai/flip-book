package main

//TODO unable to delete the generated gif files
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

func main() {
	js.Global().Set("getGif", js.FuncOf(handleArray))
	select {}
}
func handleArray(this js.Value, args []js.Value) interface{} {
	if len(args) != 1 {
		panic(fmt.Sprintf("expected one argument, got %d", len(args)))
	}
	arr := args[0]
	if arr.Type() != js.TypeObject {
		panic(fmt.Sprintf("expected an array, got %s", arr.Type()))
	}
	goSlice := make([]interface{}, arr.Length())
	for i := 0; i < arr.Length(); i++ {
		element := arr.Index(i)
		goSlice[i] = element.String()
	}

	return generateGIF(goSlice)
}

// Accept array of base64 string
func generateGIF(frames []interface{}) string {
	outGif := &gif.GIF{LoopCount: 0}
	//Add images to outGif.
	for _, frame := range frames {
		//Read png file.
		decodeBase64, err := readPNGBase64(frame.(string))
		if err != nil {
			panic(err)
		}
		img, DecodeError := png.Decode(bytes.NewReader(decodeBase64))
		if DecodeError != nil {
			panic(DecodeError)
		}
		//Create a new paletted image.
		palettedImage := image.NewPaletted(img.Bounds(), palette.Plan9)
		//Copy the pixels from the original image to the paletted image.
		draw.Draw(palettedImage, img.Bounds(), img, img.Bounds().Min, draw.Src)
		outGif.Image = append(outGif.Image, palettedImage)
		outGif.Delay = append(outGif.Delay, 0)
		fmt.Printf("GIF: %+v\n", outGif)
	}
	var buff bytes.Buffer
	gif.EncodeAll(&buff, outGif)
	// datas := buff.Bytes()

	// // Encode to base64 string
	encoded := base64.StdEncoding.EncodeToString(buff.Bytes())
	return encoded
}
func readPNGBase64(value string) ([]byte, error) {

	return base64.StdEncoding.DecodeString(value)
}
