import { useState } from "react";
import axios from "axios"; // Import axios for API requests

const WithdrawalCard = () => {
  const [withdrawalError, setWithdrawalError] = useState("");
  const [withdrawalAmount, setWithDrawalAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
  const [successMessage, setSuccessMessage] = useState(""); // To display success message

  const handleSubmitWithdrawal = async (e) => {
    e.preventDefault();
    // Validate withdrawal amount
    if (withdrawalAmount < 2000) {
      setWithdrawalError("Minimum withdrawal amount is 2000 shillings.");
      return;
    }
    // Proceed with withdrawal request
    setIsSubmitting(true); // Set loading state
    try {
      // Replace this with your actual API endpoint
      const response = await axios.post("/api/withdrawals", {
        amount: withdrawalAmount,
        // Include other required fields like user ID, payment method details, etc.
      });

      // Handle successful response
      setSuccessMessage("Withdrawal request submitted successfully.");
      setWithDrawalAmount("");
      setWithdrawalError("");
    } catch (error) {
      // Handle error response
      setWithdrawalError("An error occurred while processing your request.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const handleChange = (e) => {
    setWithDrawalAmount(e.target.value);
    setWithdrawalError("");
    setSuccessMessage(""); // Reset success message on change
  };

  const equivalentUSD = (withdrawalAmount / 129.48).toFixed(2);
  const netAmountShillings = (0.8 * withdrawalAmount).toFixed(2);
  const netAmountUSD = ((0.8 * withdrawalAmount) / 129.48).toFixed(2);

  return (
    <form className="input-group" onSubmit={handleSubmitWithdrawal}>
      <input
        type="number"
        name="amount"
        value={withdrawalAmount}
        placeholder="Amount to withdraw.."
        onChange={handleChange}
        disabled={isSubmitting} // Disable input while submitting
      />
      {withdrawalAmount.length > 0 && (
        <>
          <p className="medium-header" style={{ textAlign: "center" }}>
            {`Sh ${withdrawalAmount} equivalent to $ ${equivalentUSD}`}
          </p>
          <p className="medium-header">
            {`Subtracting 20% you'll get sh ${netAmountShillings} equivalent to $ ${netAmountUSD}`}
          </p>
        </>
      )}
      <input
        type="submit"
        value={isSubmitting ? "Submitting..." : "REQUEST WITHDRAW"} // Change button text while submitting
        className="withdrawal"
        style={withdrawalAmount.length === 0 ? { marginTop: "10px" } : null}
        disabled={isSubmitting} // Disable button while submitting
      />
      {withdrawalError && (
        <p className="success-message" style={{ color: "var(--pinkRed)" }}>
          {withdrawalError}
        </p>
      )}
      {successMessage && (
        <p className="success-message" style={{ color: "green" }}>
          {successMessage}
        </p>
      )}
    </form>
  );
};

export default WithdrawalCard;
