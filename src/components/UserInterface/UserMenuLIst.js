import React from "react";
import { useParams } from "react-router-dom";
import UserStarters from "./UserStarters";
import UserMainCourse from "./UserMainCourse";
import UserDessert from "./UserDessert";

const UserMenuList = () => {
    const { category } = useParams();

    const categoryComponents = {
        starters: <UserStarters />,
        maincourse: <UserMainCourse />,
        dessert: <UserDessert />,
    };

    return (
        <div>
            {categoryComponents[category] || <h2>Category not found</h2>}
        </div>
    )
};

export default UserMenuList;