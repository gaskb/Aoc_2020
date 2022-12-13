package main

import ( 
    "bufio"
    "fmt"
    "log"
	"os"
	"time"
	"strings"
	"strconv"
) 

func main() { 
  
    // os.Open() opens specific file in  
    // read-only mode and this return  
    // a pointer of type os. 
    file, err := os.Open("./input/2.txt") 
  
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

	var a_slice_size int = len(a)

	start := time.Now()

	var success_counter int
	success_counter = 0

	for i := 0; i < a_slice_size; i++ {

		//fmt.Println("-----------------------------------")


		var row string= a[i]
		row_slice := strings.Split(row, " ")
		//fmt.Println(row_slice)
		var row_rule_min, err = strconv.Atoi(strings.Split(row_slice[0], "-")[0])
		var row_rule_max, err2 = strconv.Atoi(strings.Split(row_slice[0], "-")[1])

		if (err == nil|| err2 == nil){
			//fmt.Println("ciao")
		}

		row_rule_char := row_slice[1][0]

		password := row_slice[2]

		counter := int(strings.Count(password, string(row_rule_char)))

		if (false && counter <= row_rule_max && counter >= row_rule_min){
			//prina stella
			fmt.Println(" OK !! ")
			success_counter ++
		} 
		if(((password[row_rule_min - 1] == row_rule_char) && !(password[row_rule_max -1] == row_rule_char)) || 
		   (!(password[row_rule_min - 1] == row_rule_char) && (password[row_rule_max -1] == row_rule_char))){
			fmt.Println(" OK !! ")
			success_counter ++
		}

		// Output: [a b c]
	}

	fmt.Println(" success_counter = " + string(success_counter))
	fmt.Printf("\n%d\n", success_counter)

  
    // The method os.File.Close() is called 
    // on the os.File object to close the file 
	file.Close() 
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("time = ", elapsed.Seconds())
}


