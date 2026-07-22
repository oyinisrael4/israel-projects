/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.simplecalculator;

import java.util.Scanner;

/**
 *
 * @author oyini
 */
public class SimpleCalculator {

    public static void main(String[] args) {
        System.out.println("---- A SIMPLE CALCULATOR ----");
        double num1, num2, result;
        int option;

        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter first number: ");
        num1 = scanner.nextDouble();

        System.out.println("----- SELECT OPERATION TO PERFORM -----");
        System.out.println("1. Addition(+)");
        System.out.println("2. Subtraction(-)");
        System.out.println("3. Multiplication(*)");
        System.out.println("4. Division(/)");
        option = scanner.nextInt();

        if ((option < 1) || (option > 4)) {
            System.out.println("Error! Invalid option Please choose from 1 to 4");
        } else {
            System.out.println("Enter second number: ");
            num2 = scanner.nextDouble();

            if (option == 1) {
                result = num1 + num2;
                System.out.println(num1 + " + " + num2 + " = " + result);
            } else if (option == 2) {
                result = num1 - num2;
                System.out.println(num1 + " - " + num2 + " = " + result);
            } else if (option == 3) {
                result = num1 * num2;
                System.out.println(num1 + " * " + num2 + " = " + result);
            } else if (option == 4) {
                if (num2 != 0) {
                    result = num1 / num2;
                    System.out.println(num1 + " / " + num2 + " = " + result);
                } else {
                    System.out.println("Error: Division by zero is not allowed.");
                }
            } else {
                System.out.println("Error! Invalid option Please choose from 1 to 4");
            }
        }

    }
}
