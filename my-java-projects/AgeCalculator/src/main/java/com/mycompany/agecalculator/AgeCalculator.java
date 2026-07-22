/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.agecalculator;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Scanner;

/**
 *
 * @author oyini
 */

public class AgeCalculator {

    public static void main(String[] args) {

        System.out.println("AGE CALCULATOR");
        int birthYear, birthMonth, birthDay;
        int currentYear, currentMonth, currentDay;
        int ageYears, ageMonths, ageDays;

        Scanner scanner = new Scanner(System.in);

        try {

            System.out.println("Enter your birth year (YYYY): ");
            birthYear = scanner.nextInt();

            System.out.println("Enter your birth month (MM): ");
            birthMonth = scanner.nextInt();

            System.out.println("Enter your birth day (DD): ");
            birthDay = scanner.nextInt();

            LocalDate today = LocalDate.now();
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
            if (birthDay < 1 || birthDay > daysInBirthMonth) {
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

            System.out.println("Today's date is: " + today);
            System.out.println("Your age is: "
                    + ageYears + " years, "
                    + ageMonths + " months, and "
                    + ageDays + " days.");
        } catch (Exception e) {

            System.out.println("Error! Invalid date of birth");
        }
    }
}
