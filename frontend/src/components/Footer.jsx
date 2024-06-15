import React from "react";

const date= new Date();
const currentyear=date.getFullYear();
function Footer(){
    return <footer><p>copyright ©️ {currentyear} Sanro</p></footer>;
}

export default Footer;