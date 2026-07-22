/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.quadequation;
import java.util.Scanner;
/**
 *
 * @author oyini
 */
public class QuadEquation {

    public static void main(String[] args) {
        System.out.println("THIS SOFTWARE DOES QUADRATIC EQUATION");
        Scanner sc = new Scanner(System.in);
        double a, b, c, d, e, f, g, h, i, j, x1, x2;
        
        System.out.println("Enter value for a");
        a= sc.nextDouble();
        
        System.out.println("Enter value for b");
        b= sc.nextDouble();
        
        System.out.println("Enter value for c");
        c= sc.nextDouble();
        
        d = b*b;
        e = 4 * a * c;
        f = d - e;
        g = Math.sqrt(f);
        h = -b + g;
        i = -b - g;
        j = 2 * a;
        x1 = h / j;
        x2 = i /j;
        System.out.println("x1:" + x1);
        System.out.println("x2:" + x2);
        System.out.println("The roots are " + x1 + " " + "and " + x2);
        
        
    }
}