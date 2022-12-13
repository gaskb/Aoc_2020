package main

import ( 
    "bufio"
    "fmt"
    "log"
	"os"
	"strconv"
	"time"
) 

func main() { 
  
    // os.Open() opens specific file in  
    // read-only mode and this return  
    // a pointer of type os. 
    file, err := os.Open("./input/1.txt") 
  
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

	a := []int{}

    for scanner.Scan() {
		var tempString = scanner.Text()
		var temp_int, err = strconv.Atoi(tempString)
		if err == nil {
			//fmt.Println("error")
		}
        a = append(a, temp_int)
	}

	fmt.Println("a:", a)

	var a_slice_size int = len(a)

	start := time.Now()

	for i := 0; i < a_slice_size; i++ {
		var first_arg int = a[i]
		for j := 0; j < a_slice_size; j++ {
			var second_arg int = a[j]
			for k := 0; k < a_slice_size; k++ {
				var third_arg int = a[k]
			
				var sum int = first_arg + second_arg + third_arg
				if (sum == 2020){
					t := time.Now()
					elapsed := t.Sub(start)
					
					fmt.Println("first arg = ", first_arg)
					fmt.Println("second arg = ", second_arg)
					fmt.Println("third arg = ", third_arg)
					fmt.Println("time = ", elapsed.Seconds())

					var product int = first_arg * second_arg * third_arg

					fmt.Println("product = ", product)
					os.Exit(3)
				}
			}
		}
	}
  
    // The method os.File.Close() is called 
    // on the os.File object to close the file 
    file.Close() 
 
}