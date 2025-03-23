import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import Starters from "./Starters";
import MainCourse from "./MainCourse";
import Dessert from "./Dessert";

const MenuList = () => {
    const { category } = useParams();

    const categoryComponents = {
        starters: <Starters />,
        maincourse: <MainCourse />,
        dessert: <Dessert />,
    };

    return (
        <div>
            {categoryComponents[category] || <h2>Category not found</h2>}
        </div>
    )
};

export default MenuList;