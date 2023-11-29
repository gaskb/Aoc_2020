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
  
	inputData := []int{0,3,6}

	start := time.Now()
	
	fmt.Println("inputData = ", inputData)


	result := 0
	fmt.Println("result = ", result)
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}


func getTheFinalAnswer(startingSlice []int, numberOfCicles int) int{

	counter := 0
	for counter < numberOfCicles{
		giveMeTheNextAnswer(startingSlice)
		startingSlice = append(startingSlice, answer)
	}

}



func giveMeTheNextAnswer(mySlice []int, number int ) int {

	counter := 0
	for counter < len(mySlice){

		if mySlice[counter] == number {
			return counter
		}
		counter++
	}

	return 0

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