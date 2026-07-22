/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.loanapp;

/**
 *
 * @author oyini
 */
import java.util.Scanner;
import java.text.DecimalFormat;

public class LoanApp {

    private static final DecimalFormat MONEY_FORMAT = new DecimalFormat("#,##0.00");

    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(System.in);

            System.out.println("------------------- LOAN APP -------------------");
            System.out.println("Please enter your loan details below.");
            System.out.println("------------------------------------------------");

            System.out.print("Loan Amount (NGN): ");
            double loanAmount = scanner.nextDouble();

            // Validate loan amount
            if (loanAmount <= 0) {
                System.out.println("Error! Loan amount must be a positive number.");
                return;
            }

            System.out.print("Loan Duration (months): ");
            int months = scanner.nextInt();

            // Validate months
            if (months <= 0) {
                System.out.println("Error! Loan duration must be a positive number of months.");
                return;
            }

            double monthlyPrincipal = loanAmount / months;
            double interestRate = 1.5; // fixed interest rate

            System.out.println("\n------------------- LOAN BREAKDOWN -------------------");
            System.out.println("Loan Amount         : NGN" + MONEY_FORMAT.format(loanAmount));
            System.out.println("Loan Duration       : " + months + " months");
            System.out.println("Monthly Payment     : NGN" + MONEY_FORMAT.format(monthlyPrincipal));
            System.out.println("Interest Rate       : " + interestRate + "%");

            // ── Repayment Schedule Table ─────────────────────────────
            System.out.println("\nREPAYMENT SCHEDULE");
            System.out.println("----------------------------------------------------------------------------");
            System.out.printf("%-10s %-20s %-20s %-20s%n",
                    "Month", "Monthly Payment", "Monthly Interest", "Monthly Repayment");
            System.out.println("----------------------------------------------------------------------------");

            double remainingBalance = loanAmount;
            double totalInterest = 0;
            double totalPayment = 0;

            for (int month = 1; month <= months; month++) {
                double monthlyInterest = (interestRate / 100.0) * remainingBalance;
                double monthlyPayment = monthlyPrincipal + monthlyInterest;

                totalInterest += monthlyInterest;
                totalPayment += monthlyPayment;

                System.out.printf("%-10d NGN%-18s NGN%-18s NGN%-18s%n",
                        month,
                        MONEY_FORMAT.format(monthlyPrincipal),
                        MONEY_FORMAT.format(monthlyInterest),
                        MONEY_FORMAT.format(monthlyPayment));

                remainingBalance -= monthlyPrincipal;
            }

            System.out.println("----------------------------------------------------------------------------");

            // ── Loan Summary ─────────────────────────────
            System.out.println("\n------------------- LOAN SUMMARY -------------------");
            System.out.println("Total Principal          : NGN" + MONEY_FORMAT.format(loanAmount));
            System.out.println("Total Interest Paid      : NGN" + MONEY_FORMAT.format(totalInterest));
            System.out.println("Grand Total Repayment    : NGN" + MONEY_FORMAT.format(totalPayment));
            System.out.println("----------------------------------------------------");

        } catch (Exception e) {
            System.out.println("Error! Please enter valid numeric values (e.g., 100000, 12).");
        }
    }
}
