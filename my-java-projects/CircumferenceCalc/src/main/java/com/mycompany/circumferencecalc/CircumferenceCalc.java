/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.circumferencecalc;

import java.util.Scanner;
import java.math.BigDecimal;
import java.math.RoundingMode;


/**
 *
 * @author oyini
 */
public class CircumferenceCalc {

    public static void main(String[] args) {
        System.out.println("THIS SOFTWARE CALCULATES THE CIRCUMFERENCE OF A CIRCLE");
        Scanner sc = new Scanner(System.in);
        double r, circumference;
        
        
        System.out.println("Enter the radius of the circle");
        r = sc.nextDouble();
        
        circumference = 2 * 3.142 * r;
        
       
            System.out.printf("CIRCUMFERENCE OF THE CIRCLE: %.2f%n", circumference);
            
    }
}
