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
  
	inputData := readFile("input/8.txt")

	start := time.Now()
	
	var counter int = 0
	var accumulator int = 0
	var finish bool = false
	var extCounter int = 0
	for extCounter < len(inputData){
		row := inputData[extCounter]
		if(strings.Contains(row, "jmp") || strings.Contains(row, "nop") ){
			fmt.Println("trying mod on extCounter = ", extCounter)
			counter, accumulator, finish = executeProgramMod(inputData, extCounter)
		}
		
		if finish{
			break
		}
		extCounter++

	}
	//counter, accumulator := executeProgram(inputData, 0)

	fmt.Println("counter = ", counter)
	fmt.Println("accumulator = ", accumulator)

	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}

func executeProgram(inputData []string) (int, int){

	var counter int = 0
	var accumulator int = 0
	instructionFlow := []int{}

	for counter < len(inputData){
		var counterMod int = 0
		row := inputData[counter]
		rowSlice := strings.Split(row," ")
		counterMod, accumulator = executeInstruction(counter, accumulator, rowSlice)
		
		if (counterMod == 0){
			counter++
		} else{
			counter = counter + counterMod
		}
		if sliceContains(instructionFlow, counter){
			fmt.Println("loop found")
			return counter, accumulator
		}
		instructionFlow = append(instructionFlow, counter)

	}

	fmt.Println("end program found")
	return counter, accumulator
}

func executeProgramMod(inputData []string, modRow int) (int, int, bool){

	var counter int = 0
	var accumulator int = 0
	instructionFlow := []int{}

	for counter < len(inputData){
		var counterMod int = 0
		row := inputData[counter]
		rowSlice := strings.Split(row," ")
		mod := false
		if modRow == counter{
			mod = true
		}
		counterMod, accumulator = executeInstructionMod(counter, accumulator, rowSlice, mod)
		
		if (counterMod == 0){
			counter++
		} else{
			counter = counter + counterMod
		}
		if sliceContains(instructionFlow, counter){
			fmt.Println("loop found")
			fmt.Println("counter = ", counter)
			fmt.Println("accumulator = ", accumulator)
			return counter, accumulator, false
		}
		instructionFlow = append(instructionFlow, counter)

	}

	fmt.Println("end program found")
	return counter, accumulator, true
}


func executeInstruction(counter int ,accumulator int, rawInstruction []string) (int, int){

	var counterMod int = 0
	instruction := rawInstruction[0]
	argument := rawInstruction[1]
	operator := string(argument[0])
	num, _ := strconv.Atoi(string(argument[1:len(argument)]))

	switch instruction {
	case "nop":

	case "acc":
		if operator == "+"{
			accumulator = accumulator + num
		}
		if operator == "-"{
			accumulator = accumulator - num
		}

	case "jmp":
		if operator == "+"{
			counterMod = counterMod + num
		}
		if operator == "-"{
			counterMod = counterMod - num
		}
	
	default:
		fmt.Println("---------------------" + instruction + "-------------------------")
		
	}


	fmt.Println("instruction = ", instruction)
	fmt.Println("argument = ", argument)

	return counterMod, accumulator
}

func executeInstructionMod(counter int ,accumulator int, rawInstruction []string, mod bool) (int, int){

	var counterMod int = 0
	instruction := rawInstruction[0]
	argument := rawInstruction[1]
	operator := string(argument[0])
	num, _ := strconv.Atoi(string(argument[1:len(argument)]))

	if mod{
		if instruction == "nop"{
			instruction = "jmp"
		}
		if instruction == "jmp"{
			instruction = "nop"
		}
	}

	switch instruction {
	case "nop":

	case "acc":
		if operator == "+"{
			accumulator = accumulator + num
		}
		if operator == "-"{
			accumulator = accumulator - num
		}

	case "jmp":
		if operator == "+"{
			counterMod = counterMod + num
		}
		if operator == "-"{
			counterMod = counterMod - num
		}
	
	default:
		fmt.Println("---------------------" + instruction + "-------------------------")
		
	}


	//fmt.Println("instruction = ", instruction)
	//fmt.Println("argument = ", argument)

	return counterMod, accumulator
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