/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.price50mango;
import java.util.Scanner;
/**
 *
 * @author oyini
 */
public class Price50Mango {

    public static void main(String[] args) {
        double price, totalPrice;
        Scanner sc = new Scanner(System.in);
        
        System.out.println("SOFTWARE TO CALCULATE THE PRICE OF 50 MANGOS");
        
        System.out.println("ENTER THE PRICE OF ONE MANGO");
        price = sc.nextDouble();
        
        totalPrice = 50 * price;
        System.out.println("TOTAL PRICE OF 50 MANGOS: " + totalPrice);
    }
}
