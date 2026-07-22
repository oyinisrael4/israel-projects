/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.high2;
import java.util.Scanner;
/**
 *
 * @author oyini
 */
public class High2 {

    public static void main(String[] args) {
        System.out.println("THIS SOFTWARRE FINDS THE HIGHEST OF THWO NUMBERS");
        System.out.println("------------------------------------------------------");
        Scanner sc = new Scanner(System.in);
        double a, b;
        
        System.out.println("ENTER FIRST NUMBER");
        a = sc.nextDouble();
        
        System.out.println("ENTER SECOND NUMBER");
        b = sc.nextDouble();
        
        if(a > b) {
            System.out.println(a + " IS THE HIGHEST NUMBER");
        }
        
        else if(b > a) {
            System.out.println(b + " IS THE HIGHEST NUMBER");
        }
        
        else {
            System.out.println(a +" AND " + b + " ARE EQUAL");
        }
         
        
        
    }
}
