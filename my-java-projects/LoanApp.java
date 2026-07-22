import java.util.Scanner;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.text.DecimalFormat;

/**
 * Loan App - Console-based loan repayment calculator.
 *
 * Logic:
 *   - Monthly Installment  = LoanAmount / Months  (fixed principal per month)
 *   - Monthly Interest     = InterestRate% of remaining balance that month
 *   - Monthly Payment      = Monthly Installment + Monthly Interest
 *
 * Naming note:
 *   The fixed principal portion is called "Monthly Installment" in the table.
 *   The combined amount (installment + interest) is "Monthly Payment".
 *   In the Loan Summary, the totals are: Total Principal, Total Interest Paid,
 *   Grand Total Repayment. This prevents any label collision between the table
 *   and the summary.
 */
public class LoanApp {

    private static final DecimalFormat df  = new DecimalFormat("#,##0.00");
    private static final int           SEP = 76;   // separator width

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        // ── Welcome ────────────────────────────────────────────────────────
        printBanner("LOAN APP");
        System.out.println();
        System.out.println("  Please enter your loan details below.");
        System.out.println("  " + "-".repeat(44));
        System.out.println();

        // ── User Inputs ────────────────────────────────────────────────────
        System.out.print("  Loan Amount (N)              : ");
        double loanAmount = scanner.nextDouble();

        System.out.print("  Monthly Interest Rate (%)    : ");
        double interestRate = scanner.nextDouble();

        System.out.print("  Loan Duration (months)       : ");
        int months = scanner.nextInt();
        scanner.close();

        // ── Core Calculation ───────────────────────────────────────────────
        double monthlyInstallment = loanAmount / months;

        // ── Loan Info Block ────────────────────────────────────────────────
        String today = LocalDate.now()
                .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

        System.out.println();
        System.out.println("  " + "=".repeat(44));
        System.out.printf("  %-28s : %s%n",  "Date",                  today);
        System.out.printf("  %-28s : N%s%n", "Loan Amount",           df.format(loanAmount));
        System.out.printf("  %-28s : %d months%n", "Loan Duration",   months);
        System.out.printf("  %-28s : N%s%n", "Monthly Installment",   df.format(monthlyInstallment));
        System.out.printf("  %-28s : %.1f%%%n", "Monthly Interest Rate", interestRate);
        System.out.println("  " + "=".repeat(44));

        // ── Repayment Schedule Table ───────────────────────────────────────
        System.out.println();
        System.out.println("  REPAYMENT SCHEDULE");
        System.out.println("  " + "-".repeat(SEP));
        System.out.printf("  %-7s  %-20s  %-18s  %-20s%n",
                "Month", "Monthly Installment", "Monthly Interest", "Monthly Payment");
        System.out.println("  " + "-".repeat(SEP));

        double remainingBalance = loanAmount;
        double totalInterest    = 0;
        double totalPayment     = 0;

        for (int month = 1; month <= months; month++) {

            double monthlyInterest = (interestRate / 100.0) * remainingBalance;
            double monthlyPayment  = monthlyInstallment + monthlyInterest;

            totalInterest += monthlyInterest;
            totalPayment  += monthlyPayment;

            System.out.printf("  %-7d  %-20s  %-18s  %-20s%n",
                    month,
                    "N" + df.format(monthlyInstallment),
                    "N" + df.format(monthlyInterest),
                    "N" + df.format(monthlyPayment));

            remainingBalance -= monthlyInstallment;
        }

        System.out.println("  " + "-".repeat(SEP));

        // ── Loan Summary ───────────────────────────────────────────────────
        System.out.println();
        printBanner("LOAN SUMMARY");
        System.out.printf("  %-28s : N%s%n", "Total Principal",       df.format(loanAmount));
        System.out.printf("  %-28s : N%s%n", "Total Interest Paid",   df.format(totalInterest));
        System.out.printf("  %-28s : N%s%n", "Grand Total Repayment", df.format(totalPayment));
        System.out.println("  " + "=".repeat(44));
    }

    // ── Helper: centred banner ─────────────────────────────────────────────
    private static void printBanner(String title) {
        int width    = 44;
        int inner    = width - 2;
        int totalPad = inner - title.length();
        int left     = totalPad / 2;
        int right    = totalPad - left;
        System.out.println("  " + "=".repeat(width));
        System.out.printf("  |%s%s%s|%n", " ".repeat(left), title, " ".repeat(right));
        System.out.println("  " + "=".repeat(width));
    }
}
