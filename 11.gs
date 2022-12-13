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
  
	inputData := readFileAsString("input/11.txt")

	start := time.Now()
	
	fmt.Println("inputData = ", inputData)

	startingHallStatus := inputData

	fmt.Println("startingHallStatus = ")
	printSlice(startingHallStatus)


	newMap := checkHall(startingHallStatus)

	fmt.Println("newMap = ")
	fmt.Println("")
	printSlice(newMap)
	fmt.Println("")
	fmt.Println("")

	oldMap := startingHallStatus
	counter := 0
	for !areStringSliceEqual(oldMap,newMap){
		oldMap = newMap
		newMap = checkHall(newMap)
		counter++
		fmt.Println("newMap (counter) = ", counter)
		fmt.Println("")
		printSlice(newMap)
		fmt.Println("")
		fmt.Println("")
	}


	result := countCharInSlice(newMap, "#")

	fmt.Println("result = ", result)
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}


func printSlice(mySlice []string){

	counter := 0
	for counter < len(mySlice) {
		fmt.Println(mySlice[counter])
		counter++
	}
}

func countCharInSlice(mySlice []string, char string) int{

	result := 0
	counter1 := 0
	for counter1 < len(mySlice) {
		counter2 := 0
		for counter2 < len(mySlice[counter1]) {
			if(string(mySlice[counter1][counter2]) == "#"){
				result++
			}
			counter2++
		}
		
		counter1++
	}

	return result
}

func checkHall(startingHallStatus []string) []string{

	fmt.Println("checkHall")
	
	result := []string{}

	rowCounter := 0
	for rowCounter < len(startingHallStatus){
		columnCounter := 0
		tempRow := ""
		for columnCounter < len(startingHallStatus[0]) {

			/*fmt.Println("columnCounter = ", columnCounter)
			fmt.Println("rowCounter = ", rowCounter)
			fmt.Println("startingHallStatus[rowCounter] = ", startingHallStatus[rowCounter])*/

			char := string(startingHallStatus[rowCounter][columnCounter])

			if char == "."{
				tempRow = tempRow + "."
			} else{
				people := checkSurrounding2(startingHallStatus , columnCounter, rowCounter)
				if char == "#"{
					if people > 4{
						tempRow = tempRow + "L"
					} else {
						tempRow = tempRow + "#"
					}
				}
				if char == "L"{
					if people == 0 {
						tempRow = tempRow + "#"
					} else {
						tempRow = tempRow + "L"
					}
				}
			}

			columnCounter++
		}
		result = append(result, tempRow)
		rowCounter ++
	}

	//fmt.Println("result = ", result)
	return result

}


func checkSurrounding(startingHallStatus []string, xPos int, yPos int) int{
	
	/*fmt.Println("checkSurrounding")
	fmt.Println("xPos = ", xPos)
	fmt.Println("yPos = ", yPos)*/

	peopleCounter := 0

	yCounter := 0
	for yCounter < len(startingHallStatus){

		if yCounter < (yPos - 1) || yCounter > (yPos + 1){
			yCounter++
			continue
		}
		rowString := startingHallStatus[yCounter]

		//fmt.Println("y = ", yCounter)

		xCounter := 0
		for xCounter < len(rowString){
			if xCounter < (xPos - 1) || xCounter > (xPos + 1) || 
				(xCounter == xPos && yCounter == yPos){
				xCounter++
				continue
			}

			//fmt.Println("x = ", xCounter)

			char := rowString[xCounter]
			//fmt.Println("char = ", string(char))

			if string(char) == "#"{
				//fmt.Println("char = ", string(char))
				//fmt.Println("found someone in ", yCounter, " - ", xCounter)
				peopleCounter++
			}
			xCounter++
		}

		yCounter++
	}

	//fmt.Println("peopleCounter pos (row, column) = (", xPos, " : ", yPos, ") ->",  peopleCounter)

	return peopleCounter
}

func checkSurrounding2(startingHallStatus []string, xPos int, yPos int) int{
	
	/*fmt.Println("checkSurrounding")
	fmt.Println("xPos = ", xPos)
	fmt.Println("yPos = ", yPos)*/

	peopleCounter := 0

	checkNO := checkNO(startingHallStatus, xPos, yPos)
	checkN := checkN(startingHallStatus, xPos, yPos)
	checkNE := checkNE(startingHallStatus, xPos, yPos)
	checkE := checkE(startingHallStatus, xPos, yPos)
	checkSE := checkSE(startingHallStatus, xPos, yPos)
	checkS := checkS(startingHallStatus, xPos, yPos)
	checkSO := checkSO(startingHallStatus, xPos, yPos)
	checkO := checkO(startingHallStatus, xPos, yPos)

	/*fmt.Println("checkNO = ", checkNO)
	fmt.Println("checkN = ", checkN)
	fmt.Println("checkNE = ", checkNE)
	fmt.Println("checkE = ", checkE)
	fmt.Println("checkSE = ", checkSE)
	fmt.Println("checkS = ", checkS)
	fmt.Println("checkSO = ", checkSO)
	fmt.Println("checkO = ", checkO)*/



	peopleCounter = checkNO + checkN + checkNE + checkE + checkSE + checkS + checkSO + checkO

	//fmt.Println("peopleCounter pos (row, column) = (", xPos, " : ", yPos, ") ->",  peopleCounter)

	return peopleCounter
}

