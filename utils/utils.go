package utils

import ( 
    "bufio"
    "fmt"
    "log"
	"os"
	"strconv"
//	"time"
) 

func readFile(input_file string) *bufio.Scanner { 
    // os.Open() opens specific file in  
    // read-only mode and this return  
    // a pointer of type os. 
    file, err := os.Open(input_file) 
  
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

	return scanner
} 



func convertFileToIntSlice(input_file *bufio.Scanner) []int {
    a := []int{}

    for input_file.Scan() {
		var tempString = input_file.Text()
		var temp_int, err = strconv.Atoi(tempString)
		if err == nil {
			//fmt.Println("error")
		}
        a = append(a, temp_int)
	}

    fmt.Println("a:", a)
    
    return a

}


func convertFileToStringSlice(input_file *bufio.Scanner) []string {
    a := []string{}

    for input_file.Scan() {
		var tempString = input_file.Text()
        a = append(a, tempString)
	}

    fmt.Println("a:", a)
    
    return a

}
