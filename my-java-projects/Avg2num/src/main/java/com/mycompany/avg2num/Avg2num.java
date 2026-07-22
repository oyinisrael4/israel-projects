/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.avg2num;

import java.util.Scanner;

/**
 *
 * @author oyini
 */
public class Avg2num {

    public static void main(String[] args) {
         Scanner sc = new Scanner(System.in);
        double firstNum, secondNum, c, avg;
        System.out.println("THIS SOFTWARE CALCULATE THE AVERAGE OF TWO NUMBERS");
        
        System.out.println("Enter the first number");
        firstNum= sc.nextDouble();
        
        System.out.println("Enter the second number");
        secondNum= sc.nextDouble();
        
        c =  firstNum + secondNum;
        avg = c/2;
        System.out.println("THE AVERAGE OF THE NUMBERS IS: " +  avg);
    }
}
