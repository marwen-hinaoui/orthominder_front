import { Dropdown } from "antd";
import { logout_api } from "../../shared_api/logout_api";
import { useNavigate, Link } from "react-router";
import { useDispatch } from "react-redux";
import { set_authenticated } from "../../redux-toolkit/slices/user_slice";

const DropdownComponent = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const logout = async () => {
    const res = await logout_api()

    if (res.resData){
      
      navigate('/login', { replace: true })
      dispatch(set_authenticated(false))
      
    }else{
      console.log('Logout error!')
    }
  }
    

  const items = [
    {
      key: "1",
      label: <Link style={{ margin: "2px" }}>Settings</Link>,
    },

    {
      key: "2",
      danger: true,
      label: (
        <p onClick={logout} style={{ margin: "2px" }}>
          Logout
        </p>
      ),
    },
  ];

  const menuProps = {
    items,
  };

  return <Dropdown menu={menuProps}>{children}</Dropdown>;
};
export default DropdownComponent;
