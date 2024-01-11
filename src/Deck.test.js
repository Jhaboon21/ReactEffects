import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Deck from "./Deck";

it("renders without crashing", function() {
    render(<Deck />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<Deck />);
    expect(asFragment()).toMatchSnapshot();
});

// TODO: need to check for the api to give us the deck and render that in so we can test for if the draw/shuffle buttons are rendering
// it("can draw a new card", function() {
//     const deck = render(<Deck />);
  
//     // no cards yet
//     expect(deck.queryByText("Draw card")).toBeInTheDocument();
//     expect(deck.queryByText("Shuffle deck")).toBeInTheDocument();
  
  
//     // draw a card
//     const draw = deck.getByText("Draw card");
//     fireEvent.click(draw);

//     // expect a card
//     expect(deck.getElementsByClassName("Card")).toHaveLength(1);
// });