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
) 

func main() { 
  
	inputData := readFile("input/7.txt")

	start := time.Now()

	bagMap := getBagMap(inputData)
	
	bagInside := whichBagInsideThisBag("shiny gold", bagMap)

	var counter int = 0
	var oldBagCounter int = 0

	lastBags := bagInside

	for oldBagCounter < len(bagInside){
		fmt.Println("oldBagCounter = ", oldBagCounter)
		fmt.Println("len(bagInside) = ", len(bagInside))
		oldBagCounter = len(bagInside)
		lastBags = lookInsideBags(lastBags, bagMap)
		bagInside = append(bagInside,lastBags...)
		counter++
	}
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}

func lookInsideBags(containersBagSlice []string, bagMap map[string]string) []string {

	container := []string{}
	var counter int = 0
	for counter < len(containersBagSlice) {
		bagName := containersBagSlice[counter]
		var newBags []string = whichBagInsideThisBag(bagName, bagMap)
		container = append(container,newBags...)
		counter++
	}

	return container

}


func searchBags(containersBagMap map[string]int, bagMap map[string]string, level int) map[string]int {

	newContainer := []string{}
	for bagName, _ := range containersBagMap {
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

	for key, value := range bagMap {
		if strings.Contains(value, bagName){
			result = append(result, key)
		}		
	}
	return result
}


func whichBagInsideThisBag(parentBagName string, bagMap map[string]string) []string{
	result := []string{}

	for key, value := range bagMap {

		if strings.Contains(key, parentBagName){
			rowSlice := strings.Split(value,",")

			var counter int = 0
			for counter < len(rowSlice){

				bagDescription := rowSlice[counter]
				bagSlice := strings.Split(bagDescription," ")

				var bagNumberCouner int = 0
				var bagNumber , _ = strconv.Atoi(bagSlice[1])

				for bagNumberCouner < bagNumber{
					bagName := bagSlice[2] + " " + bagSlice[3]
					result = append(result, bagName)
					bagNumberCouner++
				}

				counter++
			}
		}		
	}
	return result
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