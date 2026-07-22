import javax.swing.*;
import javax.swing.border.*;
import java.awt.*;
import java.awt.event.*;

/**
 * Simple Calculator – enforces input order:
 *   1. Type first number  →  2. Select operator  →  3. Type second number  →  4. Press =
 */
public class SimpleCalculator_W extends JFrame {

    // ── state ───────────────────────────────────────────────────────────────
    private String selectedOperator = "";

    /** Workflow steps */
    private enum Step { ENTER_FIRST, SELECT_OPERATOR, ENTER_SECOND, CALCULATE }
    private Step currentStep = Step.ENTER_FIRST;

    // ── components ──────────────────────────────────────────────────────────
    private JLabel    titleLabel, firstNumberLabel, requiredMark1,
                      secondNumberLabel, requiredMark2, resultLabel,
                      operatorDisplayLabel;
    private JTextField firstNumberField, secondNumberField, resultField;
    private JPanel    operatorPanel;
    private JButton   addButton, subtractButton, multiplyButton,
                      divideButton, equalsButton, clearButton, exitButton;

    // ── borders ─────────────────────────────────────────────────────────────
    private static final Color BORDER_NORMAL   = new Color(180, 180, 180);
    private static final Color BORDER_ACTIVE   = new Color(100, 160, 230);
    private static final Color BORDER_DISABLED = new Color(210, 210, 210);
    private static final Color BG_ENABLED      = Color.WHITE;
    private static final Color BG_DISABLED     = new Color(235, 235, 235);
    private static final Color BG_RESULT       = new Color(240, 240, 240);

    // ── constructor ─────────────────────────────────────────────────────────
    public SimpleCalculator_W() {
        initComponents();
        applyStep(Step.ENTER_FIRST);          // start at step 1
    }

