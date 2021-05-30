import { createStackNavigator } from "react-navigation-stack";

import Home from "../screens/Home";
import Login from "../screens/Login";
import BlogDetail from "../screens/BlogDetail";

const MainNaivatior = createStackNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
  BlogDetail: {
    screen: BlogDetail,
    navigationOptions: props => {
      const { navigation } = props;
      const title = navigation.getParam("title");
      return {
        title
      };
    }
  }
});

export default MainNaivatior;
