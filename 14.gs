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
	//"math"
	//"sort"
) 

func main() {
  
	inputData := readFileAsString("input/14.txt")

	start := time.Now()
	
	fmt.Println("inputData = ", inputData)


	result := 0
	fmt.Println("result = ", result)
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}


func readInput(inputData []string ) map[string]string {

	counter := 0

	var tempStorage map[string]string
	tempStorage = make(map[string]string)

	mask := ""

	for counter < len(inputData){

		rawInstruction := inputData[counter]
		instructionSlice := strings.Split(rawInstruction," = ")

		if strings.Contains(instructionSlice[0],"mask"){
			mask = instructionSlice[1]
			counter++
			rawInstruction := inputData[counter]
			instructionSlice := strings.Split(rawInstruction," = ")
			rawMemLocation := instructionSlice[0]

			for (counter < len(inputData) && strings.Contains(rawMemLocation,"mem")){
				memLocation := strings.Split(strings.Split(rawMemLocation,"[")[1],"]")[0]
				memDataString, _ := strconv.Atoi(instructionSlice[1])
				memData:= int64(memDataString)
				binaryMemData := strconv.FormatInt(memData, 2)


			}


		} else {
			fmt.Println("skipping instruction : ", rawInstruction)
			counter++
		}

	}

	return tempStorage

}


func doOperationWithMask(binaryMemData string, mask string) string{



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