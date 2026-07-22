/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.avg5num;

import java.util.Scanner;

/**
 *
 * @author oyini
 */
public class Avg5num {

    public static void main(String[] args) {
         Scanner sc = new Scanner(System.in);
        double num1, num2, num3, num4, num5, c, avg;
        System.out.println("THIS SOFTWARE CALCULATE THE AVERAGE OF FIVE NUMBERS");
        
        System.out.println("Enter the first number");
        num1= sc.nextDouble();
        
        System.out.println("Enter the second number");
        num2= sc.nextDouble();
        
        System.out.println("Enter the third number");
        num3= sc.nextDouble();
        
        System.out.println("Enter the fourth number");
        num4= sc.nextDouble();
        
        System.out.println("Enter the fifth number");
        num5= sc.nextDouble();
        
        c =  num1 + num2 + num3 + num4 + num5;
        avg = c/5;
        System.out.println("THE TOTAL OF FIVE NUMBERS: " +  c);
        System.out.println("THE AVERAGE OF THE FIVE NUMBERS IS: " +  avg);
               
    }
}