func isInsideSlice(mySlice []string, xPos int, yPos int) bool {

	if xPos >= 0 && yPos >= 0 && yPos < len(mySlice) && xPos < len(mySlice[yPos]){
		return true
	}
	return false
}

func isEmptySeat(char string) bool{
	if char == "L"{
		return true
	}
	if char == "#"{
		return false
	}
	fmt.Println("isEmptySeat : non dovrei essere qui ")
	return true
}

func checkNO(mySlice []string, xPos int, yPos int) int{
	
	countX := xPos - 1
	countY := yPos - 1

	result := 0

	if isInsideSlice(mySlice, countX, countY){
		char := string(mySlice[countY][countX])
		
		if char == "."{
			result = checkNO(mySlice, countX, countY)
		} else {
			if isEmptySeat(char){
				return 0
			} else {
				return 1
			}
		}
	}
	
	return result

}

func checkN(mySlice []string, xPos int, yPos int) int{
	
	countX := xPos
	countY := yPos - 1

	result := 0

	if isInsideSlice(mySlice, countX, countY){
		char := string(mySlice[countY][countX])
		
		if char == "."{
			result = checkN(mySlice, countX, countY)
		} else {
			if isEmptySeat(char){
				return 0
			} else {
				return 1
			}
		}
	}
	
	return result

}

func checkNE(mySlice []string, xPos int, yPos int) int{
	
	countX := xPos + 1
	countY := yPos - 1

	result := 0

	if isInsideSlice(mySlice, countX, countY){
		char := string(mySlice[countY][countX])
		
		if char == "."{
			result = checkNE(mySlice, countX, countY)
		} else {
			if isEmptySeat(char){
				return 0
			} else {
				return 1
			}
		}
	}
	
	return result

}

func checkE(mySlice []string, xPos int, yPos int) int{
	
	countX := xPos + 1
	countY := yPos

	result := 0

	//fmt.Println("checkE : ", xPos, " - ", yPos, " - ", countX, " - ", countY)

	if isInsideSlice(mySlice, countX, countY){
		char := string(mySlice[countY][countX])
		
		if char == "."{
			//fmt.Println("found .")
			result = checkE(mySlice, countX, countY)
		} else {
			if isEmptySeat(char){
				//fmt.Println("found L")
				return 0
			} else {
				//fmt.Println("found #")
				return 1
			}
		}
	}
	
	return result

}

func checkSE(mySlice []string, xPos int, yPos int) int{
	
	countX := xPos + 1
	countY := yPos + 1

	result := 0

	if isInsideSlice(mySlice, countX, countY){
		char := string(mySlice[countY][countX])
		
		if char == "."{
			result = checkSE(mySlice, countX, countY)
		} else {
			if isEmptySeat(char){
				return 0
			} else {
				return 1
			}
		}
	}
	
	return result

}

func checkS(mySlice []string, xPos int, yPos int) int{
	
	countX := xPos
	countY := yPos + 1

	result := 0

	if isInsideSlice(mySlice, countX, countY){
		char := string(mySlice[countY][countX])
		
		if char == "."{
			result = checkS(mySlice, countX, countY)
		} else {
			if isEmptySeat(char){
				return 0
			} else {
				return 1
			}
		}
	}
	
	return result

}

func checkSO(mySlice []string, xPos int, yPos int) int{
	
	countX := xPos - 1
	countY := yPos + 1

	result := 0

	if isInsideSlice(mySlice, countX, countY){
		char := string(mySlice[countY][countX])
		
		if char == "."{
			result = checkSO(mySlice, countX, countY)
		} else {
			if isEmptySeat(char){
				return 0
			} else {
				return 1
			}
		}
	}
	
	return result

}

func checkO(mySlice []string, xPos int, yPos int) int{
	
	countX := xPos - 1
	countY := yPos

	result := 0

	if isInsideSlice(mySlice, countX, countY){
		char := string(mySlice[countY][countX])
		
		if char == "."{
			result = checkO(mySlice, countX, countY)
		} else {
			if isEmptySeat(char){
				return 0
			} else {
				return 1
			}
		}
	}
	
	return result

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