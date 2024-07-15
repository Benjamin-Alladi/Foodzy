import { render,screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ContactUs from "../ContactUs";


test("Should load ContactUs component", ()=>{

    render(<ContactUs/>);

    // Querying
    const heading=screen.getByRole("heading");

    // Assertion
    expect(heading).toBeInTheDocument();
})

test("Should contain Contact Us heading", ()=>
{
    render(<ContactUs/>);

    const text= screen.getByText("Contact Us");

    expect(text).toBeInTheDocument();
})

test("Should contain Name as Placeholder Text", ()=>{

    render(<ContactUs/>);
    const text= screen.getByPlaceholderText("Name");
    expect(text).toBeInTheDocument();
})

test("Should contain Emain as Placeholder Text", ()=>{

    render(<ContactUs/>);
    const text= screen.getByPlaceholderText("Email");
    expect(text).toBeInTheDocument();
})

test("Should load Submit button", ()=>{
    render(<ContactUs/>);
    const btn= screen.getByRole("button");
    expect(btn).toBeInTheDocument();
})

it("Should contain Submit Text", ()=>{
    render(<ContactUs/>);
    const text= screen.getByText("Submit");
    expect(text).toBeInTheDocument();
})

test("Should contain 3 textboxes", ()=>{
    render(<ContactUs/>);

    // All input and textarea boxes. This returns an array.
    const tb= screen.getAllByRole("textbox");
    expect(tb.length).toBe(3);
});