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
	"sort"
) 

func main() {
  
	inputData := readFileAsInt("input/10.txt")

	start := time.Now()

	sort.Ints(inputData)
	
	fmt.Println("inputData = ", inputData)

	differenceMap, differenceSlice := getDifferenceBetweenValues2(inputData)

	fmt.Println("differenceMap = ", differenceMap)

	result1 := (differenceMap[1] + 1 ) * (differenceMap[3] + 1)

	fmt.Println("result1 = ", result1)

	result2 :=getArrangements(differenceSlice)

	fmt.Println("result2 = ", result2)
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}


func getDifferenceBetweenValues(valueSlice []int) map[int]int {

	var result map[int]int
	result = make(map[int]int)

	oldValue := 1
	counter := 0

	for counter < len(valueSlice) {
		
		fmt.Println("counter = ", counter)
		value := valueSlice[counter]
		//fmt.Println("value = ", value)
		if value == oldValue{
			counter++
			continue
		}
		diff := value - oldValue

		fmt.Println("value = ", value, " oldValue = ", oldValue, " diff = ", diff)

		oldValue = value
		result[diff] = result[diff] + 1
		counter++
	}

	return result
}

func getDifferenceBetweenValues2(valueSlice []int) (map[int]int, []int) {

	var result map[int]int
	result = make(map[int]int)

	resultSlice := []int{1}

	oldValue := 1
	counter := 0

	for counter < len(valueSlice) {
		
		fmt.Println("counter = ", counter)
		value := valueSlice[counter]
		//fmt.Println("value = ", value)
		if value == oldValue{
			counter++
			continue
		}
		diff := value - oldValue

		fmt.Println("value = ", value, " oldValue = ", oldValue, " diff = ", diff)

		oldValue = value
		result[diff] = result[diff] + 1
		resultSlice = append(resultSlice, diff)
		counter++
	}

	return result, resultSlice
}

func getArrangements(diffSlice []int) int {

	fmt.Println("diffSlice = ", diffSlice)
	
	result := 1
	counter := 0
	for counter < len(diffSlice) {
		first := 0
		second := 0
		third := 0
		forth := 0
		fifth := 0

		first = diffSlice[counter]
		if counter + 1 < len(diffSlice){
			second = diffSlice[counter + 1]
		}

		if counter + 2 < len(diffSlice){
			third = diffSlice[counter + 2]
		}

		if counter + 3 < len(diffSlice){
			forth = diffSlice[counter + 3]
		}

		if counter + 4 < len(diffSlice){
			fifth = diffSlice[counter + 4]
		}

		if (first == 1 && second == 1 && third == 1 && forth == 1 && fifth == 1) {
			fmt.Println("found 4*1 in position ", counter)
			result = result * 13
			counter = counter + 4
			continue
		} else {
			if (first == 1 && second == 1 && third == 1 && forth == 1) {
				fmt.Println("found 4*1 in position ", counter)
				result = result * 7
				counter = counter + 3
				continue
			} else{
				if (first == 1 && second == 1 && third == 1) {
					fmt.Println("found 3*1 in position ", counter)
					result = result * 4
					counter = counter + 2
					
					continue
				} else {
					if (first == 1 && second == 1 ) {
						fmt.Println("found 2*1 in position ", counter)
						result = result * 2 			
						counter = counter + 1
						continue
					}
				}
			}
		}
		
		//fmt.Println("first = ", first)
		//fmt.Println("second = ", second)
		//fmt.Println("third = ", third)
		fmt.Println("result = ", result)

		fmt.Println("-------------")

		counter++
	}

	return result

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