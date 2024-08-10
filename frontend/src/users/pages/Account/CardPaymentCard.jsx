import "./CardPaymentCard.css"

const CardPaymentCard = () => {
  return (
    <div className="card card-payment">
      <p className="small-header">Payment Card</p>
      <div className="input-group">
        <p style={{textAlign:"start"}}>Phone:</p>
        <input type="text" name="" id="" placeholder="Enter phone no!.." />
      </div>
      <input type="submit" value="UPDATE PHONE NO" />
      <div className="input-group">
      <p style={{textAlign:"start"}}>Email:</p>
        <input type="text" name="" id="" placeholder="Enter phone no!.." />
      </div>
      <input type="submit" value="UPDATE PHONE NO" />
    </div>
  );
};

export default CardPaymentCard;
