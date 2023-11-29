package main

import ( 
    "bufio"
    "fmt"
    "log"
	"os"
	"time"
	"strconv"
	"strings"
	"regexp"
) 

func main() { 
  
	inputData := readFile("input/4.txt")

	//requiredFields := []string{"ecl", "pid", "eyr", "hcl","byr", "iyr", "cid", "hgt"}
	requiredFields := []string{"ecl","pid","eyr","hcl","byr","iyr","hgt"}
	
	passportSlice := allDataInOneString(inputData)

	start := time.Now()
	var counter int = 0
	var validPassportCounter int = 0
	var passport string = ""

	for counter < len(passportSlice) {
		passport = passportSlice[counter]
		if(checkPassportKey(passport, requiredFields)){			
			if (checkPassportData(passport)){
				validPassportCounter++	
			}
		}
		counter++
	}

	

	fmt.Println("validPassportCounter = " + strconv.Itoa(validPassportCounter))
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
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

func Find(slice []string, val string) (int, bool) {
    for i, item := range slice {
        if item == val {
            return i, true
        }
    }
    return -1, false
}


func checkPassportKey(passport string, requiredFields []string ) bool{

	//fmt.Println("Parsing passport -> " + passport)

	passportSlice := strings.Split(passport," ")

	passportKeys := []string{}

	var passportSliceCounter int = 0
	for passportSliceCounter < len(passportSlice){
		tempKey := strings.Split(passportSlice[passportSliceCounter],":")[0]
		passportKeys = append(passportKeys, tempKey)
		passportSliceCounter++
	}

	//fmt.Println("passportKeys : %v", passportKeys)

	var requiredFieldsCounter int = 0
	
	for requiredFieldsCounter < len(requiredFields) {
		requiredField := requiredFields[requiredFieldsCounter]
		_, found := Find(passportKeys, requiredField)
		
		if !found {
			//fmt.Println("Value " + requiredField + " not found in slice")
			return false
		}
		//fmt.Printf(requiredField + " found at key: %d\n", key)
		
		requiredFieldsCounter++	
	}	

	return true
}

func checkPassportData (passport string) bool{

	fmt.Println("Parsing passport -> " + passport)

	passportSliceTmp := strings.Split(passport," ")

	passportSlice := [][]string{}

	var passportSliceCounter int = 0
	for passportSliceCounter < len(passportSliceTmp){

		if (passportSliceTmp[passportSliceCounter] == ""){
			fmt.Println("jump")
			passportSliceCounter++
			continue
		}
		
		//fmt.Println("passportSliceTmp : ", passportSliceTmp)
		//fmt.Println("passportSliceTmp[passportSliceCounter] : -" + passportSliceTmp[passportSliceCounter] + "-")

		tempKey := strings.Split(passportSliceTmp[passportSliceCounter],":")[0]
		//fmt.Println("passportSliceTmp : %v", passportSliceTmp)
		tempVal := strings.Split(passportSliceTmp[passportSliceCounter],":")[1]

		tempStruct := []string {tempKey,tempVal}
		passportSlice = append(passportSlice, tempStruct)

		passportKey := passportSlice[len(passportSlice)-1][0]
		passportVal := passportSlice[len(passportSlice)-1][1]

		//fmt.Println("passportKey  = " + passportKey)

		switch passportKey {
		case "byr":
			match, _ := regexp.MatchString("19[2-9][0-9]|200[1-2]", passportVal)
			if !match {
				fmt.Println("byr false : " + passportVal)
				return false
			}

		case "iyr":
			match, _ := regexp.MatchString("201[0-9]|2020", passportVal)
			if !match {
				fmt.Println("iyr false : " + passportVal)
				return false
			}
		case "eyr":
			match, _ := regexp.MatchString("20[0-9]|2030", passportVal)
			if !match {
				fmt.Println("eyr false : " + passportVal)
				return false
			}
		case "hgt":
			match, _ := regexp.MatchString("^[0-9]{3}cm$|^[0-9]{2}in$", passportVal)
			if !match {
				fmt.Println("hgt false : " + passportVal)
				return false
			}
			match2, _ := regexp.MatchString("1[5-8][0-9]cm|1[9][0-3]cm|[5-6][0-9]in|7[0-6]in", passportVal)
			if !match2 {
				fmt.Println("hgt false 2 : " + passportVal)
				return false
			}
		case "hcl":
			if !isColor(passportVal){
				fmt.Println("hcl false : " + passportVal)
				return false
			}
		case "ecl":
			eColor := []string {"amb","blu","brn","gry","grn","hzl","oth"}
			_, found := Find(eColor, passportVal)
			if !found{
				fmt.Println("ecl false : " + passportVal)
				return false
			}
		case "pid":
			match, _ := regexp.MatchString("[0-9]{9}", passportVal)

			if !match {
				fmt.Println("pid false : " + passportVal)
				return false
			}
		
		default:
			fmt.Println("---------------------" + passportVal + "-------------------------")
			
		}
		
		fmt.Println("check ok")
		passportSliceCounter++
	}

	fmt.Println("everuthing ok")
	return true
	
	/*fmt.Println("passportSlice : %v", passportSlice)
	fmt.Println("passportSlice[0]: %v", passportSlice[0])
	fmt.Println("passportSlice[0][0]: %v", passportSlice[0][0])
	fmt.Println("passportSlice[0][1]: %v", passportSlice[0][1])*/

	
}

func isColor(passportVal string) bool {

	fmt.Println("hcl -> ", passportVal)
	
	if passportVal[0:1] != "#"{
		return false
	}

	match, _ := regexp.MatchString("#[0-9a-f]{6}", passportVal)

	if !match {
		return false
	}
	fmt.Println("hcl[0:1] -> ", passportVal[0:1])
	return true
}


func allDataInOneString (inputData []string) []string{
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


// SimpleFunction prints a message
func isTree(row string, position int) bool{

	if(string(row[position])=="#"){
		return true
	}
	return false
}

func nextPosition(position int, rowSize int, step int) int{

	var nextPosition int = (position + step) % rowSize
	//var nextPosition int = position + step
	//if (nextPosition > rowSize){
	//	nextPosition = 0
	//}
	return nextPosition
}

func nextPosition2d(xPosition int, yPosition int, xStep int, yStep int, rowSize int) (int, int){

	var nextXPosition int = (xPosition + xStep) % rowSize
	var nextYPosition int = (yPosition + yStep)
	
	return nextXPosition, nextYPosition
}

func getTreeInSlope(xStep int, yStep int, treeMap []string) int {

	var treeMap_size int = len(treeMap)
	var tree_counter int = 0
	var xPosition int = 0
	var i int = 0
	//per ogni riga del file
	for i < treeMap_size {
		var row string= treeMap[i]
		
		var istree bool = isTree(row, xPosition)
		var istreeString string= "False"

		if (istree){
			istreeString = "True"
			tree_counter++
		}

		fmt.Println("row = " + strconv.Itoa(i) + " - nextPosition = " + strconv.Itoa(xPosition))
		fmt.Println("istree = " + istreeString + " - char  = " + string(row[xPosition]))

		xPosition = nextPosition(xPosition, len(row), xStep)
		i = i + yStep
	}
	fmt.Println("----------------------------------------------")
	fmt.Println("tree_counter = " + strconv.Itoa(tree_counter))
	fmt.Println("----------------------------------------------")
	return tree_counter
}
