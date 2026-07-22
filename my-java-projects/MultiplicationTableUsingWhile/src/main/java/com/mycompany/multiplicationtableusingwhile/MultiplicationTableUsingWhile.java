/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.multiplicationtableusingwhile;

/**
 *
 * @author oyini
 */
public class MultiplicationTableUsingWhile {

    public static void main(String[] args) {
        System.out.println("Simple Multiplication Table");
        
        int number = 2;
        int length = 12;
        int count = 1;
        
        while (count <= length) {
            System.out.println(number + " X " + count + " = " + number * count);
            count++;
        }
    }
}
