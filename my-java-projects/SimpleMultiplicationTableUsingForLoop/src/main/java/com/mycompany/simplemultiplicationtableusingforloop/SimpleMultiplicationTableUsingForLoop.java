/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.simplemultiplicationtableusingforloop;
import java.util.Scanner;
/**
 *
 * @author oyini
 */
public class SimpleMultiplicationTableUsingForLoop {

    public static void main(String[] args) {
        try{
        System.out.println("Simple Multiplication Table");
        Scanner sc = new Scanner(System.in);
        int count, number, length;
        
        System.out.println("Enter the number you want to calculate:");
        number = sc.nextInt();
        
        System.out.println("Enter the length you want to calculate to:");
        length = sc.nextInt();
        
        for(count = 1; count<=length; count++){
            System.out.println(number + " X " + count + " = " + number * count);
        }
    }catch(Exception e)
    {
       System.out.println(e); 
    }
    }
}
