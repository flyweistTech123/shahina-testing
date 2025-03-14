/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openQuiz } from "../../store/quizSlice";
import AcneQuiz from "../AcneQuiz/AcneQuiz";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const TopHeader = () => {
  const dispatch = useDispatch();
  const { isQuizOpen } = useSelector((store) => store.quiz);
  function onClose() {}

  return (
    <header className="top-header-container">
      <div className="Top_Header ">
        <Link to={"/giftcards"}>
          <button className="button-container ">
            <ImageLazyLoading
              img={"/asessts/topheader/gift.png"}
              alt={"Gift Card"}
            />
            GIFT CARDS
          </button>
        </Link>
        <div onClick={() => dispatch(openQuiz())}>
          <button className="button-container">
            <ImageLazyLoading
              img={"/asessts/topheader/bulb.png"}
              alt={"Acne Quiz"}
            />
            ACNE QUIZ
          </button>
        </div>

        <Link to={"/checkIngredients"} >
          <button className="button-container ">
            <ImageLazyLoading
              img={"/asessts/topheader/note.png"}
              alt={"Check Ingredients"}
            />
            CHECK INGREDIENTS
          </button>
        </Link>
      </div>
      {isQuizOpen && <AcneQuiz onClose={onClose} />}
    </header>
  );
};

export default TopHeader;
