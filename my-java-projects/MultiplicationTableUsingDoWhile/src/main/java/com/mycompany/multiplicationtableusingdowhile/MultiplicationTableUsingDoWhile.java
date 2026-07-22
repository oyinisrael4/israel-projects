/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.multiplicationtableusingdowhile;

/**
 *
 * @author oyini
 */
public class MultiplicationTableUsingDoWhile {

   public static void main(String[] args) {
        System.out.println("Simple Multiplication Table");
        
        int number = 2;
        int length = 12;
        int count = 1;
        
        do {
            System.out.println(number + " X " + count + " = " + number * count);
            count++;
        } while (count <= length);
    }
}
