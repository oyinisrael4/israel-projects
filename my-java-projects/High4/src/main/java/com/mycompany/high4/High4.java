/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.high4;

import java.util.Scanner;

/**
 *
 * @author oyini
 */
public class High4 {

    public static void main(String[] args) {
         System.out.println("THIS SOFTWARRE FINDS THE HIGHEST OF FOUR NUMBERS");
        System.out.println("------------------------------------------------------");
        Scanner sc = new Scanner(System.in);
        double firstNumber, secondNumber, thirdNumber, fourthNumber;
        
        System.out.println("ENTER FIRST NUMBER");
        firstNumber = sc.nextDouble();
        
        System.out.println("ENTER SECOND NUMBER");
        secondNumber = sc.nextDouble();
        
        System.out.println("ENTER THIRD NUMBER");
        thirdNumber = sc.nextDouble();
        
        System.out.println("ENTER FOURTH NUMBER");
        fourthNumber = sc.nextDouble();
        
        if(firstNumber == secondNumber && secondNumber == thirdNumber && thirdNumber == fourthNumber)
        {
            System.out.println(firstNumber + " AND " + secondNumber + " AND " + thirdNumber + "AND  " + fourthNumber + " ARE EQUAL");
        }
       
        else if(firstNumber >= secondNumber && firstNumber >= thirdNumber && firstNumber>=fourthNumber) {
            System.out.println(firstNumber + " IS THE HIGHEST NUMBER");
        }
        
        else if(secondNumber >= firstNumber && secondNumber >=thirdNumber && secondNumber>=fourthNumber) {
            System.out.println(secondNumber + " IS THE HIGHEST NUMBER");
        }
        
        else if(thirdNumber >= firstNumber && thirdNumber >=secondNumber && thirdNumber>=fourthNumber) {
            System.out.println(thirdNumber + " IS THE HIGHEST NUMBER");
        }
        
        else {
            System.out.println(fourthNumber + " IS THE HIGHEST NUMBER");
        }
    }
}
