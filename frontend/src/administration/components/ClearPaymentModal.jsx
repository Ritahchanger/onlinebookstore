import CloseIcon from "../../assets/icons/close.png";
const ClearPaymentModal = ({ handlePaymentModal }) => {
  return (
    <div className="modal-dialog">
      <p className="medium-header">CLEARING USER PAYMENTS</p>
      <div className="close-modal" onClick={handlePaymentModal}>
        <img src={CloseIcon} />
      </div>
      <div className="input_group">
        <input
          type="number"
          name="amount"
          placeholder="Enter the amount paid...."
        />
      </div>
      <div className="input-group">
        <input type="submit" value="CLEAR PAYMENT" className="submit-btn" />
      </div>
    </div>
  );
};

export default ClearPaymentModal;
