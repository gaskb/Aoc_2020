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
) 

func main() {
  
	inputData := readFileAsInt("input/9.txt")

	start := time.Now()

	preambleSize := 25
	
	numToFind := checkData(inputData, preambleSize)

	fmt.Println("numToFind = ", numToFind)

	numberSlice := checkData2(inputData, numToFind)

	fmt.Println("numberSlice = ", numberSlice)
	
	minValue := getMinValue(numberSlice)
	maxValue := getMaxValue(numberSlice)

	fmt.Println("minValue = ", minValue)
	fmt.Println("maxValue = ", maxValue)

	result := minValue + maxValue
	
	fmt.Println("result = ", result)
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}


func getMinValue(inputData []int) int{
	
	minVal := inputData[0]
	counter := 0
	for counter < len(inputData){
		currentVal := inputData[counter]
		if currentVal < minVal{
			minVal = currentVal
		}
		counter++
	}

	return minVal
}

func getMaxValue(inputData []int) int{
	
	maxVal := inputData[0]
	counter := 0
	for counter < len(inputData){
		currentVal := inputData[counter]
		if currentVal > maxVal{
			maxVal = currentVal
		}
		counter++
	}

	return maxVal
}

func checkData(inputData []int, preambleSize int) int {

	counter := preambleSize
	for counter < len(inputData){
		preambleStart := counter - preambleSize
		preambleStop := counter

		numToCheck := inputData[counter]
		if !checkNumber(numToCheck, inputData, preambleStart, preambleStop){
			return numToCheck
		}
		counter++
	}
	return 0
}

func checkData2(inputData []int, numToFind int) []int {

	startCounter := 0
	for startCounter < len(inputData){
		sum := 0
		counter := startCounter
		numberSlice := []int{}
		for sum < numToFind{
			currentNum := inputData[counter]
			numberSlice = append(numberSlice, currentNum)
			sum = sum + currentNum

			/*fmt.Println("currentNum = ", currentNum)
			fmt.Println("sum = ", sum)
			fmt.Println("counter = ", counter)*/
			counter++

			
		}

		if sum == numToFind{
			return numberSlice
		}
		startCounter++
	}	

	return []int{}

}


func checkNumber(numToCheck int, inputData []int, preambleStart int, preambleStop int) bool{

	//fmt.Println("checkNumber ", numToCheck)
	//fmt.Println("preambleStart = ", preambleStart, " - preambleStop", preambleStop)
	//fmt.Println(" -  ")

	currentRow := preambleStart
	currentRow2 := preambleStart 
	for currentRow < preambleStop {
		for currentRow2 < preambleStop{

			//fmt.Println("currentRow = ", currentRow, " - currentRow2", currentRow2)

			if currentRow == currentRow2{
				currentRow2++
				continue
			}
			currentSum := inputData[currentRow] + inputData[currentRow2]
			if (currentSum == numToCheck){

				//fmt.Println("currentRow = ", currentRow, " - currentRow2 = ", currentRow2)
				//fmt.Println("currentSum = ", currentSum, " - numToCheck = ", numToCheck)
				return true
			}
			currentRow2++
		}
		currentRow++
		currentRow2 = preambleStart
	}

	return false
}





func sliceContains(s []int, e int) bool {
    for _, a := range s {
        if a == e {
            return true
        }
    }
    return false
}



func readFile(inputFile string) []string {

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