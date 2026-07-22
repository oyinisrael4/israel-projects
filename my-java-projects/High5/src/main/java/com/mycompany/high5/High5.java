/*
 * Click nbfs://nbhost/SystemFileSystem/TemplfirstNumbertes/Licenses/license-default.txt to change this license
 */

package com.mycompany.high5;

import java.util.Scanner;

/**
 *
 * @author oyini
 */
public class High5 {

    public static void main(String[] args) {
         System.out.println("THIS SOFTWARRE FINDS THE HIGHEST OF FIVE NUMBERS");
        System.out.println("------------------------------------------------------");
        Scanner sc = new Scanner(System.in);
        double firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber;
        
        System.out.println("ENTER FIRST NUMBER");
        firstNumber = sc.nextDouble();
        
        System.out.println("ENTER SECOND NUMBER");
        secondNumber = sc.nextDouble();
        
        System.out.println("ENTER THIRD NUMBER");
        thirdNumber = sc.nextDouble();
        
        System.out.println("ENTER FOURTH NUMBER");
        fourthNumber = sc.nextDouble();
        
        System.out.println("ENTER FIFTH NUMBER");
        fifthNumber = sc.nextDouble();
        
        if(firstNumber == secondNumber && secondNumber == thirdNumber && thirdNumber == fourthNumber && fourthNumber == fifthNumber)
        {
            System.out.println(firstNumber + " AND " + secondNumber + " AND " + thirdNumber + " AND " + fourthNumber + " AND " + fifthNumber + " ARE EQUAL");
        }
       
        if(firstNumber >= secondNumber && firstNumber >= thirdNumber && firstNumber>=fourthNumber && firstNumber>=fifthNumber) {
            System.out.println(firstNumber + " IS THE HIGHEST NUMBER");
        }
        
        else if(secondNumber >= firstNumber && secondNumber >=thirdNumber && secondNumber>=fourthNumber && secondNumber>=fifthNumber) {
            System.out.println(secondNumber + " IS THE HIGHEST NUMBER");
        }
        
        else if(thirdNumber >= firstNumber && thirdNumber >=secondNumber && thirdNumber>=fourthNumber && thirdNumber>=fifthNumber) {
            System.out.println(thirdNumber + " IS THE HIGHEST NUMBER");
        }
        
        else if(fourthNumber >= firstNumber && fourthNumber >=secondNumber && fourthNumber>=thirdNumber && fourthNumber>=fifthNumber) {
            System.out.println(fourthNumber + " IS THE HIGHEST NUMBER");
        }
        
        else {
            System.out.println(fifthNumber + " IS THE HIGHEST NUMBER");
        }
    }
}