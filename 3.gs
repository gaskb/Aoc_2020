package main

import ( 
    "bufio"
    "fmt"
    "log"
	"os"
	"time"
	"strconv"
) 

func main() { 
  
    // os.Open() opens specific file in  
    // read-only mode and this return  
    // a pointer of type os. 
    file, err := os.Open("./input/3.txt") 
  
    if err != nil { 
        log.Fatalf("failed to open") 
	} 
	
	fmt.Println(file)
  
    // The bufio.NewScanner() function is called in which the 
    // object os.File passed as its parameter and this returns a 
    // object bufio.Scanner which is further used on the 
    // bufio.Scanner.Split() method. 
    scanner := bufio.NewScanner(file) 
  
    // The bufio.ScanLines is used as an  
    // input to the method bufio.Scanner.Split() 
    // and then the scanning forwards to each 
    // new line using the bufio.Scanner.Scan() 
    // method. 
    scanner.Split(bufio.ScanLines) 

	a := []string{}

    for scanner.Scan() {
		var tempString = scanner.Text()
		if err == nil {
			//fmt.Println("error")
		}
        a = append(a, tempString)
	}

	fmt.Println("a:", a)	

	start := time.Now()
	xSteps := []int{1,3,5,7,1}
	ySteps := []int{1,1,1,1,2}

	//xSteps := []int{3}
	//ySteps := []int{1}

	var total int = 1
	var counter int = 0

	for counter < len(xSteps) {
		currentTreeNumber := getTreeInSlope(xSteps[counter], ySteps[counter], a)
		total = total * currentTreeNumber
		counter++
	}

	fmt.Println("total = " + strconv.Itoa(total))
  
    // The method os.File.Close() is called 
    // on the os.File object to close the file 
	file.Close() 
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
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
