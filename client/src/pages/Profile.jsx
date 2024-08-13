import { useParams } from "react-router-dom";

const Profile = () => {
  let { id } = useParams();
  return <div>Profile</div>;
};

export default Profile;
