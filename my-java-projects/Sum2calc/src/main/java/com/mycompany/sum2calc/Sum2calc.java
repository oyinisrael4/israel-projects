/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.sum2calc;
import java.util.Scanner;
/**
 *
 * @author oyini
 */
public class Sum2calc {

    public static void main(String[] args) {
       Scanner sc = new Scanner(System.in);
       
       int firstNumber, secondNumber, sum;
       System.out.println("THIS SOFTWARE CALCULATES SUM OF TWO NUMBERS");
       
       System.out.println("ENTER FIRST NUMBER");
       firstNumber = sc.nextInt();
       
       System.out.println("ENTER SECOND NUMBER");
       secondNumber = sc.nextInt();
       
       sum = firstNumber + secondNumber;
       System.out.println("THE RESULT IS: " + sum);
       
    }
}
