import Config from "../../Config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  showLoading,
  hideLoading,
} from "../../users/Redux/features/alertSlice";
import Preloaders from "../../users/components/Preloaders/Preloaders";
const DeleteBlogModal = ({ handleDisplayModal, selectedBlog, fetchData }) => {
  const loading = useSelector((state) => state.alerts.loading);
  const dispatch = useDispatch();
  const deleteBlog = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(
        `${Config.apiUrl}/api/blog/delete/${selectedBlog._id}`
      );
      if (!response.data.success) {
        throw new Error("Internal server error occured!");
        dispatch(hideLoading());
      }
      await fetchData();
      handleDisplayModal();
      dispatch(hideLoading());
    } catch (error) {
      console.log(`There was an error accessing the server =>${error.message}`);
      dispatch(hideLoading());
    }
  };

  return (
    <div className="modal-dialog">
      <p className="small-header">{`Are you sure you want to delete ${selectedBlog.title}?`}</p>
      <button className="cart-buttons ok" onClick={deleteBlog}>
        DELETE
      </button>
      <button className="cart-buttons cancel" onClick={handleDisplayModal}>
        CANCEL
      </button>

      {loading && <Preloaders />}
    </div>
  );
};

export default DeleteBlogModal;
