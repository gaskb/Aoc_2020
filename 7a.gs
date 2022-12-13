package main

import ( 
    "bufio"
    "fmt"
    "log"
	"os"
	"time"
	//"strconv"
	"strings"
	//"regexp"
	//"math"
) 

func main() { 
  
	inputData := readFile("input/7.txt")

	start := time.Now()

	bagMap := getBagMap(inputData)

	var containersBagMap map[string]int
	containersBagMap = make(map[string]int)


	containersBagMap["shiny gold"]=1
	var oldContainerLen int = 0
	var counter int = 0
	for len(containersBagMap)>oldContainerLen{
		counter ++
		oldContainerLen = len(containersBagMap)
		searchBags(containersBagMap, bagMap, counter)	
	}

	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}

func searchBags(containersBagMap map[string]int, bagMap map[string]string, level int) map[string]int {

	newContainer := []string{}
	for bagName, _ := range containersBagMap {
		//fmt.Println("key , value = " + key + " - " + value)
		var newBag []string = whichBagContainsThisBag(bagName, bagMap)
		newContainer = append(newContainer,newBag...)
	}

	containersBagMap = appendBagsToMap(newContainer, containersBagMap, level)
	fmt.Println("containersBagMap len = ", len(containersBagMap) -1)
	fmt.Println("containersBagMap = ", containersBagMap)
	fmt.Println("")

	return containersBagMap

}

func appendBagsToMap(newContainer[]string, containersBagMap map[string]int, level int) map[string]int{

	var counter int = 0
	for counter < len(newContainer) {
		
		row := newContainer[counter]
		if containersBagMap[row] == 0{
			containersBagMap[row] = level
		}

		counter++
	}

	return containersBagMap
}


func getBagMap(inputData[]string) map[string]string{

	var bagMap map[string]string
	bagMap = make(map[string]string)

	var counter int = 0
	for counter < len(inputData) {
		
		row := inputData[counter]
		rowSlice := strings.Split(row,"contain")

		container := strings.Split(rowSlice[0],"bags")[0]
		contains := rowSlice[1]

		bagMap[container] = contains

		counter++
	}

	return bagMap

}

func whichBagContainsThisBag(bagName string, bagMap map[string]string) []string{
	result := []string{}
	//var bagMap map[string]string

	for key, value := range bagMap {
		//fmt.Println("key , value = " + key + " - " + value)
		if strings.Contains(value, bagName){
			result = append(result, key)
		}		
	}

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