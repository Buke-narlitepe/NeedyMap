import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";

import axios from "./axios.js";

import BioEditor from "./BioEditor.js";

jest.mock("./axios.js");
axios.get.mockResolvedValue({
    data: {
        firstname: "Johannes",
        lastname: "Kronmüller",
        email: "Johannes.Kronmueller@gmail.com",
    },
});

test("When no bio is passed to it, an `Add` button is rendered", async () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelectorAll("button.add").length).toBe(1);
});

test("When a bio is passed to it, an `Edit` button is rendered", async () => {
    const { container } = render(<BioEditor bio="editing" />);
    expect(container.querySelectorAll("button.edit").length).toBe(1);
});

test("Clicking the `Add` button causes a textarea and a `Save` button to be rendered", async () => {
    const { container } = render(<BioEditor />);

    fireEvent.click(container.querySelector("button.add"));

    expect(container.querySelectorAll("div.text-area").length).toBe(1);
});

test("Clicking the `Edit` button causes a textarea and a `Save` button to be rendered", async () => {
    const { container } = render(<BioEditor bio="editing" />);

    fireEvent.click(container.querySelector("button.edit"));

    expect(container.querySelectorAll("div.text-area").length).toBe(1);
});

test("Clicking the `Save` button causes an ajax request", async () => {
    axios.get.mockClear();
    const setBio = jest.fn(() => null);

    const { container } = render(<BioEditor setBio={setBio} />);

    fireEvent.click(container.querySelector("button.save"));
    expect(axios.get.mock.calls.length).toBe(1);
});