    // ────────────────────────────────────────────────────────────────────────
    //  BUILD UI
    // ────────────────────────────────────────────────────────────────────────
    private void initComponents() {

        // ── title ────────────────────────────────────────────────────────────
        titleLabel = new JLabel("SIMPLE CALCULATOR");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 16));
        titleLabel.setForeground(new Color(0, 102, 0));

        // ── first number ─────────────────────────────────────────────────────
        firstNumberLabel = new JLabel("Enter First Number:");
        firstNumberLabel.setFont(new Font("Segoe UI", Font.BOLD, 13));

        requiredMark1 = new JLabel("*");
        requiredMark1.setFont(new Font("Segoe UI", Font.BOLD, 13));
        requiredMark1.setForeground(new Color(204, 0, 0));

        firstNumberField = createStyledField(true);
        firstNumberField.setToolTipText("Enter the first number");
        firstNumberField.addKeyListener(new KeyAdapter() {
            @Override public void keyTyped(KeyEvent e)  { enforceNumeric(e, "First Number"); }
        });
        firstNumberField.addFocusListener(new FocusAdapter() {
            @Override public void focusGained(FocusEvent e) { setActiveBorder(firstNumberField); }
            @Override public void focusLost(FocusEvent e)   { setNormalBorder(firstNumberField, firstNumberField.isEnabled()); }
        });
        // pressing Enter on field 1 → try to move to operator step
        firstNumberField.addActionListener(e -> tryAdvanceFromFirstField());

        // ── second number ────────────────────────────────────────────────────
        secondNumberLabel = new JLabel("Enter Second Number:");
        secondNumberLabel.setFont(new Font("Segoe UI", Font.BOLD, 13));

        requiredMark2 = new JLabel("*");
        requiredMark2.setFont(new Font("Segoe UI", Font.BOLD, 13));
        requiredMark2.setForeground(new Color(204, 0, 0));

        secondNumberField = createStyledField(false);   // disabled until step 3
        secondNumberField.setToolTipText("Enter the second number");
        secondNumberField.addKeyListener(new KeyAdapter() {
            @Override public void keyTyped(KeyEvent e) { enforceNumeric(e, "Second Number"); }
        });
        secondNumberField.addFocusListener(new FocusAdapter() {
            @Override public void focusGained(FocusEvent e) { setActiveBorder(secondNumberField); }
            @Override public void focusLost(FocusEvent e)   { setNormalBorder(secondNumberField, secondNumberField.isEnabled()); }
        });
        // pressing Enter on field 2 → calculate
        secondNumberField.addActionListener(e -> {
            if (currentStep == Step.ENTER_SECOND || currentStep == Step.CALCULATE)
                calculateResult();
        });
        // Unlock equals button as soon as user types something in field 2
        secondNumberField.getDocument().addDocumentListener(new javax.swing.event.DocumentListener() {
            public void insertUpdate(javax.swing.event.DocumentEvent e)  { checkSecondFieldNotEmpty(); }
            public void removeUpdate(javax.swing.event.DocumentEvent e)  { checkSecondFieldNotEmpty(); }
            public void changedUpdate(javax.swing.event.DocumentEvent e) {}
        });

        // ── result ───────────────────────────────────────────────────────────
        resultLabel = new JLabel("Result:");
        resultLabel.setFont(new Font("Segoe UI", Font.BOLD, 13));

        resultField = new JTextField();
        resultField.setEditable(false);
        resultField.setBackground(BG_RESULT);
        resultField.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        resultField.setBorder(new CompoundBorder(
                new RoundedBorder(6, BORDER_NORMAL),
                new EmptyBorder(2, 8, 2, 8)));
        resultField.setPreferredSize(new Dimension(220, 32));

        // ── operator panel ───────────────────────────────────────────────────
        operatorPanel = new JPanel();
        operatorPanel.setBackground(new Color(224, 224, 224));

        addButton      = createOperatorButton("+");
        subtractButton = createOperatorButton("-");
        multiplyButton = createOperatorButton("x");
        divideButton   = createOperatorButton("/");

        operatorDisplayLabel = new JLabel();
        operatorDisplayLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
        operatorDisplayLabel.setHorizontalAlignment(SwingConstants.CENTER);

        equalsButton = new JButton("=");
        equalsButton.setFont(new Font("Segoe UI", Font.BOLD, 16));
        equalsButton.setFocusPainted(false);
        equalsButton.setPreferredSize(new Dimension(202, 55));

        // wire operator buttons
        addButton     .addActionListener(e -> selectOperator("+"));
        subtractButton.addActionListener(e -> selectOperator("-"));
        multiplyButton.addActionListener(e -> selectOperator("x"));
        divideButton  .addActionListener(e -> selectOperator("/"));
        equalsButton  .addActionListener(e -> calculateResult());

        // operator panel layout
        operatorPanel.setLayout(new GroupLayout(operatorPanel));
        GroupLayout opl = (GroupLayout) operatorPanel.getLayout();
        opl.setHorizontalGroup(opl.createParallelGroup(GroupLayout.Alignment.LEADING)
            .addGroup(opl.createSequentialGroup()
                .addGap(14)
                .addGroup(opl.createParallelGroup(GroupLayout.Alignment.LEADING)
                    .addGroup(opl.createSequentialGroup()
                        .addComponent(addButton,      90, 90, 90)
                        .addGap(18)
                        .addComponent(subtractButton, 90, 90, 90))
                    .addComponent(operatorDisplayLabel, GroupLayout.DEFAULT_SIZE, GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addGroup(opl.createSequentialGroup()
                        .addComponent(multiplyButton, 90, 90, 90)
                        .addGap(18)
                        .addComponent(divideButton,   90, 90, 90)))
                .addGap(14))
            .addGroup(GroupLayout.Alignment.TRAILING, opl.createSequentialGroup()
                .addContainerGap()
                .addComponent(equalsButton, GroupLayout.DEFAULT_SIZE, GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap()));
        opl.setVerticalGroup(opl.createParallelGroup(GroupLayout.Alignment.LEADING)
            .addGroup(opl.createSequentialGroup()
                .addGap(14)
                .addGroup(opl.createParallelGroup(GroupLayout.Alignment.BASELINE)
                    .addComponent(addButton,      55, 55, 55)
                    .addComponent(subtractButton, 55, 55, 55))
                .addGap(18)
                .addComponent(operatorDisplayLabel)
                .addGap(18)
                .addGroup(opl.createParallelGroup(GroupLayout.Alignment.BASELINE)
                    .addComponent(multiplyButton, 55, 55, 55)
                    .addComponent(divideButton,   55, 55, 55))
                .addGap(18)
                .addComponent(equalsButton, 55, 55, 55)
                .addContainerGap(GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)));

        // ── bottom buttons ───────────────────────────────────────────────────
        clearButton = new JButton("Clear");
        clearButton.setBackground(new Color(80, 80, 80));
        clearButton.setForeground(Color.WHITE);
        clearButton.setFont(new Font("Segoe UI", Font.BOLD, 13));
        clearButton.setBorderPainted(false);
        clearButton.setFocusPainted(false);
        clearButton.addActionListener(e -> clearAll());

        exitButton = new JButton("Exit");
        exitButton.setBackground(new Color(139, 0, 0));
        exitButton.setForeground(Color.WHITE);
        exitButton.setFont(new Font("Segoe UI", Font.BOLD, 13));
        exitButton.setBorderPainted(false);
        exitButton.setFocusPainted(false);
        exitButton.addActionListener(e -> System.exit(0));

        // ── main layout ──────────────────────────────────────────────────────
        GroupLayout layout = new GroupLayout(getContentPane());
        getContentPane().setLayout(layout);

        layout.setHorizontalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(25)
                .addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
                    .addComponent(titleLabel)
                    .addComponent(firstNumberField,  220, 220, 220)
                    .addComponent(secondNumberField, 220, 220, 220)
                    .addComponent(resultField,       220, 220, 220)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(firstNumberLabel).addGap(18).addComponent(requiredMark1))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(secondNumberLabel).addGap(18).addComponent(requiredMark2))
                    .addComponent(resultLabel))
                .addGap(35)
                .addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING, false)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(clearButton, 100, 100, 100)
                        .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED,
                                         GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(exitButton, 100, 100, 100))
                    .addComponent(operatorPanel, 220, 220, 220))
                .addContainerGap(GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)));

        layout.setVerticalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(20)
                .addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(titleLabel)
                        .addGap(25)
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                            .addComponent(firstNumberLabel).addComponent(requiredMark1))
                        .addGap(8)
                        .addComponent(firstNumberField,  32, 32, 32)
                        .addGap(18)
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                            .addComponent(secondNumberLabel).addComponent(requiredMark2))
                        .addGap(8)
                        .addComponent(secondNumberField, 32, 32, 32)
                        .addGap(18)
                        .addComponent(resultLabel)
                        .addGap(8)
                        .addComponent(resultField, 32, 32, 32))
                    .addComponent(operatorPanel, GroupLayout.PREFERRED_SIZE,
                                  GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE))
                .addGap(25)
                .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                    .addComponent(clearButton, 40, 40, 40)
                    .addComponent(exitButton,  40, 40, 40))
                .addGap(20)));

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setTitle("Simple Calculator");
        setResizable(false);
        pack();
        setLocationRelativeTo(null);
    }

    // ────────────────────────────────────────────────────────────────────────
    //  STEP MANAGEMENT
    // ────────────────────────────────────────────────────────────────────────

    /** Move the UI into the given step, enabling/disabling components as needed. */
    private void applyStep(Step step) {
        currentStep = step;
        switch (step) {
            case ENTER_FIRST:
                // Enable first field; disable operator buttons, second field, equals
                firstNumberField.setEnabled(true);
                setNormalBorder(firstNumberField, true);
                setOperatorButtonsEnabled(false);
                secondNumberField.setEnabled(false);
                setNormalBorder(secondNumberField, false);
                equalsButton.setEnabled(false);
                firstNumberField.requestFocusInWindow();
                break;

            case SELECT_OPERATOR:
                // First field locked; enable operator buttons; second field still locked
                firstNumberField.setEnabled(false);
                setNormalBorder(firstNumberField, false);
                setOperatorButtonsEnabled(true);
                secondNumberField.setEnabled(false);
                setNormalBorder(secondNumberField, false);
                equalsButton.setEnabled(false);
                // Flash the operator panel to hint the user
                addButton.requestFocusInWindow();
                break;

            case ENTER_SECOND:
                // Operator locked; second field enabled; equals still locked until typed
                setOperatorButtonsEnabled(false);
                secondNumberField.setEnabled(true);
                setNormalBorder(secondNumberField, true);
                equalsButton.setEnabled(false);
                secondNumberField.requestFocusInWindow();
                break;

            case CALCULATE:
                // All locked except equals
                equalsButton.setEnabled(true);
                secondNumberField.requestFocusInWindow();
                break;
        }
    }

    /** Called when user presses Enter or clicks away from the first number field */
    private void tryAdvanceFromFirstField() {
        if (currentStep != Step.ENTER_FIRST) return;
        String val = firstNumberField.getText().trim();
        if (val.isEmpty()) {
            showError("Please enter the first number.");
            return;
        }
        try { Double.parseDouble(val); }
        catch (NumberFormatException ex) {
            showError("Please enter a valid number in First Number.");
            return;
        }
        applyStep(Step.SELECT_OPERATOR);
    }

    /** Called when user clicks an operator button */
    private void selectOperator(String op) {
        // Guard: only allow in SELECT_OPERATOR step
        if (currentStep != Step.SELECT_OPERATOR) {
            if (currentStep == Step.ENTER_FIRST) {
                showError("Please type the first number before selecting an operator.");
            }
            return;
        }
        selectedOperator = op;
        operatorDisplayLabel.setText(op);
        operatorDisplayLabel.setForeground(Color.BLACK);
        applyStep(Step.ENTER_SECOND);
    }

    /** Called when something is typed in the second number field */
    private void checkSecondFieldNotEmpty() {
        if (!secondNumberField.getText().trim().isEmpty() && currentStep == Step.ENTER_SECOND) {
            currentStep = Step.CALCULATE;
            equalsButton.setEnabled(true);
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    //  CALCULATION
    // ────────────────────────────────────────────────────────────────────────
    private void calculateResult() {
        // Validate step
        if (currentStep == Step.ENTER_FIRST) {
            showError("Please type the first number first.");
            return;
        }
        if (currentStep == Step.SELECT_OPERATOR) {
            showError("Please select an operator (+  −  x  /).");
            return;
        }
        if (currentStep == Step.ENTER_SECOND && secondNumberField.getText().trim().isEmpty()) {
            showError("Please type the second number.");
            return;
        }

        String num1Str = firstNumberField.getText().trim();
        String num2Str = secondNumberField.getText().trim();

        if (num1Str.isEmpty()) { showError("Please enter the first number."); return; }
        if (num2Str.isEmpty()) { showError("Please enter the second number."); return; }
        if (selectedOperator.isEmpty()) { showError("Please select an operator."); return; }

        try {
            double n1 = Double.parseDouble(num1Str);
            double n2 = Double.parseDouble(num2Str);
            double result;

            switch (selectedOperator) {
                case "+": result = n1 + n2; break;
                case "-": result = n1 - n2; break;
                case "x": result = n1 * n2; break;
                case "/":
                    if (n2 == 0) { showError("Cannot divide by zero."); return; }
                    result = n1 / n2;
                    break;
                default:
                    showError("Unknown operator.");
                    return;
            }

            String display = (result == (long) result)
                    ? String.format("%d", (long) result)
                    : String.format("%.4f", result);

            resultField.setText(display);
            resultField.setForeground(new Color(0, 102, 0));

            // After calculating, re-enable all controls for a new calculation
            firstNumberField.setEnabled(true);
            setNormalBorder(firstNumberField, true);
            setOperatorButtonsEnabled(true);
            secondNumberField.setEnabled(true);
            setNormalBorder(secondNumberField, true);
            equalsButton.setEnabled(true);

        } catch (NumberFormatException ex) {
            showError("Please enter valid numbers only.");
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    //  CLEAR / RESET
    // ────────────────────────────────────────────────────────────────────────
    private void clearAll() {
        firstNumberField.setText("");
        secondNumberField.setText("");
        resultField.setText("");
        resultField.setForeground(Color.BLACK);
        selectedOperator = "";
        operatorDisplayLabel.setText("");
        // Reset operator button appearances
        for (JButton b : new JButton[]{addButton, subtractButton, multiplyButton, divideButton}) {
            b.setBackground(UIManager.getColor("Button.background"));
            b.setForeground(UIManager.getColor("Button.foreground"));
        }
        applyStep(Step.ENTER_FIRST);
    }

    // ────────────────────────────────────────────────────────────────────────
    //  HELPERS
    // ────────────────────────────────────────────────────────────────────────

    /** Create a styled text field with rounded border */
    private JTextField createStyledField(boolean enabled) {
        JTextField f = new JTextField();
        f.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        f.setEnabled(enabled);
        f.setBackground(enabled ? BG_ENABLED : BG_DISABLED);
        setNormalBorder(f, enabled);
        return f;
    }

    private JButton createOperatorButton(String label) {
        JButton b = new JButton(label);
        b.setFont(new Font("Segoe UI", Font.BOLD, 16));
        b.setFocusPainted(false);
        return b;
    }

    private void setActiveBorder(JTextField f) {
        f.setBorder(new CompoundBorder(
                new RoundedBorder(6, BORDER_ACTIVE),
                new EmptyBorder(2, 8, 2, 8)));
    }

    private void setNormalBorder(JTextField f, boolean enabled) {
        Color c = enabled ? BORDER_NORMAL : BORDER_DISABLED;
        f.setBackground(enabled ? BG_ENABLED : BG_DISABLED);
        f.setBorder(new CompoundBorder(
                new RoundedBorder(6, c),
                new EmptyBorder(2, 8, 2, 8)));
    }

    private void setOperatorButtonsEnabled(boolean enabled) {
        for (JButton b : new JButton[]{addButton, subtractButton, multiplyButton, divideButton}) {
            b.setEnabled(enabled);
        }
    }

    private void enforceNumeric(KeyEvent e, String fieldName) {
        char c = e.getKeyChar();
        if (Character.isISOControl(c)) return;
        if (!(Character.isDigit(c) || c == '.' || c == '-')) {
            showError("Please enter numbers only in " + fieldName + ".");
            e.consume();
        }
    }

    private void showError(String msg) {
        JOptionPane.showMessageDialog(this, msg, "Error!", JOptionPane.ERROR_MESSAGE);
    }

    // ────────────────────────────────────────────────────────────────────────
    //  ROUNDED BORDER  (paints a rounded rectangle around the field)
    // ────────────────────────────────────────────────────────────────────────
    private static class RoundedBorder extends AbstractBorder {
        private final int   arc;
        private final Color color;

        RoundedBorder(int arc, Color color) {
            this.arc   = arc;
            this.color = color;
        }

        @Override
        public void paintBorder(Component c, Graphics g, int x, int y, int width, int height) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2.setColor(color);
            g2.drawRoundRect(x, y, width - 1, height - 1, arc, arc);
            g2.dispose();
        }

        @Override
        public Insets getBorderInsets(Component c)                    { return new Insets(2, 2, 2, 2); }
        @Override
        public Insets getBorderInsets(Component c, Insets insets) {
            insets.set(2, 2, 2, 2); return insets;
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    //  MAIN
    // ────────────────────────────────────────────────────────────────────────
    public static void main(String[] args) {
        try {
            for (UIManager.LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (Exception ex) {
            // fall through to default L&F
        }
        SwingUtilities.invokeLater(() -> new SimpleCalculator_W().setVisible(true));
    }
}
