/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.areaofcircle;
import java.util.Scanner;
/**
 *
 * @author oyini
 */
public class AreaOfCircle {

    public static void main(String[] args) {
        System.out.println("THIS SOFTWARE CALCULATES THE AREA OF A CIRCLE");
        Scanner sc = new Scanner(System.in);
        double r, b, area;
        
        System.out.println("Enter the radius of the circle");
        r = sc.nextDouble();
        
        b = r * r;
        area = 3.142 * b;
        System.out.println("AREA OF THE CIRCLE: " + area);
    }
}
