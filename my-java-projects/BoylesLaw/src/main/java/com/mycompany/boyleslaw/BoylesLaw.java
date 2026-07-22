/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.boyleslaw;
import java.util.Scanner;
/**
 *
 * @author oyini
 */

public class BoylesLaw {
    public static void main(String[] args) {
        System.out.println("THIS SOFTWARRE CALCULATES FINAL PRESSURE OR FINAL VOLUME");    
        double initialPressure, initialVolume, finalPressure, finalVolume, c;
        int option;

        Scanner scanner = new Scanner(System.in);


        System.out.println("Choose an option:");
        System.out.println("1. Calculate initial Pressure (P1)");
        System.out.println("2. Calculate initial Volume (V1)");
        System.out.println("3. Calculate final Pressure (P2)");
        System.out.println("4. Calculate final Volume (V2)");
        option = scanner.nextInt();

        if (option == 1) {
            System.out.println("Enter final pressure (P2): ");
            finalPressure = scanner.nextDouble();
            System.out.println("Enter final volume (V2): ");
            finalVolume = scanner.nextDouble();
            System.out.println("Enter initial volume (V1): ");
            initialVolume = scanner.nextDouble();
            c = finalPressure * finalVolume;
            initialPressure = c / initialVolume;
            System.out.println("Initial Pressure (P1) = " + initialPressure);
        } else if (option == 2) {
            System.out.println("Enter final pressure (P2): ");
            finalPressure = scanner.nextDouble();
            System.out.println("Enter final volume (V2): ");
            finalVolume = scanner.nextDouble();
            System.out.println("Enter initial pressure (P1): ");
            initialPressure = scanner.nextDouble();
            c = finalPressure * finalVolume;
            initialVolume = c / initialPressure;
            System.out.println("Initial Volume (V1) = " + initialVolume);
            
        } else if (option == 3) {
            System.out.println("Enter initial pressure (P1): ");
            initialPressure = scanner.nextDouble(); 
            System.out.println("Enter initial volume (V1): ");
            initialVolume = scanner.nextDouble();
            System.out.println("Enter final volume (V2): ");
            finalVolume = scanner.nextDouble();
            c = initialPressure * initialVolume;
            finalPressure = c / finalVolume;
            System.out.println("Final Pressure (P2) = " + finalPressure); 
            
        } else if (option == 4) {
            System.out.println("Enter initial pressure (P1): ");
            initialPressure = scanner.nextDouble();
            System.out.println("Enter initial volume (V1): ");
            initialVolume = scanner.nextDouble();
            System.out.println("Enter final pressure (P2): ");
            finalPressure = scanner.nextDouble();
            c = initialPressure * initialVolume;
            finalVolume = c / finalPressure;
            System.out.println("Final Volume (V2) = " + finalVolume);
        } else {
            System.out.println("Invalid option. Kinldy select only one option from 1 to 4 given above.");
        }

    }
}
