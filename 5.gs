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
	"math"
) 

func main() { 
  
	inputData := readFile("input/5.txt")

	start := time.Now()
	var counter int = 0
	var highestSeatId int = 0
	var seatPositionSlice [][]int
	var seatIdSlice []int

	for counter < len(inputData) {
		boardingPass := inputData[counter]
		fmt.Println("boardingPass = " + boardingPass)
		row := getSeatRow(boardingPass)
		column := getSeatColumn(boardingPass)
		seatId := getSeatId(row, column)

		tempStruct := []int {row,column}

		seatPositionSlice = append(seatPositionSlice,tempStruct)
		seatIdSlice = append(seatIdSlice,seatId)

		if seatId > highestSeatId{
			highestSeatId = seatId
		}

		counter++
	}

	fmt.Println("highestSeatId = ", highestSeatId)

	orderPositionSeatSlice(seatPositionSlice)

	//mySeat := getMySeat(seatPositionSlice, seatIdSlice)

	//fmt.Println("mySeat = ", mySeat)

	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}

func orderPositionSeatSlice(seatPositionSlice [][]int) [128][8]int{

	var orderedSeatPositionSlice [128][8]int

	
	for sliceCounter := range seatPositionSlice {
			
			row := seatPositionSlice[sliceCounter][0]
			column := seatPositionSlice[sliceCounter][1]
			seatId := getSeatId(row, column)

			fmt.Println("row = " + strconv.Itoa(row) + " column = " + strconv.Itoa(column) + " id = " + strconv.Itoa(seatId) )
			
			orderedSeatPositionSlice[row][column] = seatId

    }

	fmt.Println("orderedSeatPositionSlice : %v", orderedSeatPositionSlice)

	return orderedSeatPositionSlice

}

func getMySeat(seatPositionSlice [][]int, seatIdSlice [] int) int{

	rowCounter := 0
	columnCounter := 0
	for rowCounter < 128{
		for columnCounter < 8{

		}
	}

	return 1

}

func getSeatRow(inputData string) int{
	rowData := inputData[0:7]
	var position int = 0
	var row int = 0

	for position < 7{
		if string(rowData[position]) == "B"{
			var power int = 6 - position
			row = row + int(math.Pow(2, float64(power)))
		}
		position++
	}
	fmt.Println("getSeatRow " + rowData + " = " + strconv.Itoa(row))
	return row
}

func getSeatColumn(inputData string) int{
	columnData := inputData[7:10]
	var position int = 0
	var column int = 0

	for position < 3{
		if string(columnData[position]) == "R"{
			var power int = 2 - position
			column = column + int(math.Pow(2, float64(power)))
		}
		position++
	}
	fmt.Println("getSeatRow " + columnData + " = " + strconv.Itoa(column))
	return column
}

func getSeatId(row int, column int) int{
	result := row * 8 + column
	return result
}



func readFile(inputFile string) []string {

	//file, err := os.Open("./input/3.txt")
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
			//fmt.Println("error")
		}
        output = append(output, tempString)
	}

	file.Close() 

	//fmt.Println("output:", output)
	return output
}