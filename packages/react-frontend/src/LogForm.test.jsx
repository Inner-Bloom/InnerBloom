/* eslint-disable */
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Form from "./LogForm";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

const handleSubmit = (logData) => {
    console.log("Posting Log!");
};

const handleBack = () => {
    console.log("Going back!");
};

describe("LogForm Component", () => {
    beforeEach(() => {
        render(
            <Router>
                <Form onSubmit={handleSubmit} onBack={handleBack} />
            </Router>
        );
    });

    test("All Buttons Rendering", () => {
        const happyButton = screen.getByText("Happy");
        const sadButton = screen.getByText("Sad");
        const calmButton = screen.getByText("Calm");
        const anxiousButton = screen.getByText("Anxious");

        const backButton = screen.getByText("Back");

        expect(happyButton).toBeInTheDocument();
        expect(sadButton).toBeInTheDocument();
        expect(calmButton).toBeInTheDocument();
        expect(anxiousButton).toBeInTheDocument();

        expect(backButton).toBeInTheDocument();
    });

    test("Click Happy", () => {
        const happyButton = screen.getByText("Happy");
        fireEvent.click(happyButton);

        const proudButton = screen.getByText("Proud");
        const gratefulButton = screen.getByText("Grateful");
        const contentButton = screen.getByText("Content");
        const joyfulButton = screen.getByText("Joyful");

        expect(proudButton).toBeInTheDocument();
        expect(gratefulButton).toBeInTheDocument();
        expect(contentButton).toBeInTheDocument();
        expect(joyfulButton).toBeInTheDocument();
    });

    test("Click Proud", () => {
        const happyButton = screen.getByText("Happy");
        fireEvent.click(happyButton);

        const proudButton = screen.getByText("Proud");
        fireEvent.click(proudButton);

        const sleepPrompt = screen.getByText("How many hours did you sleep?");
        expect(sleepPrompt).toBeInTheDocument();
    });

    test("Use Hour Sliders", () => {
        const happyButton = screen.getByText("Happy");
        fireEvent.click(happyButton);

        const proudButton = screen.getByText("Proud");
        fireEvent.click(proudButton);

        const hourSlider = screen.getByTestId("hour-slider");

        expect(hourSlider).toBeInTheDocument();
        expect(hourSlider).toHaveAttribute("min", "1");
        expect(hourSlider).toHaveAttribute("max", "24");
        expect(hourSlider).toHaveAttribute("value", "8"); // Assuming default value is 50

        fireEvent.change(hourSlider, { target: { value: "9" } });

        expect(hourSlider).toHaveAttribute("value", "9");
        const hourText = screen.getByText("Hours of sleep: 9 hours");
        expect(hourText).toBeInTheDocument();
    });

    test("Use Min Sliders", () => {
        const happyButton = screen.getByText("Happy");
        fireEvent.click(happyButton);

        const proudButton = screen.getByText("Proud");
        fireEvent.click(proudButton);

        const minSlider = screen.getByTestId("min-slider");

        expect(minSlider).toBeInTheDocument();
        expect(minSlider).toHaveAttribute("min", "0");
        expect(minSlider).toHaveAttribute("max", "50");
        expect(minSlider).toHaveAttribute("value", "0"); // Assuming default value is 50

        fireEvent.change(minSlider, { target: { value: "10" } });

        expect(minSlider).toHaveAttribute("value", "10");
        const sleepText = screen.getByText("Total sleep: 8 hours 10 minutes");
        expect(sleepText).toBeInTheDocument();
    });

    test("Use Meal Counter", () => {
        const happyButton = screen.getByText("Happy");
        fireEvent.click(happyButton);

        const proudButton = screen.getByText("Proud");
        fireEvent.click(proudButton);

        const mealCounter = screen.getByTestId("meal-counter");

        expect(mealCounter).toHaveValue(3);

        fireEvent.change(mealCounter, { target: { value: 4 } });

        expect(mealCounter).toHaveValue(4);
    });

    test("Use Exercise Check", () => {
        const happyButton = screen.getByText("Happy");
        fireEvent.click(happyButton);

        const proudButton = screen.getByText("Proud");
        fireEvent.click(proudButton);

        const exerciseCheck = screen.getByTestId("exercise-check");

        expect(exerciseCheck).not.toBeChecked();

        // Simulate a click event on the checkbox
        fireEvent.click(exerciseCheck);

        // Assert that the checkbox is now checked
        expect(exerciseCheck).toBeChecked();
    });

    test("Use Relationship Dropdown", async () => {
        const happyButton = screen.getByText("Happy");
        fireEvent.click(happyButton);

        const proudButton = screen.getByText("Proud");
        fireEvent.click(proudButton);

        expect(
            screen.getByRole("option", { name: "By yourself" }).selected
        ).toBe(true);

        await userEvent.selectOptions(
            // Find the select element
            screen.getByTestId("relation-dropdown"),
            screen.getByRole("option", { name: "With friends" })
        );
        expect(
            screen.getByRole("option", { name: "With friends" }).selected
        ).toBe(true);
    });

    test("Submit Log", () => {
        const happyButton = screen.getByText("Happy");
        fireEvent.click(happyButton);

        const proudButton = screen.getByText("Proud");
        fireEvent.click(proudButton);

        const submit = screen.getByText("Complete Check-in");

        fireEvent.click(submit);

        //Check if box disappeared
        expect(submit).not.toBeVisible();
    });
});
