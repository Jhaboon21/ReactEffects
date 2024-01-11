import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";
import './Deck.css'

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [draw, setDraw] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(function loadDeck() {
        async function fetchData() {
            const res = await axios.get(`${BASE_URL}/new/shuffle`);
            setDeck(res.data);
        }
        fetchData();
    }, []);

    async function drawCard() {
        try {
            const drawRes = await axios.get(`${BASE_URL}/${deck.deck_id}/draw`);
            if (drawRes.data.remaining === 0) throw new Error("Error: no cards remaining!");
            const card = drawRes.data.cards[0];

            setDraw(d => [
                ...d, 
                {
                    id: card.code,
                    name: card.suit + " " + card.value,
                    image: card.image
                }
            ]);
        } catch (err) {
            alert(err);
        }
    }

    async function shuffle() {
        setIsShuffling(true);
        try {
            await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle`);
            setDraw([]);
        } catch (err) {
            alert(err);
        } finally {
            setIsShuffling(false);
        }
    }

    function renderDrawButton() {
        if (!deck) return null;
        return (
            <button 
                className="Deck-btn"
                onClick={drawCard}
                disabled={isShuffling}
            >Draw card</button>
        )
    }

    function renderShuffleButton() {
        if (!deck) return null;
        return (
            <button 
                className="Deck-btn"
                onClick={shuffle}
                disabled={isShuffling}
            >Shuffle deck</button>
        )
    }

    return (
        <div className="Deck">
            {renderDrawButton()}
            {renderShuffleButton()}
            <div className="Deck-pile">
                {draw.map(c => (
                    <Card key={c.id} name={c.name} image={c.image} />
                ))}
            </div>
        </div>
    )
}

export default Deck;