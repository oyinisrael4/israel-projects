/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.high3;

import java.util.Scanner;

/**
 *
 * @author oyini
 */
public class High3 {

    public static void main(String[] args) {
        System.out.println("THIS SOFTWARRE FINDS THE HIGHEST OF THREE NUMBERS");
        System.out.println("------------------------------------------------------");
        Scanner sc = new Scanner(System.in);
        double firstNumber, secondNumber, thirdNumber;
        
        System.out.println("ENTER FIRST NUMBER");
        firstNumber = sc.nextDouble();
        
        System.out.println("ENTER SECOND NUMBER");
        secondNumber = sc.nextDouble();
        
        System.out.println("ENTER THIRD NUMBER");
        thirdNumber = sc.nextDouble();
       
        if(firstNumber == secondNumber && secondNumber == thirdNumber)
        {
            System.out.println(firstNumber + " AND " + secondNumber + " AND " + thirdNumber + " ARE EQUAL");
        }
        
        else if(firstNumber > secondNumber && firstNumber > thirdNumber ) {
            System.out.println(firstNumber + " IS THE HIGHEST NUMBER");
        }
        
        else if(secondNumber > firstNumber && secondNumber >thirdNumber) {
            System.out.println(secondNumber + " IS THE HIGHEST NUMBER");
        }
        
        else {
            System.out.println(thirdNumber + " IS THE HIGHEST NUMBER");
        }
         
        
    }
}
