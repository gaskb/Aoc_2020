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
  
	inputData := readFile("input/6.txt")

	start := time.Now()

	groupSlices := getGroupsSlice(inputData)
	var totalValue int = 0
	var counter int = 0
	for counter < len(groupSlices) {
		group := groupSlices[counter]

		fmt.Println("group = ", group)
		//value := getGroupValue(group)
		value := getEnhancedGroupValue(group)
		totalValue = totalValue + value


		fmt.Println("value = ", value)


		counter++
	}

	fmt.Println("totalValue = ", totalValue)

	

	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}

func getGroupsSlice (inputData []string) []string{
	result := []string{}

	var partialRowString string = ""
	var tempRowString string = ""
	var counter int = 0

	for counter < len(inputData) {
		tempRowString = inputData[counter]

		if (tempRowString != ""){
			partialRowString = partialRowString + " " + tempRowString
		} else {
			result = append(result,partialRowString)
			partialRowString = ""
		}
		counter++
	}

	result = append(result,partialRowString)
	
	return result
}


func getGroupValue(group string) int{

	var tempStorage map[string]int
	tempStorage = make(map[string]int)

	var position int = 0

	for position < len(group){
		key := string(group[position])
		fmt.Println("key = ", key)

		if (key != "" && key != " ")  {
			tempStorage[key] = 1
		}
		position ++
	}

	result := len(tempStorage)

	return result
}

func getEnhancedGroupValue(group string) int{

	var tempStorage map[string]int
	tempStorage = make(map[string]int)

	var people int = 0
	var result int = 0
	var position int = 0

	for position < len(group){
		key := string(group[position])
		fmt.Println("key = ", key)

		if (key != "" && key != " ")  {
			if tempStorage[key] == 0{
				tempStorage[key] = 1
			} else{
				tempStorage[key] = tempStorage[key] + 1
			}
		}
		if (key == " ")  {
			people++
		}
		position++
	}

	fmt.Println("people = " + strconv.Itoa(people))
	for key, value := range tempStorage {
		fmt.Println("key , value = " + key + " - " + strconv.Itoa(value))
		if value == people{
			result++
		}		
	}

	fmt.Println("result = ", result)


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