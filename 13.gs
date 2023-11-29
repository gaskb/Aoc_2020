package main

import ( 
    "bufio"
    "fmt"
    "log"
	"os"
	"time"
	"strconv"
	"strings"
	//"regexp"
	"math"
	//"sort"
) 

func main() {
  
	inputData := readFileAsString("input/13.txt")

	start := time.Now()
	
	fmt.Println("inputData = ", inputData)

	arrivalTime, _ := strconv.Atoi(inputData[0])

	busIdSlice := getBusIdSlice(inputData[1])

	firstBusId, firstBusTime := getFirstBus(busIdSlice, arrivalTime)

	fmt.Println("arrivalTime = ", arrivalTime)
	fmt.Println("----------------- ")
	fmt.Println("firstBusId = ", firstBusId)
	fmt.Println("firstBusTime = ", firstBusTime)

	waitTime := firstBusTime - arrivalTime

	fmt.Println("waitTime = ", waitTime)

	result := waitTime * firstBusId
	fmt.Println("result = ", result)
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}


func getFirstBus(busIds []int, arrivalTime int) (int, int){

	counter := 0

	firstBusId := 0
	firstBusTime := 0

	for counter < len(busIds){
		busId := busIds[counter]
		firstBusIdTime := getFirstBusAfterTime(busId, arrivalTime)

		if firstBusId == 0 {
			firstBusId = busId
			firstBusTime = firstBusIdTime
		} else {
			if firstBusIdTime < firstBusTime{
				firstBusId = busId
				firstBusTime = firstBusIdTime
			}
		}
		counter++
	}


	return firstBusId, firstBusTime
}


func getFirstBusAfterTime(busId int, arrivalTime int) int {

	d := float64(arrivalTime / busId)
	tourN := int(math.Ceil(d))

	firstTimeAfterArrival := tourN * busId

	if firstTimeAfterArrival < arrivalTime{
		firstTimeAfterArrival = firstTimeAfterArrival + busId
	}
	return firstTimeAfterArrival


}


func getBusIdSlice(busIdString string) []int {
	
	busCompleteSlice := strings.Split(busIdString,",")

	result := []int{}
	counter := 0
	for counter < len(busCompleteSlice){
		busId := busCompleteSlice[counter]
		if busId != "x"{
			intBusId, _ := strconv.Atoi(busId)
			result = append(result, intBusId)
		}

		counter++
	}

	return result
}



//Utils

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