import { fireEvent, render, screen } from "@testing-library/react";
import NavBar from "../NavBar";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


// We used Link Component in NavBar which isnt JS/React. We imported it from react-router-dom.
test("Should load NavBar Component with a Login button", ()=>{

    render(
    <BrowserRouter>
        <NavBar/>
    </BrowserRouter>);

    // const text= screen.getByText("Login");
    // expect(text).toBeInTheDocument();

    const btn= screen.getByRole("button", {name: "Login"});
    expect(btn).toBeInTheDocument();
});

test("Should change Login to Logout button on click", ()=>{
    render(
        <BrowserRouter>
            <NavBar/>
        </BrowserRouter>
    );

    const logInBtn= screen.getByRole("button", {name: "Login"});
    fireEvent.click(logInBtn);

    const logOutBtn= screen.getByRole("button", {name: "Logout"});
    expect(logOutBtn).toBeInTheDocument();
})