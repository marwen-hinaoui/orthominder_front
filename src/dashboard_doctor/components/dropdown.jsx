import { Dropdown, message } from "antd";
import { logout_api } from "../../shared_api/logout_api";
import { useNavigate, Link } from "react-router";

const DropdownComponent = ({ children }) => {
  const navigate = useNavigate()



  const logout = async () => {
    const res = await logout_api()

    if (res.resData){
      
      console.log('Logout success!')
      navigate('/login')
      
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
