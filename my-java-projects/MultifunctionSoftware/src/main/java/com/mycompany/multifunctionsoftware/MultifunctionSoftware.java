/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.multifunctionsoftware;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

/**
 *
 * @author oyini
 */
public class MultifunctionSoftware {

    private static final DecimalFormat MONEY_FORMAT = new DecimalFormat("#,##0.00");

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        int choice;
        try {

            System.out.println("---------MULTIFUNCTION SOFTWARE---------");
            System.out.println("SELECT THE SOFTWARE YOU WANT TO USE:");
            System.out.println("1. Simple Calculator");
            System.out.println("2. Area of Circle");
            System.out.println("3. Circumference of Circle");
            System.out.println("4. Quadratic Equation Solver");
            System.out.println("5. Boyle's Law Calculator");
            System.out.println("6. Age Calculator");
            System.out.println("7. Simple Multiplication Table Using For Loop");
            System.out.println("8. Simple Multiplication Table Using While Loop");
            System.out.println("9. Simple Multiplication Table Using Do While Loop");

            choice = scanner.nextInt();

            if (choice == 1) {
                // Simple Calculator
                try {
                    System.out.println("---- A SIMPLE CALCULATOR ----");
                    double num1, num2, result;
                    int option;

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
                } catch (Exception e) {
                    System.out.println("Error!");
                }

            } else if (choice == 2) {
                // Area of Circle
                try {
                    System.out.println("THIS SOFTWARE CALCULATES THE AREA OF A CIRCLE");
                    double r, area;
                    System.out.println("Enter the radius:");
                    r = scanner.nextDouble();
                    area = 3.142 * r * r;
                    System.out.println("AREA OF THE CIRCLE:m " + area);
                } catch (Exception e) {
                    System.out.println(e);
                }

            } else if (choice == 3) {
                // Circumference of Circle
                try {
                    System.out.println("THIS SOFTWARE CALCULATES THE CIRCUMFERENCE OF A CIRCLE");
                    double r, circumference;
                    System.out.println("Enter the radius:");
                    r = scanner.nextDouble();
                    circumference = 2 * 3.142 * r;
                    System.out.println("CIRCUMFERENCE OF THE CIRCLE: " + circumference);
                } catch (Exception e) {
                    System.out.println(e);
                }

            } else if (choice == 4) {
                // Quadratic Equation Solver
                try {
                    System.out.println("THIS SOFTWARE SOLVES QUADRATIC EQUATIONS");
                    double a, b, c, d, e, f, g, h, i, j, x1, x2;
                    System.out.println("Enter value for a:");
                    a = scanner.nextDouble();
                    System.out.println("Enter value for b:");
                    b = scanner.nextDouble();
                    System.out.println("Enter value for c:");
                    c = scanner.nextDouble();

                    d = b * b;
                    e = 4 * a * c;
                    f = d - e;
                    g = Math.sqrt(f);
                    h = -b + g;
                    i = -b - g;
                    j = 2 * a;
                    x1 = h / j;
                    x2 = i / j;
                    System.out.println("The roots are " + x1 + " and " + x2);
                } catch (Exception e) {
                    System.out.println(e);
                }

            } else if (choice == 5) {
                // Boyle's Law
                try {
                    System.out.println("THIS SOFTWARE PERFORMS BOYLES'S LAW");
                    double initialPressure, initialVolume, finalPressure, finalVolume, c;
                    int option;

                    System.out.println("Choose an option:");
                    System.out.println("1. Calculate initial Pressure (P1)");
                    System.out.println("2. Calculate initial Volume (V1)");
                    System.out.println("3. Calculate final Pressure (P2)");
                    System.out.println("4. Calculate final Volume (V2)");
                    option = scanner.nextInt();

                    if (option == 1) {
                        System.out.println("Enter final pressure (P2):");
                        finalPressure = scanner.nextDouble();
                        System.out.println("Enter final volume (V2):");
                        finalVolume = scanner.nextDouble();
                        System.out.println("Enter initial volume (V1):");
                        initialVolume = scanner.nextDouble();
                        if (initialVolume == 0) {
                            System.out.println("Error: Division by zero is not allowed.");

                        } else {
                            c = finalPressure * finalVolume;
                            initialPressure = c / initialVolume;
                            System.out.println("Initial Pressure (P1) = " + initialPressure);
                        }
                    } else if (option == 2) {
                        System.out.println("Enter final pressure (P2):");
                        finalPressure = scanner.nextDouble();
                        System.out.println("Enter final volume (V2):");
                        finalVolume = scanner.nextDouble();
                        System.out.println("Enter initial pressure (P1):");
                        initialPressure = scanner.nextDouble();

                        if (initialPressure == 0) {
                            System.out.println("Error: Division by zero is not allowed.");

                        } else {
                            c = finalPressure * finalVolume;
                            initialVolume = c / initialPressure;
                            System.out.println("Initial Volume (V1) = " + initialVolume);
                        }
                    } else if (option == 3) {
                        System.out.println("Enter initial pressure (P1):");
                        initialPressure = scanner.nextDouble();
                        System.out.println("Enter initial volume (V1):");
                        initialVolume = scanner.nextDouble();
                        System.out.println("Enter final volume (V2):");
                        finalVolume = scanner.nextDouble();

                        if (finalVolume == 0) {
                            System.out.println("Error: Division by zero is not allowed.");

                        } else {
                            c = initialPressure * initialVolume;
                            finalPressure = c / finalVolume;
                            System.out.println("Final Pressure (P2) = " + finalPressure);
                        }
                    } else if (option == 4) {
                        System.out.println("Enter initial pressure (P1):");
                        initialPressure = scanner.nextDouble();
                        System.out.println("Enter initial volume (V1):");
                        initialVolume = scanner.nextDouble();
                        System.out.println("Enter final pressure (P2):");
                        finalPressure = scanner.nextDouble();

                        if (finalPressure == 0) {
                            System.out.println("Error: Division by zero is not allowed.");

                        } else {
                            c = initialPressure * initialVolume;
                            finalVolume = c / finalPressure;
                            System.out.println("Final Volume (V2) = " + finalVolume);
                        }
                    } else {
                        System.out.println("Invalid option.");
                    }
                } catch (Exception e) {
                    System.out.println(e);
                }

            } else if (choice == 6) {
                //AGE CALCULATOR
                try {
                    System.out.println("AGE CALCULATOR");
                    int birthYear, birthMonth, birthDay;
                    int currentYear, currentMonth, currentDay;
                    int ageYears, ageMonths, ageDays;

                    LocalDate today = LocalDate.now();

                    System.out.println("Today's date is: " + today);

                    System.out.println("Enter your birth year (YYYY): ");
                    birthYear = scanner.nextInt();

                    System.out.println("Enter your birth month (MM): ");
                    birthMonth = scanner.nextInt();

                    System.out.println("Enter your birth day (DD): ");
                    birthDay = scanner.nextInt();

                    currentYear = today.getYear();
                    currentMonth = today.getMonthValue();
                    currentDay = today.getDayOfMonth();

                    // Validate month
                    if (birthMonth < 1 || birthMonth > 12) {
                        System.out.println("Error: Invalid month entered.");
                        return;
                    }

                    // Get actual days in the birth month of that year
                    YearMonth ym = YearMonth.of(birthYear, birthMonth);
                    int daysInBirthMonth = ym.lengthOfMonth();

                    // Validate day
                    if ((birthDay < 1) || (birthDay > daysInBirthMonth)) {
                        System.out.println("Error: Invalid day entered for that month.");
                        return;
                    }

                    // Validate full birth date
                    LocalDate birthDate;
                    try {
                        birthDate = LocalDate.of(birthYear, birthMonth, birthDay);
                    } catch (Exception e) {
                        System.out.println("Error: Invalid date entered.");
                        return;
                    }

                    if (birthDate.isAfter(today)) {
                        System.out.println("Error: Birth date cannot be in the future.");
                        return;
                    }

                    // Borrow days if needed, always using birth month length
                    if (currentDay < birthDay) {
                        currentDay += daysInBirthMonth;
                        currentMonth -= 1;
                        if (currentMonth == 0) {
                            currentMonth = 12;
                            currentYear -= 1;
                        }
                    }

                    // Borrow months if needed
                    if (currentMonth < birthMonth) {
                        currentMonth += 12;
                        currentYear -= 1;
                    }

                    ageDays = currentDay - birthDay;

                    // Normalize: if subtraction gives one less than full month length, set to full length
                    if (ageDays == daysInBirthMonth - 1) {
                        ageDays = daysInBirthMonth;
                    }

                    ageMonths = currentMonth - birthMonth;
                    ageYears = currentYear - birthYear;

                    System.out.println("Your age is: "
                            + ageYears + " years, "
                            + ageMonths + " months, and "
                            + ageDays + " days.");

                } catch (Exception e) {
                    System.out.println("Error! Invalid date of birth");
                }

            } else if (choice == 7) {
                // Simple Multiplication Table Using For Loop
                try {
                    System.out.println("Simple Multiplication Table");
                    Scanner sc = new Scanner(System.in);
                    int count, number, length;

                    System.out.println("Enter the number you want to calculate:");
                    number = sc.nextInt();

                    System.out.println("Enter the length you want to calculate to:");
                    length = sc.nextInt();

                    for (count = 1; count <= length; count++) {
                        System.out.println(number + " X " + count + " = " + number * count);
                    }
                } catch (Exception e) {
                    System.out.println(e);
                }

            } else if (choice == 8) {
                // Simple Multiplication Table Using While Loop
                System.out.println("Simple Multiplication Table");

                int number = 2;
                int length = 12;
                int count = 1;

                while (count <= length) {
                    System.out.println(number + " X " + count + " = " + number * count);
                    count++;
                }

            } else if (choice == 9) {
                // Simple Multiplication Table Using Do While Loop
                System.out.println("Simple Multiplication Table");

                int number = 2;
                int length = 12;
                int count = 1;

                do {
                    System.out.println(number + " X " + count + " = " + number * count);
                    count++;
                } while (count <= length);

            } else if (choice == 10) {
                // Loan App

                try {

                    // ── Welcome ───────────────────────────────
                    System.out.println("==============================================");
                    System.out.println("                 LOAN APP                     ");
                    System.out.println("==============================================");
                    System.out.println("Please enter your loan details below.");
                    System.out.println("----------------------------------------------");

                    // ── User Inputs ───────────────────────────
                    System.out.print("Loan Amount (N): ");
                    double loanAmount = scanner.nextDouble();

                    System.out.print("Monthly Interest Rate (%): ");
                    double interestRate = scanner.nextDouble();

                    System.out.print("Loan Duration (months): ");
                    int months = scanner.nextInt();

                    // ── Core Calculation ──────────────────────
                    double monthlyPrincipal = loanAmount / months;

                    // ── Loan Info ─────────────────────────────
                    String today = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                    System.out.println("\n==============================================");
                    System.out.println("Date                : " + today);
                    System.out.println("Loan Amount         : N" + MONEY_FORMAT.format(loanAmount));
                    System.out.println("Loan Duration       : " + months + " months");
                    System.out.println("Monthly Principal   : N" + MONEY_FORMAT.format(monthlyPrincipal));
                    System.out.println("Interest Rate       : " + interestRate + "%");
                    System.out.println("==============================================");

                    // ── Repayment Schedule ────────────────────
                    System.out.println("\nREPAYMENT SCHEDULE");
                    System.out.println("----------------------------------------------------------------------------");
                    System.out.println("Month   Principal            Interest            Payment");
                    System.out.println("----------------------------------------------------------------------------");

                    double remainingBalance = loanAmount;
                    double totalInterest = 0;
                    double totalPayment = 0;

                    for (int month = 1; month <= months; month++) {
                        double monthlyInterest = (interestRate / 100.0) * remainingBalance;
                        double monthlyPayment = monthlyPrincipal + monthlyInterest;

                        totalInterest += monthlyInterest;
                        totalPayment += monthlyPayment;

                        System.out.println(month + "       N" + MONEY_FORMAT.format(monthlyPrincipal)
                                + "          N" + MONEY_FORMAT.format(monthlyInterest)
                                + "          N" + MONEY_FORMAT.format(monthlyPayment));

                        remainingBalance -= monthlyPrincipal;
                    }
                    System.out.println("----------------------------------------------------------------------------");

                    // ── Loan Summary ──────────────────────────
                    System.out.println("\n==============================================");
                    System.out.println("                 LOAN SUMMARY                 ");
                    System.out.println("==============================================");
                    System.out.println("Total Principal     : N" + MONEY_FORMAT.format(loanAmount));
                    System.out.println("Total Interest Paid : N" + MONEY_FORMAT.format(totalInterest));
                    System.out.println("Grand Total Payment : N" + MONEY_FORMAT.format(totalPayment));
                    System.out.println("==============================================");
                } catch (Exception e) {
                    System.out.println(e);
                }
            } else {
                System.out.println("Invalid choice. Please select between 1 and 6.");
            }

            scanner.close();
        } catch (Exception e) {
            System.out.println("Error! Invalid choice");
        }

    }
}
