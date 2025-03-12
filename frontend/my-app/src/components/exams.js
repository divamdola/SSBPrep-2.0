import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";
import MetaData from "./layouts/MetaData";

const Exams = () => {
  const location = useLocation();
  const selectedExam = location.state?.selectedExam || "Unknown";
  const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  console.log("Redux State:", { loading, products, error, productsCount });

  useEffect(() => {
    if (selectedExam !== "Unknown") {
      dispatch(getProducts(selectedExam));
      window.scrollTo(0, 0); 
    }
  }, [dispatch, selectedExam]);
  return (
    <Fragment>
      <MetaData title={`${selectedExam}`} />
      <div className="head-exam">
        <h1>
          {selectedExam === "SSB"
            ? "Services Selection Board"
            : selectedExam === "NDA"
            ? "National Defence Academy"
            : "Combined Defence Examination"}
        </h1>
      </div>
      <div className="books-exam">
        <div className="h3-exam">Books</div>
        <div className="source-exam">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div className="b1-exam" key={product._id}>
                <a href={product.images?.[0]?.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <img src={product.images?.[0]?.url} alt="Book" />
                </a>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
        <p className="scroll">
          Scroll for more <img src="/images/more.svg" alt="more" />
        </p>
      </div>
      {selectedExam !== "SSB" ? (
        <div className="extra-exam">
          <div className="h3-exam">Let's Do Some Revision!!!</div>
          <div className="test-series-exam">
            <a href="dpp.htm" target="_blank">
              <div className="extra1-exam">
                <img src="/images/Dppsvg.svg" alt="" />
                <p>Daily Practice Paper (DPP)</p>
              </div>
            </a>
            <a href="ndaMock.htm" target="_blank">
              <div className="extra1-exam">
                <img src="/images/Mocksvg.svg" alt="" />
                <p>Full Mock Test</p>
              </div>
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="roadmap">
            <h1>View Complete Procedure of SSB</h1>
            <div className="button">
            <a href="/timeline" target="_blank" rel="noopener noreferrer">
                <button>
                  <img src="/images/eye.svg" alt="eye" />
                  View
                </button>
              </a>
            </div>
          </div>
          <div class="day-1">
            <div class="h3-exam">Screening Test</div>
            {/* <div class="h3" style="padding-top: 30px;">
              OIR
            </div>
            <div class="dices">
              <div class="material"></div>
            </div>
            <p class="scroll">Scroll for more</p> */}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Exams;
