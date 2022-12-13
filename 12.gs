package main

import ( 
    "bufio"
    "fmt"
    "log"
	"os"
	"time"
	"strconv"
	//"strings"
	//"regexp"
	//"math"
	//"sort"
) 

func main() {
  
	inputData := readFileAsString("input/12.txt")

	start := time.Now()
	
	fmt.Println("inputData = ", inputData)

	xPos := 0
	yPos := 0

	xPosW := 10
	yPosW := 1

	direction := "E"
	counter := 0

	fmt.Println("xPos, yPos, direction = ", xPos, yPos, direction)

	for counter < len(inputData){

		fmt.Println("step ", counter)
		xPos, yPos, direction, xPosW, yPosW = navigate2(xPos, yPos, direction, inputData[counter], xPosW, yPosW)
		fmt.Println("xPos, yPos, direction = ", xPos, yPos, direction)

		fmt.Println("--------------------- ")
		counter++
	}

	if xPos < 0 {
		xPos = 0-xPos
	}
	if yPos < 0 {
		yPos = 0-yPos
	}
	result := xPos + yPos

	fmt.Println("result = ", result)
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}



func navigate(xPos int, yPos int, direction string, orderString string)(int, int, string){

	order := string(orderString[0])
	quantity, _ := strconv.Atoi(orderString[1:len(orderString)])

	switch order {
	case "N":
		return xPos + quantity, yPos, direction
	case "E":
		return xPos, yPos + quantity, direction
	case "S":
		return xPos - quantity, yPos, direction
	case "W":
		return xPos, yPos - quantity, direction

	case "F":
		newOrder := direction + strconv.Itoa(quantity)
		return navigate(xPos, yPos, direction, newOrder)
	case "R":
		return xPos, yPos, turnR(direction, quantity)
	case "L":
		return xPos, yPos, turnR(direction, 360-quantity)

	}


	return xPos, yPos, direction
}

func navigate2(xPos int, yPos int, direction string, orderString string, xPosW int, yPosW int)(int, int, string, int, int){

	order := string(orderString[0])
	quantity, _ := strconv.Atoi(orderString[1:len(orderString)])

	switch order {
	case "N":
		return xPos, yPos, direction, xPosW, yPosW + quantity
	case "E":
		return xPos, yPos, direction, xPosW + quantity, yPosW
	case "S":
		return xPos, yPos, direction, xPosW, yPosW - quantity
	case "W":
		return xPos, yPos, direction, xPosW - quantity, yPosW

	case "F":

		newXPos := xPos + quantity * (xPosW - xPos)
		newYPos := yPos+ quantity * (yPosW - yPos)
		newXPosW := newXPos + (xPosW - xPos)
		newYPosW := newYPos + (yPosW - yPos)

		return newXPos, newYPos, direction, newXPosW, newYPosW

	case "R":
		newXPosW, newYPosW := turnRWaypoint(xPos, yPos, xPosW, yPosW, quantity)

		return xPos, yPos, direction, newXPosW, newYPosW
	case "L":
		newXPosW, newYPosW := turnRWaypoint(xPos, yPos, xPosW, yPosW, 360-quantity)

		return xPos, yPos, direction, newXPosW, newYPosW

	}


	return xPos, yPos, direction, xPosW, yPosW
}


func turnR(startingDirection string, degree int) string{
	
	switch startingDirection {
	case "E":
		if degree == 90{
			return "S"
		}
		if degree == 180{
			return "W"
		}
		if degree == 270{
			return "N"
		}
		return "E"

	case "S":
		if degree == 90{
			return "W"
		}
		if degree == 180{
			return "N"
		}
		if degree == 270{
			return "E"
		}
		return "S"
	
	case "W":
		if degree == 90{
			return "N"
		}
		if degree == 180{
			return "E"
		}
		if degree == 270{
			return "S"
		}
		return "W"

	case "N":
		if degree == 90{
			return "E"
		}
		if degree == 180{
			return "S"
		}
		if degree == 270{
			return "W"
		}
		return "N"

	}

	return "gigi"

}

func turnRWaypoint(xPos int, yPos int, xPosW int, yPosW int, degree int) (int, int){
	

	xDiff := xPosW - xPos
	yDiff := yPosW - yPos

	switch degree {

	case 90:
		xPosW = xPos + yDiff
		yPosW = yPos - xDiff

		return xPosW, yPosW
	

	case 180:

		xPosW = xPos - xDiff
		yPosW = yPos - yDiff

		return xPosW, yPosW

	case 270:

		xPosW = xPos - yDiff
		yPosW = yPos + xDiff

		return xPosW, yPosW

	}

	return 0,0

}


func printSlice(mySlice []string){

	counter := 0
	for counter < len(mySlice) {
		fmt.Println(mySlice[counter])
		counter++
	}
}

func areStringSliceEqual(slice1 []string, slice2 []string) bool {

	counter := 0
	if len(slice1) != len(slice2){
		return false
	}
	for counter < len(slice1){

		if slice1[counter] != slice2[counter]{
			return false
		}

		counter++

	}

	return true
}


func sliceContains(s []int, e int) bool {
    for _, a := range s {
        if a == e {
            return true
        }
    }
    return false
}

func readFileAsString(inputFile string) []string {

	file, err := os.Open(inputFile)
	output := []string{}
    
    if err != nil { 
        log.Fatalf("failed to open") 
	} 
	
    scanner := bufio.NewScanner(file) 
    scanner.Split(bufio.ScanLines) 

	for scanner.Scan() {
		var tempString = scanner.Text()
		if err == nil {
		}
        output = append(output, tempString)
	}

	file.Close() 
	return output
}

func readFileAsInt(inputFile string) []int {

	file, err := os.Open(inputFile)
	output := []int{}
    
    if err != nil { 
        log.Fatalf("failed to open") 
	} 
	
    scanner := bufio.NewScanner(file) 
    scanner.Split(bufio.ScanLines) 

	for scanner.Scan() {
		var tempString = scanner.Text()
		if err == nil {
		}
		tempInt,_ := strconv.Atoi(tempString)
        output = append(output, tempInt)
	}

	file.Close() 
	return output
}